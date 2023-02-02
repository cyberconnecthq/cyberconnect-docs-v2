---
id: subscribe-nft
title: SubscribeNFT
slug: /concepts/subscribe-nft
sidebar_label: SubscribeNFT (Connections 👥)
sidebar_position: 3
description: Types of on & off-chain connections supported
---
Connections are at the fabric that weave together online social graphs. In CyberConnect's protocol, connections are represented by **SubscribeNFTs**. 

A SubscribeNFT represents an **on-chain** uni-directional relationship between an address and a ProfileNFT. Once a user has minted their own [ProfileNFT/ccProfile](/concepts/cc-profile) contract, they can issue their own SubscribeNFT, which in turn can be collected by other users.

Each ProfileNFT holder can issue _only one unique SubscribeNFT_. Each SubscribeNFT can be configured with rules like pay-to-follow (paid subscribers), hold-to-follow (token-gated community), etc. The SubcribeNFT is highly-customizable and can be used to represent arbitrary social connections; including following, subscribing to a creator, friend relationship, belonging to an organization, and participations in activities and communities.


# Example use-cases / implementations of SubscribeNFT


## 1. Subscribe

While `Follow` represents a simple directed relationship from one ccProfile to the other, `Subscribe` represent the a more composale relationship. Subscriptions include [middleware](/concepts/middleware), which can include arbitrary rules for subscription. For example, they could provide the ability to being subscribed to with payment attached. Each profile could specify the amount of token needed to pay for becoming a subscribers to that profile and subscribers will obtain a subscriber NFT. For more examples check out the next section on [Middlewares](/concepts/middleware).

:::tip 
The SubscribeNFT can be used as a building block for countless alternate connections, including paid subscriptions to a creator, bi-directional friend connections, belonging to an organization, and DAO governance roles, and whatever you can imagine.
:::