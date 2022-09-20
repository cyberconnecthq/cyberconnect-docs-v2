---
id: recommendation
title: Recommendation
slug: /guides/recommendation-engine/recommendation
sidebar_label: Recommendation
sidebar_position: 2
description: Recommendation Engine - Recommendation
---

The main entry point for address-based recommendations is the `Recommendations` type in `wallet`, it’s used for finding all information that might be interesting/attractive to a given wallet based on historical transaction history & current balance.

```graphql
type Recommendation {
  tokensToFollow(offset: Int, limit: Int): [TokenProfile!]
  tokensToPurchase(offset: Int, limit: Int): [TokenRecommendation!]
  usersToFollow(offset: Int, limit: Int): [NFTBasedFollowRecommendation!]
}
```

1. `tokensToFollow` are recommended web2 social profiles that might be interesting to an address based on trading history & current balance.

[Run it in PostMan](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-88b9b1fb-13c1-4e3c-bc9e-a88ad22e1bf9) | [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-8d475121-b9a4-4f78-8152-bdaa259dbc28)

2. `tokensToPurchase` are recommended Tokens the address should purchase based on modeling trading behavior & holdings relative to other addresses (i.e. collaborative filtering model).

[Run it in PostMan](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-1e8a4bcf-01a1-46d7-a126-8e6b67e05cfc) | [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-58c47fb2-126b-484d-afc5-2f9871a04e76)

Sample Response

3.  `usersToFollow` are recommended addresses to follow based on the finding other addresses with similar NFT trading history as the input addresses.

[Run it in PostMan](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-a3507140-0efe-4fca-8f44-7486b57af8e4) | [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-b9e6e244-5d3d-49cc-a534-cad5a1b15494)
