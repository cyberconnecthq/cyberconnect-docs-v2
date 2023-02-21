---
id: set-subscribe-middleware
title: Set subscribe middleware
slug: apis/connection/subscribe/set-subscribe-middleware
sidebar_label: Set subscribe middleware
sidebar_position: 3
description: Subscribe middleware
---

## Workflow

Set middleware for subscribe is a powerful API that allows developers to customize their apps and create a unique experience for their users. The API interacts with the smart contract and sets the defined rules on how it should behave for a specific action, such as subscribing to a profile.

## 1. Generate Typed Data

First, data should be presented to the user in a readable format when signing from the wallet. To do that you’ll need to call the `createSetSubscribeDataTypedData` API that takes care of this.

If you’re unfamiliar with typed data, you can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

This API sets the parameters for subscribing such as `tokenURI` and `middleware` so when a user subscribes to this profile, the Middleware will be triggered and the NFT minted will have the specified Token URI.

In this example we are setting the `subscribePaid` middleware which will require the user to pay a fee to subscribe to the profile.<br/>
To view a full list of supported middlewares check out the [Middleware](/core-concepts/middleware) guide.

:::caution

This API requires:

1. `Authorization` header with the `Bearer` token
2. `X-API-KEY`
   You can learn more about it [here](/api/authentication/introduction).

:::

<!-- import ApolloCard from "@site/src/components/ApolloCard"; -->

<!-- <ApolloCard queryName="createSetSubscribeDataTypedData" /> -->

## 2. Get User Signature ✍️

2. Second, once you received data in a readable format, you’ll need to get the user’s signature for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that is necessary for the next step.

## 3. Call `relay` and get `relayActionID`

3. Third, you’ll have to call the `relay` API that will broadcast the transaction and interact with the smart contract setting the middleware, you will need to put as params the `typedDataID` you received from `createSetSubscribeDataTypedData` mutation call and the user's `signature`.

<!-- <ApolloCard queryName="relay" /> -->

## 4. Call `relayActionStatus` to receive `txHash`

Finally you poll the `relayActionStatus` API using the `relayActionId` returned from the previous step to get the status of the related transaction. There are three possible response types:

1. `RelayActionStatusResult`
2. `RelayActionQueued`
3. `RelayActionError`

<!-- <ApolloCard queryName="relayActionStatus" /> -->

You can now verify the transaction by looking up the `txHash` from the response on [bscscan](https://bscscan.com/). That’s it! You’re all done!
