---
id: collect-essence
title: Collect essence
slug: /api/content/essence/collect-essence
sidebar_label: Collect essence
sidebar_position: 2
description: Collect essence
---

## Workflow

Collecting an essence can be implemented in just a few easy steps. What collecting an essence essentially means is that the user will mint an NFT by calling a couple of APIs.

:::caution
All typedData mutations require an `Authorization` header with the `Bearer` token. You can learn how to get a bearer token in the [User Login](api/authentication/user-login) section.
:::


## 1. Generate Typed Data

First, data should be presented to the user in a readable format when signing from the wallet. To do that you’ll need to call the `createCollectEssenceTypedData` API that takes care of this.

    If you’re unfamiliar with typed data, you can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

<!-- import ApolloCard from "@site/src/components/ApolloCard"; -->

<!-- <ApolloCard queryName="CreateCollectEssenceTypedData" /> -->

## 2. Get User Signature ✍️

Second, once you received data in a readable format, you’ll need to get the user’s signature for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that is necessary for the next step.

- [Ethers](https://docs.ethers.io/v5/) library is one option that can quickly help you write a function to get the user’s signature for a specific message. In this our case the message represents the typed data from step 1.

## 3. Call `relay` and get `relayActionID`

:::caution 
In order to call the `relay` mutation, you must include your `X-API-KEY` in the header.
You can learn more about how to get one [here](/api/authentication/introduction).
:::

Third, you’ll have to call the async `relay` API that will queue the transaction for broadcasting and minting the NFT for the given essence.

- You will need to put as params the `typedDataID` you received from `createCollectEssenceTypedData` mutation call and the user's `signature`.

<!-- <ApolloCard queryName="relay" /> -->

## 4. Call `relayActionStatus` to receive `txHash`

Finally you poll the `relayActionStatus` API using the `relayActionId` returned from the previous step to get the status of the related transaction. There are three possible response types:

1. `RelayActionStatusResult`
2. `RelayActionQueued`
3. `RelayActionError`

<!-- <ApolloCard queryName="relayActionStatus" /> -->

You can now verify the transaction by looking up the `txHash` from the response on [bscscan](https://bscscan.com). That’s it! You’re all done!
