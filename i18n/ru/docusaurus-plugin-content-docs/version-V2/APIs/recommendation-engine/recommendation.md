---
id: recommendation
title: Рекомендации
slug: /guides/recommendation-engine/recommendation
sidebar_label: Рекомендации
sidebar_position: 2
description: Механизм рекомендаций - Рекомендации
---

Основной точкой входа для рекомендаций на основе адресов является тип `Recommendations` в `wallet`, он используется для поиска информации, которая может быть интересна данному кошельку, на основе его истории транзакций, текущего баланса и взаимодействия с проектом.

```graphql
type Recommendation {
  tokenBalanceInfo(offset: Int, limit: Int): [TokenInfo!]
  tokenRecommendation(offset: Int, limit: Int): [TokenRecommendation!]
  userRecommendation(offset: Int, limit: Int): [UserRecommendation!]
}
```

В настоящее время поддерживаются 3 субполя / запроса:
- `tokenBalanceInfo`  - основан на памяти / эвристике (memory/heuristic-based), в то время как два других
- `tokenRecommendation` и `userRecommendation` - основаны на модели (model-based).

### Вот еще несколько подробностей о каждом из поддерживаемых субполей: 

1. `tokenBalanceInfo` - рекомендуемые социальные профили Web2, которые могут быть интересны адресу, на основании истории торговли и текущем балансе.

import PostmanCard from "@site/src/components/PostmanCard";

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-88b9b1fb-13c1-4e3c-bc9e-a88ad22e1bf9"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-8d475121-b9a4-4f78-8152-bdaa259dbc28"
/>

2. `tokenRecommendation` - рекомендуемые токены, которые адрес должен приобрести на основе моделирования торгового поведения и удерживаемых активов относительно других адресов (т.е. модель совместной фильтрации).

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-1e8a4bcf-01a1-46d7-a126-8e6b67e05cfc"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-58c47fb2-126b-484d-afc5-2f9871a04e76"
/>

3.  `userRecommendation` - рекомендуемые адреса для отслеживания на основе поиска других адресов с аналогичной историей торговли NFT в качестве входных адресов.

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-a3507140-0efe-4fca-8f44-7486b57af8e4"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-b9e6e244-5d3d-49cc-a534-cad5a1b15494"
/>
