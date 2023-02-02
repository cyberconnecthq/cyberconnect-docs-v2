---
id: faqs
title: FAQs
slug: faqs
sidebar_label: FAQs
description: FAQs
---

# Smart Contract Related

## What is the difference between ccProfile ProfileNFT?

The ccProfile is CyberConnect's general deployment of the ProfileNFT in its own namespace. It is currently the only namespace supported, but the CyberContracts enable adding additional namespaces in the future.

## How can I mint a ccProfile NFT?

Go to https://cc.me/mint and connect your wallet. Minting of ccProfiles is currently restricted and requires a invite code. We have been actively partnering with trusted projects & communities to distribute these codes. Your best opportunity is to keep up with our [Twitter](https://twitter.com/CyberConnectHQ)/[Discord](https://discord.com/invite/cUc8VRGmPs), or if you're a developer looking to build then reach out to us directly on the [developers discord channel](https://discord.com/channels/901233976138682388/901234908662468658) and we'll get you setup! 

## Is minting a ccProfile NFT free?

The cost of minting ccProfiles is based on the handle length:

| Handle Length                                     | Cost ($)                              |
| -------------------------------------------- | ------------------------------------------ |
| 12+  | $1 |
| 7-11 |  $10 |
| 6  |  $50 |
| 5  |   $100 |
| 4  |   $500 |
| 3  |  $1,000 |
| 2  |   $2,000 |
| 1  |   $10,000 |


## What chains are currently supported?

The smart contract protocol deployed on EVM-compatible blockchains like BNB Chain, ETH Mainnet, and Polygon.

## Subscribe NFT on a single chain. How is this data/logic made universal (i.e. cross-chain)? Would users who get subscribers have multiple ‘treasuries’ that receive funds respective to the chain the activity occurs or do you aggregate funds somewhere?

We don't aggregate the funds from . However, we guarantee that ProfileNFT is reserved and unique across all deployed blockchains. For example, if you get a ProfileNFT with the handle “Alice” on the BNB chain, then “Alice” on Polygon is reserved for you. Your identity will stay the same across different blockchains. Although you can get different subscribers on different blockchains,  we offer an indexer solution on all deployed blockchains to give users a unified view of “subscription to Alice”. And it depends on the developer if they want to have a separate view of subscribers on different blockchains.

# Interest Graph Engine Related