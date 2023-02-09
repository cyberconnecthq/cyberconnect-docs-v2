---
id: create-ccProfile-gasless-mode
title: Create ccProfile in Gasless Mode
slug: /how-to/create-ccProfile/gasless-mode
sidebar_label: Gasless Mode
sidebar_position: 1
description: Create ccProfile - Gasless Mode
---

In this tutorial, you will learn how to use relayer to create a ccProfile in gasless mode.

## Workflow

## 1. Generate Typed Data

First, data should be presented to the user in a readable format when signing from the wallet. To do that you’ll need to call the `createCreateProfileTypedData` API that takes care of this.

If you’re unfamiliar with typed data, you can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

```graphql
# SCHEMA
"""
The `CreateCreateProfileTypedDataInput` input type specifies the params required to create a ccProfile.
"""
input CreateCreateProfileTypedDataInput {
  "`to` the owner address of the ccProfile."
  to: AddressEVM!
  "`handle` the handle of the ccProfile."
  handle: String!
  "`avatar` the avatar of the ccProfile, should be a valid image link."
  avatar: URL!
  "`metadata` the metadata of the ccProfile, should be a valid IPFS CID which points to a valid json file."
  metadata: String!
  "`operator` the operator address of the ccProfile. In addition to the profile owner, operator address could also help to manage the profile. The field could be void address if no operator is needed."
  operator: AddressEVM!
}
# SAMPLE CALL
```

:::caution

This API requires:

1. `Authorization` header with the `Bearer` token
2. `X-API-KEY`
   You can learn more about it [here](/guides/authentication/authentication).

:::

## 3. Upon calling `createCreateProfileTypedData` you should receive a `CreateCreateProfileTypedDataResult` response which includes `typeDataID` to be used in the next step

```graphql
# SCHEMA
"""
The `CreateCreateProfileTypedDataResult` type provides the generated EIP-712 spec Typed Data information.
Attention, different from other methods, the data does not need to be signed by the user.
"""
type CreateCreateProfileTypedDataResult {
  "`typedDataID` the id of the typed data, used to relay."
  typedDataID: ID!
}
```

<!-- import ApolloCard from "@site/src/components/ApolloCard"; -->

<!-- <ApolloCard queryName="createSubscribeTypedData" /> -->

## 4. Call `relay` using the `typeDataID` returned above get `relayActionID`

You’ll have to call the `relay` API that will broadcast the transaction and mint the subscribe NFT, you will need to put as params the `typedDataID` you received from `createSubscribeTypedData` mutation call and the user's `signature`.

<!-- <ApolloCard queryName="relay" /> -->

## 5. Call `relayActionStatus` to receive `txHash`

Finally you poll the `relayActionStatus` API using the `relayActionId` returned from the previous step to get the status of the related transaction. There are three possible response types:

1. `RelayActionStatusResult`
2. `RelayActionQueued`
3. `RelayActionError`

<!-- <ApolloCard queryName="relayActionStatus" /> -->

You can now verify the transaction by looking up the `txHash` from the response on [bscscan](https://bscscan.com/). That’s it! You’re all done!