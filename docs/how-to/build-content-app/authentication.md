---
id: authentication
title: Authentication
slug: /how-to/build-content-app/authentication
sidebar_label: Authentication
sidebar_position: 3
description: How to Build Content app - Authentication
---

For authentication, you will actually be implementing the [User Login](/guides/authentication/user-login) flow to receive the `accessToken` that will be used later on in this guide to create an essence NFT.

## Apollo Client

First, you need to set up the `ApolloClient` because whenever you make a request, you need to pass the `accessToken` in the HTTP `Authorization` header.

```tsx title="apollo/index.tsx"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "https://api.stg.cyberconnect.dev/",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("accessToken");

    return {
        headers: {
            ...headers,
            Authorization: token ? `bearer ${token}` : "",
        },
    };
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
```

## GraphQL mutations

After setting up the `ApolloClient`, you need to write the GraphQL mutations needed for the login flow:

1. first mutation is to request a message that the user will sign with its MetaMask wallet:

```tsx title="graphql/LoginGetMessage.ts"
import { gql } from "@apollo/client";

export const LOGIN_GET_MESSAGE = gql`
    mutation LoginGetMessage($input: LoginGetMessageInput!) {
        loginGetMessage(input: $input) {
            message
        }
    }
`;
```

2. the second mutation is to verify the signed message:

```tsx title="graphql/LoginVerify.ts"
import { gql } from "@apollo/client";

export const LOGIN_VERIFY = gql`
    mutation LoginVerify($input: LoginVerifyInput!) {
        loginVerify(input: $input) {
            accessToken
        }
    }
`;
```

## Login

Now that you have the necessary GraphQL mutations, you only need to incorporate all of that logic in a single function by following the same steps for the user login flow.

```tsx title="components/SigninBtn.tsx"
try {
    /* Check if the user connected with wallet */
    if (!(provider && address)) {
        throw Error("Connect with MetaMask.");
    }

    /* Check if the network is the correct one */
    await checkNetwork(provider);

    /* Get the signer from the provider */
    const signer = provider.getSigner();

    /* Get the address from the provider */
    const account = await signer.getAddress();

    /* Get the network from the provider */
    const network = await provider.getNetwork();

    /* Get the chain id from the network */
    const chainID = network.chainId;

    /* Get the message from the server */
    const messageResult = await loginGetMessage({
        variables: {
            input: {
                address: account,
                domain: DOMAIN,
                chainID: chainID,
            },
        },
    });
    const message = messageResult?.data?.loginGetMessage?.message;

    /* Get the signature for the message signed with the wallet */
    const signature = await signer.signMessage(message);

    /* Verify the signature on the server and get the access token */
    const accessTokenResult = await loginVerify({
        variables: {
            input: {
                address: account,
                domain: DOMAIN,
                chainID: chainID,
                signature: signature,
            },
        },
    });
    const accessToken = accessTokenResult?.data?.loginVerify?.accessToken;

    /* Log the access token */
    console.log("~~ Access token ~~");
    console.log(accessToken);

    /* Save the access token in local storage */
    localStorage.setItem("accessToken", accessToken);

    /* Set the access token in the state variable */
    setAccessToken(accessToken);

    /* Display success message */
    alert(`Successfully logged in!`);
} catch (error) {
    /* Display error message */
    alert(error.message);
}
```

This is it! Pretty simple, right?! Now that you have an access token, you will be able to make queries and mutations that will allow you to add many features to your app.

Next up we will cover how to implement the [Subscribe to profile](/how-to/build-content-app/subscribe-to-profile) functionality.
