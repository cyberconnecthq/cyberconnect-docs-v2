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

# Here are some more details on each of the supported sub-fields: 

## 1. tokenBalanceInfo
1. `tokenBalanceInfo` are recommended web2 social profiles that might be interesting to an address based on trading history & current balance.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getTokenBalanceInfo" />

## 2. tokenRecommendation
2. `tokenRecommendation` are recommended Tokens the address should purchase based on modeling trading behavior & holdings relative to other addresses (i.e. collaborative filtering model).

<ApolloCard queryName="getTokenRecommendation" />

## 3.  userRecommendation
3.  `userRecommendation` are recommended addresses to follow based on the finding other addresses with similar NFT trading history as the input addresses.

<ApolloCard queryName="getUserRecommendation" />
