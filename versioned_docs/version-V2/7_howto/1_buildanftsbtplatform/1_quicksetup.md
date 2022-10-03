---
id: quickSetup
title: Quick Setup
slug: /how-to/build-a-nft-sbt-platform/quickSetup
sidebar_label: Quick Setup
sidebar_position: 1
description: How to Build a NFT/SBT platform - Quick Setup
---

This guide will cover all the necessary steps and teach you how to create a NFT/SBT issuing platform. You are going to build this project using [React.js](https://reactjs.org/).

## Installation

Before you start, make sure that you have installed [Node.js](https://nodejs.org/en/download/) and [MetaMask Chrome](https://metamask.io/) extension and afterward open the terminal and run the command:

```bash
npx create-react-app my-app --template typescript
```

or

```bash
yarn  create-react-app my-app --template typescript
```

## Apollo client

In addition, you will be using the [Apollo client](https://www.apollographql.com/docs/) library to query the CyberConnect API, so in the terminal run the following command to install the packages:

```bash npm2yarn
npm install @apollo/client graphql
```

## Full code

:::info

The demo presented in this guide is using the **CyberConnect Profile** smart contract for the Goerli Testnet Network. Please refer to the [Cheat sheet](/cheatSheet) to find the full list of contract addresses for the CyberConnect Protocol.

:::

The demo in this guide covers the following steps:

1. [Authentication](/how-to/build-a-nft-sbt-platform/authentication)
2. [Create Profile NFT](/how-to/build-a-nft-sbt-platform/create-profile-nft)
3. [Create Essence NFT](/how-to/build-a-nft-sbt-platform/create-essence-nft)
4. [Collect Essence NFT](/how-to/build-a-nft-sbt-platform/collect-essence-nft)

### Github

Check out the full code for the demo in the repo: [https://github.com/cyberconnecthq/build-nft-sbt-guide](https://github.com/cyberconnecthq/build-nft-sbt-guide).

### Sandbox

Test out or play around with the the code in the sandbox below.

<iframe
  src="https://codesandbox.io/embed/build-nft-sbt-guide-9s56gs?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
  title="build-nft-sbt-guide"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

Now that everything is set up, let's dive into it and start building a NFT/SBT issuing platform!
