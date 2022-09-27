---
id: recommendation
title: Recommendations
slug: /guides/recommendation-engine/recommendation
sidebar_label: Recommendations
sidebar_position: 2
description: Recommendation Engine - Recommendation
---

The main entry point for address-based recommendations is the `Recommendations` type in `wallet`, it’s used for finding information that might be interesting to a given wallet based on its historical transaction history, current balance & project interactions.

```graphql
type Recommendation {
  tokenBalanceInfo(offset: Int, limit: Int): [TokenInfo!]
  tokenRecommendation(offset: Int, limit: Int): [TokenRecommendation!]
  userRecommendation(offset: Int, limit: Int): [UserRecommendation!]
}
```

There are 3 subfields/queries currently supported:
- `tokenBalanceInfo` is memory/heuristic-based while 
- The two others (`tokenRecommendation` & `userRecommendation`) are model-based.

### Here are some more details on each of the supported sub-fields: 

1. `tokenBalanceInfo` are recommended web2 social profiles that might be interesting to an address based on trading history & current balance.

import PostmanCard from "@site/src/components/PostmanCard";

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-88b9b1fb-13c1-4e3c-bc9e-a88ad22e1bf9"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-8d475121-b9a4-4f78-8152-bdaa259dbc28"
/>

2. `tokenRecommendation` are recommended Tokens the address should purchase based on modeling trading behavior & holdings relative to other addresses (i.e. collaborative filtering model).

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-1e8a4bcf-01a1-46d7-a126-8e6b67e05cfc"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-58c47fb2-126b-484d-afc5-2f9871a04e76"
/>

3.  `userRecommendation` are recommended addresses to follow based on the finding other addresses with similar NFT trading history as the input addresses.

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-a3507140-0efe-4fca-8f44-7486b57af8e4"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-b9e6e244-5d3d-49cc-a534-cad5a1b15494"
/>
