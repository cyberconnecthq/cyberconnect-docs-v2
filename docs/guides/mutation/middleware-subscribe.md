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

import PostmanCard from "@site/src/components/PostmanCard";

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-e5d96dc7-a4a4-44dd-8293-d8248a99b97b"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-2e2505da-2aae-4cbb-8e4f-ac51af565b1d"
/>

2. Second, once you received data in a readable format, you’ll need to get the user’s signature for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that it’s necessary for the next step.

3. Third, you’ll have to call the `relay` API that will broadcast the transaction and interact with the smart contract setting the middleware.

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-96e22ded-0561-496f-8a1a-c03d9b934a27"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-90070a1c-5be2-47e1-b30d-b9c5a6db4fbd"
/>

You can now verify the transaction by looking up the `txHash` from the response on [etherscan.io](http://etherscan.io). That’s it! You’re all done!

## Experiment in Sandbox

We’ve created an example that incorporates all the steps for Set Middleware for Subscribe. Feel free to experiment with our code in the sandbox below.

<iframe src="https://codesandbox.io/embed/set-middleware-subscribe-bc24yk?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
     title="set-middleware-subscribe"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
