---
id: register-essence
title: Register Essence
slug: /guides/mutation/register-essence
sidebar_label: Register Essence
sidebar_position: 5
description: Mutation - Register Essence
---

## Workflow

## 1. Generate Typed Data

Registering an essence can be implemented in just a few easy steps. What registering an essence essentially means is that the user will deploy an NFT contract by calling a couple of APIs.

First, data should be presented to the user in a readable format when signing from the wallet. To do that you’ll need to call the `createRegisterEssenceTypedData` API that takes care of this.

If you’re unfamiliar with typed data, you can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

:::caution

This API requires:

1. `Authorization` header with the `Bearer` token
2. `X-API-KEY`
   You can learn more about it [here](/guides/authentication/authentication).

:::

<!-- import ApolloCard from "@site/src/components/ApolloCard"; -->

<!-- <ApolloCard queryName="createRegisterEssenceTypedData" /> -->

## 2. Get User Signature ✍️

2. Second, once you received data in a readable format, you’ll need to get the user’s signature (`eth_signTypedData_v4`) for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that is necessary for the next step.

## 3. Call `relay` and get `relayActionID`

3. Third, you’ll have to call the `relay` API that will broadcast the transaction and mint the essence NFT, you will need to put as params the `typedDataID` you received from `createRegisterEssenceTypedData` mutation call and the user's `signature`.

<!-- <ApolloCard queryName="relay" /> -->

## 4. Call `relayActionStatus` to receive `txHash`

Finally you poll the `relayActionStatus` API using the `relayActionId` returned from the previous step to get the status of the related transaction. There are three possible response types:

1. `RelayActionStatusResult`
2. `RelayActionQueued`
3. `RelayActionError`

<!-- <ApolloCard queryName="relayActionStatus" /> -->

You can now verify the transaction by looking up the `txHash` from the response on [etherscan.io](http://etherscan.io). That’s it! You’re all done!

## Experiment in Sandbox

We’ve created an example that incorporates all the steps for Register Essence. Feel free to experiment with our code in the sandbox below. This covers a couple of steps

1. Login with wallet
2. Register Essence

<iframe src="https://codesandbox.io/embed/register-essence-forked-ofdyez?fontsize=14&hidenavigation=1&theme=dark"
     title="register-essence (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
