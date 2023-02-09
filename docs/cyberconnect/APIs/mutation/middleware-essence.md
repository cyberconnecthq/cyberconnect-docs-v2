---
id: essencemw
title: Set Essence Middleware
slug: /guides/mutation/middleware-essence
sidebar_label: Set Essence Middleware
sidebar_position: 8
description: Middleware - Essence Middleware
---

## Workflow

Set middleware for essence is a powerful API that allows developers to customize their apps and create a unique experience for their users. The API interacts with the smart contract and sets the defined rules on how it should behave for a specific action, such as collecting an essence.

## 1. Generate Typed Data

First, data should be presented to the user in a readable format when signing from the wallet. To do that you’ll need to call the `createSetEssenceDataTypedData` API that takes care of this.

If you’re unfamiliar with typed data, you can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

This API sets/updates the parameters for the essence such as `tokenURI` and `middleware` so when a user collects this essence, the Middleware will be triggered and the NFT minted will have the specified Token URI.

In this example we are setting the `collectPaid` middleware which will require the user to pay a fee to collect the essence.<br/>
To view a full list of supported middlewares check out the [Middleware](/core-concepts/middleware) guide.

:::caution

This API requires:

1. `Authorization` header with the `Bearer` token
2. `X-API-KEY`
   You can learn more about it [here](/guides/authentication/authentication).

:::

<!-- import ApolloCard from "@site/src/components/ApolloCard"; -->

<!-- <ApolloCard queryName="createSetEssenceDataTypedData" /> -->

## 2. Get User Signature ✍️

Second, once you received data in a readable format, you’ll need to get the user’s signature for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that is necessary for the next step.

## 3. Call `relay` and get `relayActionID`

Third, you’ll have to call the `relay` API that will broadcast the transaction and interact with the smart contract setting the middleware, you will need to put as params the `typedDataID` you received from `createSetEssenceDataTypedData` mutation call and the user's `signature`.

<!-- <ApolloCard queryName="relay" /> -->

## 4. Call `relayActionStatus` to receive `txHash`

Finally you poll the `relayActionStatus` API using the `relayActionId` returned from the previous step to get the status of the related transaction. There are three possible response types:

1. `RelayActionStatusResult`
2. `RelayActionQueued`
3. `RelayActionError`

<!-- <ApolloCard queryName="relayActionStatus" /> -->

You can now verify the transaction by looking up the `txHash` from the response on [etherscan.io](http://etherscan.io). That’s it! You’re all done!
