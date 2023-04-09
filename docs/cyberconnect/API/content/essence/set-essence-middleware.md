---
id: set-essence-middleware
title: Set essence middleware
slug: /api/content/essence/set-essence-middleware
sidebar_label: Set essence middleware
sidebar_position: 5
description: Set essence middleware
---

## Workflow

Set middleware for essence is a powerful API that allows developers to customize their apps and create a unique experience for their users. The API interacts with the smart contract and sets the defined rules on how it should behave for a specific action, such as collecting an essence.

## 1. Generate Typed Data

:::caution
All typedData mutations require an `Authorization` header with the `Bearer` token. You can learn how to get a bearer token in the [User Login](/api/authentication/user-login) section.
:::

First, data should be presented to the user in a readable format when signing from the wallet. To do that you’ll need to call the `createSetEssenceDataTypedData` API that takes care of this.

If you’re unfamiliar with typed data, you can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

This API sets/updates the parameters for the essence such as `tokenURI` and `middleware` so when a user collects this essence, the Middleware will be triggered and the NFT minted will have the specified Token URI.

In this example we are setting the `collectPaid` middleware which will require the user to pay a fee to collect the essence.<br/>
To view a full list of supported middlewares check out the [Middleware](/core-concepts/middleware) guide.

<!-- import ApolloCard from "@site/src/components/ApolloCard"; -->

<!-- <ApolloCard queryName="createSetEssenceDataTypedData" /> -->

## 2. Get User Signature ✍️

Second, once you received data in a readable format, you’ll need to get the user’s signature for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that is necessary for the next step.

## 3. Call `relay` and get `relayActionID`

:::caution
In order to call the `relay` mutation, you must include your `X-API-KEY` in the header.
You can learn more about how to get one [here](/api/authentication/introduction).
:::

Third, you’ll have to call the `relay` API that will broadcast the transaction and interact with the smart contract setting the middleware, you will need to put as params the `typedDataID` you received from `createSetEssenceDataTypedData` mutation call and the user's `signature`.

<!-- <ApolloCard queryName="relay" /> -->

## 4. Call `relayActionStatus` to receive `txHash`

Finally you poll the `relayActionStatus` API using the `relayActionId` returned from the previous step to get the status of the related transaction. There are three possible response types:

1. `RelayActionStatusResult`
2. `RelayActionQueued`
3. `RelayActionError`

<!-- <ApolloCard queryName="relayActionStatus" /> -->

You can now verify the transaction by looking up the `txHash` from the response on [etherscan.io](http://etherscan.io). That’s it! You’re all done!
