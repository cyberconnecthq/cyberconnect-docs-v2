---
id: middleware-for-post
title: Middleware for Post
slug: /how-to/build-content-app/middleware-for-post
sidebar_label: Middleware for Post
sidebar_position: 8
description: How to Build Content app - Middleware for Post
---

Middlewares enable dynamic rules for when an action is performed. Middlewares are essentially smart contracts that execute a piece of logic before that action is executed. In this section the action we are looking at is to [Collect a Post](/how-to/build-content-app/collect-a-post).

Middleware for Post can be used to set the rules on what should happen when a user collects a post (e.g. users should pay a specific ERC-20 token amount and/or set the number of times the post can be collected with `CollectPaidMw` etc).

## GraphQL mutations

By now this process should be really familiar. Set middleware for post follows the same two step process that requires two GraphQL mutations: `CreateSetEssenceDataTypedData` and `Relay`.

1. `CreateSetEssenceDataTypedData` is used to present data to the user in a readable format:

```tsx title="graphql/CreateSetEssenceDataTypedData.ts"
import { gql } from "@apollo/client";

export const CREATE_SET_ESSENCE_DATA_TYPED_DATA = gql`
    mutation CreateSetEssenceDataTypedData(
        $input: CreateSetEssenceDataTypedDataInput!
    ) {
        createSetEssenceDataTypedData(input: $input) {
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

## Middleware for Post

:::info

Setting a middleware for an essence can be done either during the essence registration as it was initially done in the [Create a Post](/how-to/build-content-app/create-a-post) section or after the registration process as described in this section.

:::

:::tip

There are multiple available middlewares that can be implemented. Visit the [Middleware](/core-concepts/middleware) section to view the full list.

:::

Let's get to the implementation! The approach is almost exactly the same as it was for [Middleware for Subscribe](/how-to/build-content-app/middleware-for-subscribe).

Note that `CreateSetEssenceDataTypedData` allows you to do the following:

1. To set the rules on what should happen when a user collects a post (e.g. users should pay a specific ERC-20 token amount or set the number of times the post can be collected);
2. To set the `tokenURI` of the Essence NFT that get minted and transferred to the collector's wallet address.

The focus in this example is to set `collectPaid` middleware to enable a rule so that when others want to collect a user's essence they will have to pay 1 LINK to do so.

1. Get data in a readable format and the `typedDataID` for it;
2. Get the user to sign the message data and get its `signature`;
3. Call the `relay` and pass it the `typedDataID` and `signature`;

Optionally you can also set the `tokenURI` by constructing the metadata object for the Essence NFT and uploading it to IPFS to get the hash and pass it as a parameter.

```tsx title="components/SetEssenceBtn.tsx"
/* Create typed data in a readable format */
const typedDataResult = await createSetEssenceDataTypedData({
    variables: {
        input: {
            options: {
                /* The chain id on which the Essence NFT will be minted on */
                chainID: chainID,
            },
            /* The id of the essence the middleware is set for */
            essenceId: essenceID,
            /* The id of the profile that created the essence */
            profileId: profileID,
            /* URL for the json object containing data about content and the Essence NFT */
            tokenURI: `https://cyberconnect.mypinata.cloud/ipfs/QmWeusbdbY2SEry1GEiJpmzd3Frp29wMNS3ZbNN21hLbVw`,
            /* The middleware that will be set for the essence */
            middleware: {
                collectPaid: {
                    /* Address that will receive the amount */
                    recipient: account,
                    /* Number of times the Essence can be collected */
                    totalSupply: 1000,
                    /* Amount that needs to be paid to collect essence */
                    amount: 1,
                    /* The currency for the  amount. Chainlink token contract on Goerli */
                    currency: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
                    /* If it require that the collector is also subscribed */
                    subscribeRequired: false,
                },
            },
        },
    },
});
const typedData =
    typedDataResult.data?.createSetEssenceDataTypedData?.typedData;
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

If the middleware was set successfully, you can verify the transaction hash on [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-content-app-middleware-for-post-tx.png)

![transaction hash](/img/v2/build-content-app-middleware-for-post-tx2.png)

Now that the middleware is set, whenever someone wants to collect the user's essence they will have to pay 1 LINK to collect and will receive an Essence NFT that looks like this:

![nft essence](/img/v2/build-content-app-middleware-for-post-nft.png)

Congrats! You've completed the **How to Build Content app** guide! Now you can build your own content application and get super creative with it. We would love to see your work so don't forget to share it on our [Discord](https://discord.com/invite/cUc8VRGmPs) channel!
