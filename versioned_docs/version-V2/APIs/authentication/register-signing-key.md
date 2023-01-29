---
id: signing-key
title: Register Signing Key
slug: /guides/authentication/signing-key
sidebar_label: Register Signing Key
sidebar_position: 3
description: Authentication - Register Signing Key
---

Data stored offchain are all signed with a signing key belonging to each user. Users will need to create a ECDSA P256 (also known as`secp256r1` and `ES256`) key pair to operate on CyberConnect’s decentralized data store with sovereignty.

Here is the reference doc [**Proof of Connection**](/V1/protocol/proof-of-connection/).

## Workflow

To create a key pair, you could use the following `openssl` command.

1. Generate public and private keys.

```
openssl ecparam -genkey -name prime256v1 -noout -out private.pem
openssl ec -in private.pem -pubout -out public.pem
```

```js
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIBsl8YngX7uLkp8yWQcdHjceD4FKYpUi6zsnaLrMOsU3oAoGCCqGSM49
AwEHoUQDQgAEnea0iASyPC2cp/fcuPLnu+xHKkSeo9St2B8gvrhwW3GxcoGELL4a
/vUHUopa8U7HEDD1MiNFyYuspYfZgRkc7A==
-----END EC PRIVATE KEY-----

-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEnea0iASyPC2cp/fcuPLnu+xHKkSe
o9St2B8gvrhwW3GxcoGELL4a/vUHUopa8U7HEDD1MiNFyYuspYfZgRkc7A==
-----END PUBLIC KEY-----
```

2. Send `registerSigningKey` request.

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
