---
id: signing-key
title: Register Signing Key
slug: /guides/authentication/signing-key
sidebar_label: Register Signing Key
sidebar_position: 3
description: Authentication - Register Signing Key
---

Data stored offchain are all signed with a signing key belonging to each user. Users use their EVM address as their keypair.

Here is the reference doc [**Core Concept - Follow - Proof of Connection**](/concepts/follow-connection).

## Workflow


### 1. Generate the message to be signed

### 2. Send `registerSigningKey` request (the `RegisterSigningKeyRequest` input type specifies the params required to register a signing key)

```graphql

input RegisterSigningKeyRequest {
  "`address` the user's address."
  address: String!
  "`message` the generated message to be signed, including the signing key public key information."
  message: String!
  "`signature` the signature from signing the `message`."
  signature: String!
}
```

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="registerSigningKey" />

Use this personal access token in HTTP header `Authorization` . Don’t miss the `bearer` in front.

```json
{
  "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoiY3liZXJjb25uZWN0Lm1lIiwiYWRkcmVzcyI6IjB4OTI3ZjM1NTExNzcyMWUwRThBN2I1ZUEyMDAwMmI2NUI4YTU1MTg5MCIsImlzcyI6IkN5YmVyQ29ubmVjdCIsImV4cCI6MTY2NTA4NDU2MywiaWF0IjoxNjYyNDkyNTYzfQ.X3Y-gTTnsmpNRqkZ3vAAv3UOnHBb5WH5EZ2sOcJRPnw"
}
```

## Next Step

Keep your private key for later use (Sign `follow` and `unfollow` messages).