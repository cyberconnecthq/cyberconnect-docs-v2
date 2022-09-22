---
id: registeressence
title: Register Essence
slug: /guides/mutation/register-essence
sidebar_label: Register Essence
sidebar_position: 3
description: Mutation - Register Essence
---

## Workflow

![register-essence.gif](/gif/register-essence.gif)

Registering an essence can be implemented in just a few easy steps. What registering an essence essentially means is that the user will deploy an NFT contract by calling a couple of APIs.

1. First, data should be presented to the user in a readable format when signing from the wallet. To do that you’ll need to call the `createRegisterEssenceTypedData` API that takes care of this.

    If you’re unfamiliar with typed data, you can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

import PostmanCard from "@site/src/components/PostmanCard";

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-88e0cbdb-6643-4b6c-a4dd-990158e777e1"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-71572dce-f9ec-4a93-8226-dfe26e7343f2"
/>

1. Second, once you received data in a readable format, you’ll need to get the user’s signature (`eth_signTypedData_v4`) for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that it’s necessary for the next step.

1. Third, you’ll have to call the `relay` API that will broadcast the transaction and mint the essence NFT.

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-bb70b78d-e71d-40b1-8a11-6c520714d4a5"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-bd94dc26-0cf9-4c0d-8958-693d47e7338e"
/>

You can now verify the transaction by looking up the `txHash` from the response on [etherscan.io](http://etherscan.io). That’s it! You’re all done!

## Experiment in Sandbox

We’ve created an example that incorporates all the steps for Register Essence. Feel free to experiment with our code in the sandbox below. This covers a couple of steps

1. Login with wallet
2. Register Essence

<iframe src="https://codesandbox.io/embed/register-essence-kfmjbi?fontsize=14&hidenavigation=1&theme=dark"
    title="register-essence"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
