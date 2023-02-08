---
id: quick-setup
title: Quick Setup
slug: /how-to/build-badge-app/quick-setup
sidebar_label: Quick Setup
sidebar_position: 1
description: How to Build Badge app - Quick Setup
---

This guide will teach you how to create a social application where users can create on-chain badges that can be linked to an event. Once users have set up their profiles, they will be able to create badges for an event and attendees will have the ability to collect them by attending that event.

This is a basic example with the sole purpose of going over core features and highlighting how easy to implement them. Later on you can extrapolate and get creative with your project to create different use cases that would truly make your app stand out.

## Jump to

How to Build Badge app covers the following sections:

1. [Create a Profile](/how-to/create-ccProfile/gas-mode)
2. [Authentication](/how-to/build-badge-app/authentication)
3. [Create a Badge](/how-to/build-badge-app/create-a-badge)
4. [Collect a Badge](/how-to/build-badge-app/collect-a-badge)

## Prerequisites

The app you're about to build is using [Next.js](https://nextjs.org/). Make sure that you have installed [Node.js](https://nodejs.org/en/download/) on your computer and [MetaMask](https://metamask.io/) extension in your Chrome browser.

## Installation

Clone the repo [https://github.com/cyberconnecthq/cc-badge-app.git](https://github.com/cyberconnecthq/cc-badge-app.git) and run the following command in your terminal to install all the packages that are necessary to start the development server: `npm install` or `yarn install`.

## Set up env variables

In this demo, you need set 5 env variables:

1. `NEXT_PUBLIC_API_KEY` and `NEXT_PUBLIC_API_SECRET` are for uploading metadata using Pinata (register on [Pinata](https://www.pinata.cloud/)).
2. For development environment, you need set `NEXT_PUBLIC_GRAPHQL_ENDPOINT` to `https://api.cyberconnect.dev/testnet/` .
3. When you call the `relay` mutation from the API, you need put `X-API-KEY: process.env.NEXT_PUBLIC_CYBERCONNECT_API_KEY` in the request header, you can register the key from the [dashboard](https://dashboard.cyberconnect.me/).
4. Last but not least, make sure set `NEXT_PUBLIC_CHAIN_ID` to `97` which is BSC Testnet.

```
NEXT_PUBLIC_API_KEY=*** // PINATA API KEY
NEXT_PUBLIC_API_SECRET=*** // PINATA API SECRET
NEXT_PUBLIC_CYBERCONNECT_API_KEY=*** // CyberConnect API KEY register: https://dashboard.cyberconnect.me/
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.cyberconnect.dev/testnet/ // CyberConnect Endpoint
NEXT_PUBLIC_CHAIN_ID=97 // BSC Testnet

```

## Local Development

To start the local development server run the command `npm run dev` or `yarn dev` and open up the browser window http://localhost:3000. Most changes are reflected live without having to restart the server.

## Live demo

This is the link for the live version of the app you are about to build: [https://cc-badge-app.vercel.app/](https://cc-badge-app.vercel.app/)

Let's get started with building an application where users can issue and collect badges!
