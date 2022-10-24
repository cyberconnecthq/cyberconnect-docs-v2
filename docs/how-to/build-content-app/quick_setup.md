---
id: quick-setup
title: Quick Setup
slug: /how-to/build-content-app/quick-setup
sidebar_label: Quick Setup
sidebar_position: 1
description: How to Build Content app - Quick Setup
---

This guide will teach you how to create a social application where users can create on-chain content and connections in the social network. You will learn to implement features that will empower your users to own their social identities and the content they've created.

Once users have set up their profiles, they will have the ability to enable rules for the subscriptions to their profiles (e.g. pay to subscribe) and the posts they've created (e.g. pay to collect post).

This is a more comprehensive example with the sole purpose of going over core features and highlighting how easy to implement them. Later on you can extrapolate and get creative with your project to create different use cases that would truly make your app stand out.

## Jump to

How to Build Content app covers the following sections:

1. [Create a Profile](/how-to/build-content-app/create-a-profile)
2. [Authentication](/how-to/build-content-app/authentication)
3. [Subscribe to Profile](/how-to/build-content-app/subscribe-to-profile)
4. [Create a Post](/how-to/build-content-app/create-a-post)
5. [Collect a Post](/how-to/build-content-app/collect-a-post)
6. [Middleware for Subscribe](/how-to/build-content-app/middleware-for-subscribe)
7. [Middleware for Post](/how-to/build-content-app/middleware-for-post)

## Prerequisites

The app you're about to build is using [Next.js](https://nextjs.org/). Make sure that you have installed [Node.js](https://nodejs.org/en/download/) on your computer and [MetaMask](https://metamask.io/) extension in your Chrome browser.

## Installation

Clone the repo [https://github.com/cyberconnecthq/cc-content-app.git](https://github.com/cyberconnecthq/cc-content-app.git) and run the following command in your terminal to install all the packages that are necessary to start the development server: `npm install` or `yarn install`.

## Local Development

To start the local development server run the command `npm run dev` or `yarn dev` and open up the browser window http://localhost:3000. Most changes are reflected live without having to restart the server.

## Live demo

This is the link for the live version of the app you are about to build: [https://cc-content-app.vercel.app/](https://cc-content-app.vercel.app/)

Let's dive into the docs and start building a content application!
