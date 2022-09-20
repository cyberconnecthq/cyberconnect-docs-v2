---
id: collectessence
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

[Run in Postman](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-13c81f40-2b83-4725-be86-e06d50fa842a) [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-1e5ae208-8e99-4e24-b2f4-5218840dddce)

1. Second, once you received data in a readable format, you’ll need to get the user’s signature for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that it’s necessary for the next step.

[Ethers](https://docs.ethers.io/v5/) library is one option that can quickly help you write a function to get the user’s signature for a specific message. In this our case the message represents the typed data from step 1.

1. Third, you’ll have to call the `relay` API that will broadcast the transaction and mint the NFT for the collected essence.

[Run in Postman](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-9bb3c34f-a84e-4094-be17-f998b8e7bb4e) [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-b0437b46-abc6-4165-8763-a5786c864b03)

You can now verify the transaction by looking up the `txHash` from the response on [etherscan.io](http://etherscan.io). That’s it! You’re all done!

## Experiment in Sandbox

We’ve created an example that incorporates all the steps for Collect Essence. Feel free to experiment with our code in the sandbox below. This covers a couple of steps

1. Login with wallet
2. Subscribe to a profile

<iframe src="https://codesandbox.io/embed/collect-essence-phlqfs?fontsize=14&hidenavigation=1&theme=dark"
    title="collect-essence"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
