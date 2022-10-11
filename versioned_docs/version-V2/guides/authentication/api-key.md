---
id: api-key
title: Create an Application API Key
slug: /guides/authentication/api-key
sidebar_label: Create an Application API Key
sidebar_position: 1
description: Authentication - API Key
---

## Set up your dApp

As a developer you’ll need an API Key for your social application to enable your users to generate data including creating content, following someone and others under the global namespace or your own namespace.

Using API Keys makes sure that

1. social data live under specific namespace that belongs to a developer
2. no other developer could forge data that don’t belong to their namespace.

In the future we’ll gradually replace API Key method with Public Key Infrastructure (PKI).

import PostmanCard from "@site/src/components/PostmanCard";

<PostmanCard 
  queryURL="https://cyberconnect-v2.postman.co/workspace/CyberConnect-V2~aae5e431-a27c-48e0-a97f-983df4efa6e7/request/20133006-4bbcb46e-3eea-41b4-9512-241205c389cb"
  exampleURL="https://cyberconnect-v2.postman.co/workspace/CyberConnect-V2~aae5e431-a27c-48e0-a97f-983df4efa6e7/example/20133006-03c76460-2607-4f8a-9d6b-08632a5cda94"
/>

## Next Step

The following `mutations` require `Authorization` header:

1. `follow`
2. `unfollow`

Use the resulting `apiKey` as your `X-API-KEY` header.

```json
{
    "X-API-KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcxNzk4NjkxODQsImVtYWlsIjoiaGlAY3liZXJjb25uZWN0Lm1lIiwidHdpdHRlcklEIjoiQGN5YmVyY29ubmVjdGhxIiwibmFtZXNwYWNlIjoiQ3liZXJDb25uZWN0Iiwib3JpZ2luX2hvc3QiOiJjeWJlcmNvbm5lY3QubWUiLCJpc3MiOiJDeWJlckNvbm5lY3QiLCJleHAiOjE2NjU4NjUyNzQsImlhdCI6MTY2MzI3MzI3NH0.VCqlS7eDzqZGq--WfJ102qVWlgXcLkMgSSlzkl9bQLU"
}
```
