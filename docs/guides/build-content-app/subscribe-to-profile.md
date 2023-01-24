---
id: subscribe-to-profile
title: Subscribe to Profile
slug: /how-to/build-content-app/subscribe-to-profile
sidebar_label: Subscribe to Profile
sidebar_position: 4
description: How to Build Content app - Subscribe to Profile
---

In this section you'll learn how to implement the subscribe feature. Under the hood, when the user subscribes to a profile, a non-fungible token (NFT) is minted and automatically transferred to the user's wallet.
To make this happen, you will essentially be following the steps described in the [Subscribe](/guides/mutation/subscribe) section.

## GraphQL mutations

Subscribe to a profile is a two step process and requires two GraphQL mutations: `CreateSubscribeTypedData` and `Relay`.

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

2. `Relay` is responsible for broadcasting the transaction, minting and transferring the NFT:

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

## Subscribe to Profile

Now you know what APIs to use to implement the Subscribe feature. The only thing remaining is to make the connection between them, like so:

1. Get data in a readable format and the `typedDataID` for it;
2. Get the user to sign the message data and get its `signature`;
3. Call the `relay` and pass it the `typedDataID` and `signature`;

```tsx title="components/SubscribeBtn.tsx"
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
```

If the subscribe process was successful, you can verify the transaction hash on [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-content-app-subscribe-to-profile-tx.png)

You can also view the NFT when a user subscribes to a profile on [testnets.opensea.io](testnets.opensea.io). At this stage the NFT doesn't have a middleware set nor a NFT image, but you will learn how to do all that in the [Middleware for Subscribe](/how-to/build-content-app/middleware-for-post).

![nft subscribe](/img/v2/build-content-app-subscribe-to-profile-nft.png)

Next up we will cover content and how it relates to the Essence NFT in the [Create a post](/how-to/build-content-app/create-a-post) section.
