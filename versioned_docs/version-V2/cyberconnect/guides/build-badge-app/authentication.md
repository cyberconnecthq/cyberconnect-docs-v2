---
id: authentication
title: Authentication
slug: /how-to/build-badge-app/authentication
sidebar_label: Authentication
sidebar_position: 3
description: How to Build Badge app - Authentication
---

For authentication, you will actually be implementing the [User Login](/guides/authentication/user-login) flow to receive the `accessToken` that will be used later on for different queries and mutations.

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

1. first mutation is to request a message that the user will sign with their MetaMask wallet:

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

Now that you have the necessary GraphQL mutations, you only need to incorporate those steps in a function by following the user flow described previously.

```tsx title="components/SigninBtn.tsx"
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
```

Now that you have an access token, you will be able to make queries and mutations that will allow you to add many features to your app.

Next up we will cover the implementation of the [Create a Badge](/how-to/build-badge-app/create-a-badge) feature.
