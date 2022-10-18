---
id: essencemw
title: Set Essence Middleware
slug: /guides/mutation/middleware-essence
sidebar_label: Set Essence Middleware
sidebar_position: 6
description: Middleware - Essence Middleware
---

## Workflow

Set middleware for essence is a powerful API that allows developers to customize their apps and create a unique experience for their users. The API interacts with the smart contract and sets the defined rules on how it should behave for a specific action, such as collecting an essence.

1. First, data should be presented to the user in a readable format when signing from the wallet. To do that you’ll need to call the `createSetEssenceDataTypedData` API that takes care of this.

   If you’re unfamiliar with typed data, you can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

:::tip

This API requires `Authorization` header with the `Bearer` token. You can learn more about it [here](/guides/authentication/user-login).

:::

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="createSetEssenceDataTypedData" />

2. Second, once you received data in a readable format, you’ll need to get the user’s signature for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that it’s necessary for the next step.

3. Third, you’ll have to call the `relay` API that will broadcast the transaction and interact with the smart contract setting the middleware, you will need to put as params the `typedDataID` you received from `createSetEssenceDataTypedData` mutation call and the user's `signature`.

:::tip

This API requires `Authorization` header with the `Bearer` token. You can learn more about it [here](/guides/authentication/user-login).

:::

<ApolloCard queryName="relay" />

You can now verify the transaction by looking up the `txHash` from the response on [etherscan.io](http://etherscan.io). That’s it! You’re all done!

## Experiment in Sandbox

We’ve created an example that incorporates all the steps for Set Middleware for Subscribe. Feel free to experiment with our code in the sandbox below.

<iframe src="https://codesandbox.io/embed/set-middleware-essence-9yb14c?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
     title="set-middleware-essence"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
