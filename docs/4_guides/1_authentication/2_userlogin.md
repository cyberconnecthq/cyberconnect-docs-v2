---
id: userlogin
title: User Login
slug: /guides/authentication/userlogin
sidebar_label: User Login
sidebar_position: 1
description: Authentication - User Login
---

CyberConnect uses sign in with ethereum (SIWE) login flow for users to

1. send the on-chain transaction thru relay service. In this way, users would not need to pay for gas.
2. It’s also used while registering signing key for storing data offchain (follow).

## Here is the instruction to generate a personal access token.

1. Send `loginGetMessage` request with following fields.

[Run in Postman](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-65a1a72b-22e5-4a54-be1d-b1b91dba31ac) [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-8d396a05-d7cc-4385-9fd4-acb7fa4306a0)

2. Sign this message with the wallet you specified. Remember to replace `\n` with new lines. Use the following tools to sign the message with your ETH wallet

   1. Use [Etherscan tool](https://etherscan.io/verifiedSignatures#)
      ![siwe.png](/img/v2/siwe.png)
   2. Your familiar Ether.js, web3.js and other package

3. Verify the signature with gateway and save the token.

[Run in Postman](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-1d6e0771-8200-45d0-8d63-be0ef2091752) [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-62493db6-fdda-4d78-af2b-5486e35d0a0d)

## Next Step

The following `mutations` require `Authorization` header:

1. `registerSigningKey`
2. `createRegisterEssenceTypedData`
3. `createCollectEssenceTypedData`
4. `createSetEssenceDataTypedData`
5. `createSubscribeTypedData`
6. `createSetSubscribeDataTypedData`
7. `relay`

Use this persona access token in HTTP header `Authorization` . Don’t miss the `bearer` in front.

```graphql
{
	"Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoiY3liZXJjb25uZWN0Lm1lIiwiYWRkcmVzcyI6IjB4OTI3ZjM1NTExNzcyMWUwRThBN2I1ZUEyMDAwMmI2NUI4YTU1MTg5MCIsImlzcyI6IkN5YmVyQ29ubmVjdCIsImV4cCI6MTY2NTA4NDU2MywiaWF0IjoxNjYyNDkyNTYzfQ.X3Y-gTTnsmpNRqkZ3vAAv3UOnHBb5WH5EZ2sOcJRPnw"
}
```
