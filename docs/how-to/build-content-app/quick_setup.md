---
id: quick-setup
title: Quick Setup
slug: /how-to/build-content-app/quick-setup
sidebar_label: Quick Setup
sidebar_position: 1
description: How to Build Content app - Quick Setup
---

This guide will teach you how to create your own content application from scratch using [React.js](https://reactjs.org/).

## Installation

Make sure that you have installed [Node.js](https://nodejs.org/en/download/) on your computer and [MetaMask](https://metamask.io/) extension in your Chrome browser. Once they are installed you can open the terminal and run the command:

```bash
npx create-react-app cc-content-app --template typescript
```

or

```bash
yarn create-react-app cc-content-app --template typescript
```

## Apollo client

Since you will be using the [Apollo client](https://www.apollographql.com/docs/) library to query the CyberConnect API, now it's a good time to open the in the terminal in the main directory of your app and install the following packages:

```bash npm2yarn
npm install @apollo/client graphql
```

## Full code

:::info

The app you're going to build by following this guide is using the **Link3 Profile** smart contract for the **Goerli Testnet Network**. Please refer to the [Cheat sheet](/cheat-sheet) to find the full list of contract addresses on top of the CyberConnect Protocol.

:::

### GitHub

You can find the full code for the demo on GitHub:
[https://github.com/cyberconnecthq/cc-content-app.git](https://github.com/cyberconnecthq/cc-content-app.git).

### Sandbox

[coming soon]
