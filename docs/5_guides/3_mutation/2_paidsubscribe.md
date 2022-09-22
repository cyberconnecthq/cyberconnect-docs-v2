---
id: paidsubscribe
title: Paid Subscribe
slug: /guides/mutation/paid-subscribe
sidebar_label: Paid Subscribe
sidebar_position: 2
description: Mutation - Paid Subscribe
---

## Workflow

![subscribe-to-profile.gif](/gif/subscribe-to-profile.gif)

Subscribing to a profile can be implemented in just a few easy steps. What subscribing to a profile essentially means is that the user will mint an NFT by calling a couple of APIs.

1. First, data should be presented to the user in a readable format when signing from the wallet. To do that you’ll need to call the `createSubscribeTypedData` API that takes care of this.

    If you’re unfamiliar with typed data, you can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

import PostmanCard from "@site/src/components/PostmanCard";

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-669eb260-06b2-4249-a871-43ec428fcf0e"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-8109f784-fe2b-4210-b564-b36d0f1f7b06"
/>

2. Second, once you received data in a readable format, you’ll need to get the user’s signature (`eth_signTypedData_v4`) for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that it’s necessary for the next step.

[Ethers](https://docs.ethers.io/v5/) library is one option that can quickly help you write a function to get the user’s signature for a specific message. In this our case the message represents the typed data from step 1.

3. Third, you’ll have to call the `relay` API that will broadcast the transaction and mint the subscribe NFT.

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-f0980b70-f2fb-4100-acdf-90fb12fd8381"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-c88037b4-f410-44e2-91c5-5304019503ed"
/>

You can now verify the transaction by looking up the `txHash` from the response on [etherscan.io](http://etherscan.io). That’s it! You’re all done!

## Experiment in Sandbox

We’ve created an example that incorporates all the steps for Subscribe to a profile. Feel free to experiment with our code in the sandbox below. This covers a couple of steps

1. Login with wallet
2. Subscribe to a profile

<iframe src="https://codesandbox.io/embed/subscribe-to-profile-l1hts6?fontsize=14&hidenavigation=1&theme=dark"
    title="subscribe-to-profile"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
