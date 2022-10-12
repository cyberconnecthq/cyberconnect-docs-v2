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

```tsx title="/src/apollo/index.tsx"
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

```tsx title="/src/graphql/LoginGetMessage.ts"
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

```tsx title="/src/graphql/LoginVerify.ts"
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

Now that you have the necessary GraphQL mutations, you only need to create a `LoginBtn` component that incorporates the logic for the user authentication.
Since the main goal is to obtain the `accessToken` you'll create a state variable for it.

```tsx title="/src/App.tsx"
/* State variable to store the access token */
const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
```

When writing the logic for the `LoginBtn` you need to follow the same steps for the login flow plus updates for variables used within the app:

-   Request the message from the server;
-   Verify the signature for the signed message;
-   Update the state of the variables;

```tsx title="/src/components/LoginBtn.tsx"
import { Web3Provider } from "@ethersproject/providers";
import { useMutation } from "@apollo/client";
import { LOGIN_GET_MESSAGE, LOGIN_VERIFY } from "../graphql";
import { DOMAIN } from "../helpers/constants";

function LoginBtn({
    provider,
    address,
    checkNetwork,
    disabled,
    setAccessToken,
}: {
    provider: Web3Provider | undefined;
    address: string | undefined;
    checkNetwork: (provider: Web3Provider) => Promise<void>;
    disabled: boolean;
    setAccessToken: (accessToken: string) => void;
}) {
    const [loginGetMessage] = useMutation(LOGIN_GET_MESSAGE);
    const [loginVerify] = useMutation(LOGIN_VERIFY);

    const handleOnClick = async () => {
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
            const accessToken =
                accessTokenResult?.data?.loginVerify?.accessToken;

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
    };

    return (
        <button onClick={handleOnClick} disabled={disabled}>
            Login
        </button>
    );
}

export default LoginBtn;
```

The remaing step left it to wrap the application with the `ApolloProvider` and add the `LoginBtn` component that you've just created.

```tsx title="src/App.tsx"
return (
    <ApolloProvider client={apolloClient}>
        <div className="App">
            <div className="container">
                <h2>Connect Wallet</h2>
                <ConnectWalletBtn
                    setProvider={setProvider}
                    setAddress={setAddress}
                    disabled={Boolean(provider)}
                />
                {provider && address && (
                    <div>
                        <div>Address:</div>
                        <div>{address}</div>
                    </div>
                )}
                <h2>Create Profile</h2>
                <CreateProfileBtn
                    provider={provider}
                    address={address}
                    checkNetwork={checkNetwork}
                    setProfileID={setProfileID}
                    setHandle={setHandle}
                    disabled={!Boolean(provider && address)}
                />
                {handle && (
                    <iframe
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        height="100%"
                        sandbox="allow-scripts"
                        src={`https://cyberconnect.mypinata.cloud/ipfs/bafkreic7ur7evrpy45md2xpth3zvy4mjcczzodjg7xciupty6dvmliye6i?handle=${handle}`}></iframe>
                )}
                <h2>Login</h2>
                <LoginBtn
                    provider={provider}
                    address={address}
                    checkNetwork={checkNetwork}
                    setAccessToken={setAccessToken}
                    disabled={!Boolean(provider && address)}
                />
                {accessToken && (
                    <div>
                        <div>Access token:</div>
                        <div>{accessToken}</div>
                    </div>
                )}
            </div>
        </div>
    </ApolloProvider>
);
```

This is it! Congrats! Now that you have an access token, you will be able to make queries and mutations that will allow you to add many features to your app.
Next up we will cover content and how it relates to the Essence NFT in the [Create Essence](/how-to/build-content-app/create-essence).
