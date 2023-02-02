---
id: subscribemw
title: Set Subscribe Middleware
slug: /guides/mutation/middleware-subscribe
sidebar_label: Set Subscribe Middleware
sidebar_position: 5
description: Middleware - Subscribe Middleware
---

## Workflow

Set middleware for subscribe is a powerful API that allows developers to customize their apps and create a unique experience for their users. The API interacts with the smart contract and sets the defined rules on how it should behave for a specific action, such as subscribing to a profile.

1. First, data should be presented to the user in a readable format when signing from the wallet. To do that you’ll need to call the `createSetSubscribeDataTypedData` API that takes care of this.

    If you’re unfamiliar with typed data, you can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

    This API sets the parameters for subscribing such as `tokenURI` and `middleware` so when a user subscribes to this profile, the Middleware will be triggered and the NFT minted will have the specified Token URI.

    In this example we are setting the `subscribePaid` middleware which will require the user to pay a fee to subscribe to the profile.<br/>
    To view a full list of supported middlewares check out the [Middleware](/concepts/middleware) guide.

:::caution

This API requires: 
1. `Authorization` header with the `Bearer` token 
2. `X-API-KEY` 
You can learn more about it [here](/guides/authentication/authentication).

:::

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="createSetSubscribeDataTypedData" />

## 2. Get User Signature ✍️
2. Second, once you received data in a readable format, you’ll need to get the user’s signature for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that is necessary for the next step.

## 3. Call `relay` and get `relayActionID`
3. Third, you’ll have to call the `relay` API that will broadcast the transaction and interact with the smart contract setting the middleware, you will need to put as params the `typedDataID` you received from `createSetSubscribeDataTypedData` mutation call and the user's `signature`.

<ApolloCard queryName="relay" />

## 4. Call `relayActionStatus` to receive `txHash`
Finally you poll the `relayActionStatus` API using the `relayActionId` returned from the previous step to get the status of the related transaction. There are three possible response types:
1. `RelayActionStatusResult`
2. `RelayActionQueued`
3. `RelayActionError`

<ApolloCard queryName="relayActionStatus" />

You can now verify the transaction by looking up the `txHash` from the response on [etherscan.io](http://etherscan.io). That’s it! You’re all done!


## Experiment in Sandbox

We’ve created an example that incorporates all the steps for Set Middleware for Subscribe. Feel free to experiment with our code in the sandbox below.

<iframe src="https://codesandbox.io/embed/set-middleware-subscribe-bc24yk?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
     title="set-middleware-subscribe"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
