---
id: feed
title: Feed
slug: /guides/recommendation-engine/feed
sidebar_label: Feed
sidebar_position: 3
description: Recommendation Engine - Feed
---

The `feed` fields under `Wallet` will return the latest ERC transfer history for a given address. To speed up the query you can choose to exclude the `token` field in your query (which is only used to get the token_address info).

import PostmanCard from "@site/src/components/PostmanCard";

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-d226b206-9ee7-4dde-b1d9-9b08fda6b307"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-637501c0-782e-477c-b34f-999af81c00b8"
/>
