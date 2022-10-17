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

   This API sets/updates the parameters for the essence such as `tokenURI` and `middleware` so when a user collects this essence, the Middleware will be triggered and the NFT minted will have the specified Token URI.

   In this example we are setting the `collectPaid` middleware which will require the user to pay a fee to collect the essence.<br/>
   To view a full list of supported middlewares check out the [Middleware](/concepts/middleware) guide.

import PostmanCard from "@site/src/components/PostmanCard";

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-3682ce14-45e2-4f10-af3d-75d351fddbd5"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-176d8ef8-7ec5-4d25-922e-22b577a5e53c"
/>

2. Second, once you received data in a readable format, you’ll need to get the user’s signature for it. Basically, you’ll need to write a function and pass it a `message` as a param and return the `signature` that it’s necessary for the next step.

3. Third, you’ll have to call the `relay` API that will broadcast the transaction and interact with the smart contract setting the middleware.

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-280ae85f-0d8a-49d3-88f1-ce02cd44372e"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-90383573-4d45-4bb4-8b80-b0ca4b41681d"
/>

You can now verify the transaction by looking up the `txHash` from the response on [etherscan.io](http://etherscan.io). That’s it! You’re all done!

## Experiment in Sandbox

We’ve created an example that incorporates all the steps for Set Middleware for Subscribe. Feel free to experiment with our code in the sandbox below.

<iframe src="https://codesandbox.io/embed/set-middleware-essence-9yb14c?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
     title="set-middleware-essence"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
