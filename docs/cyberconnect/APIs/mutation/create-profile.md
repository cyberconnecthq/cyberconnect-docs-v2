---
id: create-profile
title: Create ccProfile
slug: /guides/mutation/create-profile
sidebar_label: Create ccProfile
sidebar_position: 2
description: Mutation - Create ccProfile
---


Creating a ccProfile is a prerequisite to deploying your own Subscribe/EssenceNFTs. Implementing ccProfile creation in your dApp only requires one signature & one trasaction (which can be either _relayed_ (for gasless experience) or executed directly by the user onto the contract (if you'd like the user to pay the gas).

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

## 3. Upon calling `createCreateProfileTypedData` you should receive a `CreateCreateProfileTypedDataResult` response which includes `typeDataID`  to be used in the next step

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

## Experiment in Sandbox

We’ve created an example that incorporates all the steps for Subscribe to a profile. Feel free to experiment with our code in the sandbox below. This covers a couple of steps

1. Login with wallet
2. Subscribe to a profile

<iframe src="https://codesandbox.io/embed/subscribe-to-profile-forked-fjkd8b?fontsize=14&hidenavigation=1&theme=dark"
     title="subscribe-to-profile (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
