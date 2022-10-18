---
id: collect-essence
title: Collect Essence
slug: /guides/mutation/collect-essence
sidebar_label: Collect Essence
sidebar_position: 4
description: Mutation - Collect Essence
---

## Workflow

![collect-essence.gif](/gif/collect-essence.gif)

Collecting an essence can be implemented in just a few easy steps. What collecting an essence essentially means is that the user will mint an NFT by calling a couple of APIs.

1. First, data should be presented to the user in a readable format when signing from the wallet. To do that you’ll need to call the `createCollectEssenceTypedData` API that takes care of this.

   If you’re unfamiliar with typed data, you can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

:::tip

This API requires `Authorization` header with the `Bearer` token. You can learn more about it [here](/guides/authentication/user-login).

:::

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="CreateCollectEssenceTypedData" />

1. Second, once you received data in a readable format, you’ll need to get the user’s signature for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that it’s necessary for the next step.

[Ethers](https://docs.ethers.io/v5/) library is one option that can quickly help you write a function to get the user’s signature for a specific message. In this our case the message represents the typed data from step 1.

1. Third, you’ll have to call the `relay` API that will broadcast the transaction and mint the NFT for the collected essence, you will need to put as params the `typedDataID` you received from `createCollectEssenceTypedData` mutation call and the user's `signature`.

:::tip

This API requires `Authorization` header with the `Bearer` token. You can learn more about it [here](/guides/authentication/user-login).

:::

<ApolloCard queryName="relay" />

You can now verify the transaction by looking up the `txHash` from the response on [etherscan.io](http://etherscan.io). That’s it! You’re all done!

## Experiment in Sandbox

We’ve created an example that incorporates all the steps for Collect Essence. Feel free to experiment with our code in the sandbox below. This covers a couple of steps

1. Login with wallet
2. Collect the Essence

<iframe src="https://codesandbox.io/embed/collect-essence-phlqfs?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
    title="collect-essence"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
