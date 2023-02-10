---
id: collect-a-badge
title: Collect a Badge
slug: /how-to/build-badge-app/collect-a-badge
sidebar_label: Collect an Badge
sidebar_position: 5
description: How to Build Badge app - Collect a Badge
---

In this section you'll learn how to implement the [Collect Essence](/guides/mutation/collect-essence) feature in both gasless and gas modes. Previously you've learned that creating a badge means registering an essence, but the process of minting and transferring the SBT is actually executed when a user collects the badge by attending an event.

To keep things simple we will only focus on the actual implementation of users collecting badges. Linking them to an actual event and checking whether users have attended the event falls beyond the scope of the tutorial.

## Gasless Mode

### GraphQL mutations

To collect an essence, meaning to collect a SBT badge, is a two step process and requires two GraphQL mutations: `CreateCollectEssenceTypedData` and `Relay`.

1. `CreateCollectEssenceTypedData` is used to present data to the user in a readable format:

```tsx title="graphql/CreateCollectEssenceTypedData.ts"
import { gql } from "@apollo/client";

export const CREATE_COLLECT_ESSENCE_TYPED_DATA = gql`
  mutation CreateCollectEssenceTypedData(
    $input: CreateCollectEssenceTypedDataInput!
  ) {
    createCollectEssenceTypedData(input: $input) {
      typedData {
        id
        sender
        data
        nonce
      }
    }
  }
`;
```

2. `Relay` is responsible for broadcasting the transaction, minting and transferring the NFT:

```tsx title="graphql/Relay.ts"
import { gql } from "@apollo/client";

export const RELAY = gql`
  mutation Relay($input: RelayInput!) {
    relay(input: $input) {
      relayActionId
    }
  }
`;
```

3. `RelayActionStatus` is used to get the relaying status:

```tsx title="graphql/RelayActionStatus.ts"
import { gql } from "@apollo/client";

export const RELAY_ACTION_STATUS = gql`
  query RelayActionStatus($relayActionId: ID!) {
    relayActionStatus(relayActionId: $relayActionId) {
      ... on RelayActionStatusResult {
        txHash
        txStatus
      }
      ... on RelayActionError {
        reason
        lastKnownTxHash
      }
      ... on RelayActionQueued {
        queuedAt
      }
    }
  }
`;
```

### Collect a Badge

Now that you set up the APIs required, you can implement the Collect feature. The approach is similar to the approach from [Create a Badge](/how-to/build-badge-app/create-a-badge):

1. Get data in a readable format and the `typedDataID` for it;
2. Get the user to sign the message data and get its `signature`;
3. Call the `relay` and pass it the `typedDataID` and `signature`;

```tsx title="components/CollectBtn.tsx"
/* Create typed data in a readable format */
const typedDataResult = await createCollectEssenceTypedData({
  variables: {
    input: {
      collector: account,
      profileID: profileID,
      essenceID: essenceID,
    },
  },
});

const typedData =
  typedDataResult.data?.createCollectEssenceTypedData?.typedData;
const message = typedData.data;
const typedDataID = typedData.id;

/* Get the signature for the message signed with the wallet */
const params = [account, message];
const method = "eth_signTypedData_v4";
const signature = await signer.provider.send(method, params);

/* Call the relay to broadcast the transaction */
const relayResult = await relay({
  variables: {
    input: {
      typedDataID: typedDataID,
      signature: signature,
    },
  },
});
const txHash = relayResult.data?.relay?.relayTransaction?.txHash;
```

## Gas Mode

To collect a badge using gas mode, you need to call the `ProfileNFT` contract directly:

1. import `ProfileNFTABI` from [GitHub](https://github.com/cyberconnecthq/cybercontracts/tree/main/docs/abi)
2. Pass the abi, signer and contract address `PROFILE_NFT_CONTRACT` which is `0x57e12b7a5f38a7f9c23ebd0400e6e53f2a45f271` to get a contract instance
3. call the `collect` method from the contract

```js
const contract = new ethers.Contract(
  PROFILE_NFT_CONTRACT,
  ProfileNFTABI,
  signer
);

const tx = await contract.collect(
  {
    collector: address,
    profileId: profileID,
    essenceId: essenceID,
  },
  0x0,
  0x0
);

console.log("tx", tx);
```

If the collect process was successful, you can verify the transaction hash on [BscScan](https://testnet.bscscan.com/).

You can also view the NFT when a user collects a badge on [testnets.opensea.io](testnets.opensea.io). You'll notice that the image for the NFT and all other details about it correspond to the details passed to the [Metadata Schema](/how-to/build-badge-app/create-a-badge#metadata-schema) fields (e.g. `image_data`, `name`, `attributes`, etc).

![nft essence](/img/v2/build-badge-app-collect-a-badge-nft.png)

Awesome! You've completed the **How to Build Badge app** guide! Now you can build your own application that issues baadges. Share your work on our [Discord](https://discord.com/invite/cUc8VRGmPs) channel. We would love to see what you've built!
