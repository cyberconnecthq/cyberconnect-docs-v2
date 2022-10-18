---
id: middleware-for-subscribe
title: Middleware for Subscribe
slug: /how-to/build-content-app/middleware-for-subscribe
sidebar_label: Middleware for Subscribe
sidebar_position: 7
description: How to Build Content app - Middleware for Subscribe
---

Middlewares enable dynamic rules for when an action is performed. Middlewares are essentially smart contracts that execute a piece of logic before that action is executed. In this section the action we are looking at is to [Subscribe to Profile](/how-to/build-content-app/subscribe-to-profile).

Middleware for Subscribe can be used to set the rules on what should happen when someone subscribes to the user's profile (e.g. to allow other users to subscribe only once with `SubscribeOnlyOnceMw` or to pay a specific ERC-20 token amount with `SubscribePaidMw` etc).

## GraphQL mutations

By now this process should be really familiar. Set middleware for subscribe follows the same two step process that requires two GraphQL mutations: `CreateSetSubscribeDataTypedData` and `Relay`.

1. `CreateSetSubscribeDataTypedData` is used to present data to the user in a readable format:

```tsx title="graphql/CreateSetSubscribeDataTypedData.ts"
import { gql } from "@apollo/client";

export const CREATE_SET_SUBSCRIBE_DATA_TYPED_DATA = gql`
    mutation CreateSetSubscribeDataTypedData(
        $input: CreateSetSubscribeDataTypedDataInput!
    ) {
        createSetSubscribeDataTypedData(input: $input) {
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

## Middleware for Subscribe

:::tip

There are multiple available middlewares that can be implemented. Visit the [Middleware](/concepts/middleware) section to view the full list.

:::

Let's get to the implementation! The approach is almost exactly the same as it was for [Subscribe to Profile](/how-to/build-content-app/subscribe-to-profile).

Note that `CreateSetSubscribeDataTypedData` allows you to do the following:

1. To set the rules on what should happen when someone subscribes to the user's profile;
2. To set the `tokenURI` of the Subscribe NFT that get minted and transferred to the subscriber's wallet address.

The focus in this example is to set the `subscribePaid` middleware to enable a rule so that when others want to subscribe to the user's profile they will have to pay 1 LINK to do so:

1. Get data in a readable format and the `typedDataID` for it;
2. Get the user to sign the message data and get its `signature`;
3. Call the `relay` and pass it the `typedDataID` and `signature`;

Optionally you can also set the `tokenURI` by constructing the metadata object for the Subscribe NFT and uploading it to IPFS to get the hash and pass it as a parameter.

```tsx title="components/SetSubscribeBtn.tsx"
/* Construct the metadata object for the Subscribe NFT */
const metadata = {
    image_data: getSubscriberSVGData(),
    name: `@${handle}'s subscriber`,
    description: `@${handle}'s subscriber on CyberConnect Content app`,
};

/* Upload metadata to IPFS */
const ipfsHash = await pinJSONToIPFS(metadata);

/* Create typed data in a readable format */
const typedDataResult = await createSetSubscribeDataTypedData({
    variables: {
        input: {
            options: {
                /* The chain id on which the Subscribe NFT will be minted on */
                chainID: chainID,
            },
            /* The user's profile id for which the rules are enabled */
            profileId: profileID,
            /* URL for the json object containing data about the Subscribe NFT */
            tokenURI: `https://cyberconnect.mypinata.cloud/ipfs/${ipfsHash}`,
            middleware: {
                subscribePaid: {
                    /* Address that will receive the amount */
                    recipient: account,
                    /* Amount that needs to be paid to subscribe */
                    amount: 1,
                    /* The currency for the  amount. Chainlink token contract on Goerli */
                    currency: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
                    /* If it require the subscriber to hold a NFT */
                    nftRequired: false,
                    /* The contract of the NFT that the subscriber needs to hold */
                    nftAddress: "0x0000000000000000000000000000000000000000",
                },
            },
        },
    },
});
const typedData =
    typedDataResult.data?.createSetSubscribeDataTypedData?.typedData;
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

![transaction hash](/img/v2/build-content-app-middleware-for-subscribe-tx.png)

Now that the middleware is set, whenever someone wants to subscribe to the user's profile they will have to pay 1 LINK to subscribe and will receive a Subscribe NFT that looks like this:

![nft subscribe](/img/v2/build-content-app-subscribe-to-profile-nft.png)

Next up you will dive deep into the [Middleware for Post](/how-to/build-content-app/middleware-for-post) and learn how when to you use it and how to set one.
