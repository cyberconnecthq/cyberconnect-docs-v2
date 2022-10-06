---
id: subscribing-relationships
title: Get Subscribing Relationships by an EVM address
slug: /guides/query/subscribing-relationships
sidebar_label: Subscribing Relationships
sidebar_position: 2
description: Query - Subscribing Relationships
---

Since all social data (`w3st` , `content`) are created under a `profile` , a subscription relationship is from a wallet to a profile. Each `wallet` has their subscribing `profiles` and each `profiles` has their subscriber `wallets`.

If this asymmetric design is too complicated, reach out to the team please!

import PostmanCard from "@site/src/components/PostmanCard";

## List subscribing by a wallet

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-230330ca-655c-4ed8-b958-f3753f02bdaf"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-b1a67a0c-5b51-48cd-92a9-e793f57cd0c7"
/>

## List subscribers by a profile

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-0ff5d939-ea20-4e70-9aa0-7efcb3fa7937"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-978e8d18-f07c-43ef-81f7-c10f5a789959"
/>
