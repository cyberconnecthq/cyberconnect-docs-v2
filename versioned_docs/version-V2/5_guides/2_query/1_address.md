---
id: address
title: Query Address
slug: /guides/query/address
sidebar_label: Address
sidebar_position: 1
description: Query - Address
---

## Get single address

The most basic concept in CyberConnect is a EVM `address` which encapsulates multiple `wallet`. Each Wallet is a combination of `<chainId, address>` .

import PostmanCard from "@site/src/components/PostmanCard";

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-fd9325d2-5d4f-457a-8bf4-7b073fcad3ee"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-06d1eb3b-3841-4047-a726-4849ad198a06"
/>

## Batch get multiple addresses

You can also get multiple addresses and their identity, recommendations at a time! This is useful when you have a page / list of addresses.

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-117a4079-cbcf-444f-8d32-bac000e6b9ef"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-c6f1e866-3784-4246-8c07-bab1e4348799"
/>
