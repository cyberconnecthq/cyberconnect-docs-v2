---
id: subscribe-to-profile
title: Subscribe to profile
slug: /how-to/build-content-app/subscribe-to-profile
sidebar_label: Subscribe to profile
sidebar_position: 4
description: How to Build Content app - Subscribe to profile
---

To allow the user to subscribe to a profile, you will actually be implementing the steps described in the [Subscribe](/guides/mutation/subscribe) section.

## GraphQL mutations

If you haven't already set the `ApolloClient` please go [Authentication](/how-to/build-content-app/authentication) to do so.

Subscribe to a profile is a two step process and requires two GraphQL mutations: `CreateSubscribeTypedData` and `Relay`:

1. `CreateSubscribeTypedData` is used to present data to the user in a readable format:

```tsx title="graphql/CreateSubscribeTypedData.ts"
import { gql } from "@apollo/client";

export const CREATE_SUBSCRIBE_TYPED_DATA = gql`
    mutation CreateSubscribeTypedData($input: CreateSubscribeTypedDataInput!) {
        createSubscribeTypedData(input: $input) {
            typedData {
                id
                chainID
                sender
                data
                nonce
            }
        }
    }
`;
```

2. `Relay` is responsible for broadcasting the transaction, minting and transfering the NFT:

```tsx title="graphql/Relay.ts"
import { gql } from "@apollo/client";

export const RELAY = gql`
    mutation Relay($input: RelayInput!) {
        relay(input: $input) {
            relayTransaction {
                id
                txHash
                typedData {
                    id
                    chainID
                    sender
                    data
                    nonce
                }
            }
        }
    }
`;
```

You know what APIs to use and all is left to do is connect them:

1. Get data in a readable format and the `typedDataID` for it;
2. Get the user to sign the message data and get its `signature`;
3. Call the `relay` and pass it the `typedDataID` and `signature`;

```tsx title="components/SubscribeBtn.tsx"
try {
    /* Check if the user connected with wallet */
    if (!(provider && address)) {
        throw Error("Connect with MetaMask.");
    }

    /* Check if the user logged in */
    if (!accessToken) {
        throw Error("You need to log in first.");
    }

    /* Check if the network is the correct one */
    await checkNetwork(provider);

    /* Get the signer from the provider */
    const signer = provider.getSigner();

    /* Get the network from the provider */
    const network = await provider.getNetwork();

    /* Get the chain id from the network */
    const chainID = network.chainId;

    /* Create typed data in a readable format */
    const typedDataResult = await createSubscribeTypedData({
        variables: {
            input: {
                options: {
                    chainID: chainID,
                },
                profileIDs: [profileID],
            },
        },
    });
    const typedData = typedDataResult.data?.createSubscribeTypedData?.typedData;
    const message = typedData.data;
    const typedDataID = typedData.id;

    /* Get the signature for the message signed with the wallet */
    const fromAddress = await signer.getAddress();
    const params = [fromAddress, message];
    const method = "eth_signTypedData_v4";
    const signature = await signer.provider.send(method, params);

    /* Call the relay to broadcast the transaction */
    const relayResult = await relay({
        variables: {
            input: {
                typedDataID: typedDataID,
                signature: signature,
            },
        },
    });
    const txHash = relayResult.data?.relay?.relayTransaction?.txHash;

    /* Log the transation hash */
    console.log("~~ Tx hash ~~");
    console.log(txHash);

    /* Display success message */
    alert(`Successfully subscribed to profile!`);
} catch (error) {
    /* Display error message */
    alert(error.message);
}
```

If the process was successful, you can verify the logged transaction hash on [goerli.etherscan.io](https://goerli.etherscan.io/).

Next up we will cover content and how it relates to the Essence NFT in the [Create Content](/how-to/build-content-app/create-content) section.
