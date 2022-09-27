---
id: quickSetup
title: Quick Setup
slug: /howTo/buildASbtApp/quickSetup
sidebar_label: Quick Setup
sidebar_position: 1
description: How to Build a SBT app - Quick Setup
---

This guide will cover all the necessary steps and teach you how to create an SBT issuing application. You are going to build this project using [React.js](https://reactjs.org/).

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

## Sandbox

You can find the full code in the sandbox below. It covers all the steps that are described in this guide:

1. [Authentication](/howTo/buildASbtApp/authentication)
2. [Create Profile NFT](/howTo/buildASbtApp/createProfileNft)
3. [Mint a SBT](/howTo/buildASbtApp/mintASbt)

<iframe
  src="https://codesandbox.io/embed/sbt-guide-9s56gs?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
  title="sbt-guide"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

Now that everything is set up, let's dive into it and start building a SBT issuing app!
