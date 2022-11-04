---
id: overview
title: Overview
slug: /how-to/create-nft-with-backend/overview
sidebar_label: Overview
sidebar_position: 3
description: How to Create NFT with Backend - Overview
---

The CyberConnect offers a great way for developers to issue their EssenceNFT or SubscriberNFT based on on-chain conditions through the middleware. 

However, sometimes it will be challenging to issue these NFTs based on **off-chain** data from the application’s own backend. There are two ways to solve this problem,

1. Use permission middleware such as **collectPermissionMw**
2. Delegate to **proxy relayer** to finish the actions


**Solution 1** needs the application backend to manage a signer key and sign each action with this key. The permission middleware will check if the signature is valid before each action (e.g. mint an EssenceNFT). 

**Solution 2** offers a quick way for developers to interact with CyberConnect protocol. This tutorial will give more details about how to delegate actions to a proxy relayer.

:::info

This API is in the beta phase and needs an **X-API-Key** token. Please contact us for setup. 

::: 

:::info

Use https://api.stg.cyberconnect.dev/proxy/playground for proxy replayer playground

:::

## Prerequisite

1. Prepare a ProfileNFT in the corresponding chain you want to issue EssenceNFT
2. Set the ProfileNFT’s operator address to be the proxy relayer address

## Step 1: Register EssenceNFT

1. Application backend call **ProxyRegister** to Proxy Relayer with params
2. when uploading metadata to IPFS, please make sure it complies with [**CyberConnect Metadata Standard**](https://docs.cyberconnect.me/concepts/metadata) so that it can be indexed and displayed properly on NFT marketplace like OpenSea.
3. The proxy relayer will send out a register transaction and returns an **item_id**. This is an async API, so the backend may need to check the proxy relayer later for the final status

## Step 2: User Collect EssenceNFT

1. The user from the application front-end makes a collect call to the application backend with the address and item_id
2. Application backend checks the eligibility of minting
3. If eligible, the application backend makes a **ProxyCollect** call to the Proxy Relayer, it will send out collect transactions to corresponding chains. 
4. The application backend can check with the Proxy Relayer later for the final status.

## Workflow

![cc_proxy_relayer](/img/v2/cc_proxy_relayer.png)