---
id: Overview
title: Overview
slug: /core-concepts/overview
sidebar_label: Overview
sidebar_position: 1
description: Concepts - Overview
---

# CyberConnect Smart Contract

The CyberConnect protocol consists of a set generative smart contracts deployed on BNB chain. Generative smart contracts means the protocol will generate a set of new smart contracts associated with dApps or users when they interact with the protocol. This pattern is similar to the Uniswap protocol where a set of liquidity pair smart contracts will be generated when people create a new liquidity pool.

On CyberConnect, these generated smart contracts enable dApps to create their context-specific on-chain social network or users to issue their customizable NFTs to monetize their social data. At a high level, the protocol represents social data using three main contracts (all implementations of the ERC721 standard):

1. [ccProfile](/core-concepts/cc-profile) 👤
2. [SubscribeNFT](/core-concepts/subscribe-nft) 👥
3. [EssenceNFT](/core-concepts/essence-nft) 📝

## ccProfile 👤

ccProfile represents each user’s profile as an NFT. It serves as a prerequisite for users who want to issue their customized EssenceNFTs or SubscribeNFTs. In addition, the deployed ccProfile contract is used as the gateway for users to perform actions such as collecting essence, creating a profile, and subscribing to a profile in a specific dApp context. Developers can integrate the ccProfile into their dApp/protocol to benefit from the existing network of identities being built through Link3 and other CyberConnect integrated protocols.

Similar to an ENS domain, developers are able to use CyberConnect to map all on-chain credentials/assets to the ccProfile. Whether it’s an NFT, an SBT, a Twitter handle, or a DID, we map all of them to one holistic identity: the ccProfile.

## SubscribeNFT 👥

SubscribeNFT represents the uni-directional relationship between an address and a ccProfile. Each ccProfile holder can only issue one unique SubscribeNFT. Each SubscribeNFT can be configured with rules like pay-to-follow (paid subscribers), hold-to-follow (token-gated community), etc. The SubcribeNFT is highly-customizable and can be used to represent arbitrary social connections; including following, subscribing to a creator, friend relationship, belonging to an organization, and participations in activities and communities.

## EssenceNFT 📝

EssenceNFT is a generic NFT that individual ccProfile holders can issue to represent any piece of content (ex. social media posts, videos, blog publications). Each EssenceNFT can be configured with rules like pay-to-mint (crowdfunding), hold-to-mint (community participants), etc. It can be also configured as a tradable NFT or a non-transferable soul bound token (SBT) to represent a given role such as investor, patron, team member, community participant, etc.

![gp_sm](/img/v2/Smart_Contract_Protocol_overview.png)

# CyberConnect Scalable Storage Modules

While smart contracts provide programmability and enable more feature potentials for developers to leverage, it sometimes suffers from scalability issues and high gas costs problems. For the social content and connection data that could be in the billions of count, it is extremely important we provide a way to store them in a decentralized, self-sovereign, and scalable way.

CyberConnect provides Scalable Storage Modules (SSM) to write social data in decentralized storage (Arweave) with guarantees of data sovereignty (that data cannot be forged), integrity (that data cannot be modified in an unauthorized manner), and availability (that data cannot be censored). At a high level, the SSM supported four different types of actions.

1. [Follow/Like](/concepts/follow-like-connection)
2. [Post/Comment](/core-concepts/post)

## Follow/Like 👥

Follow is similar to SubscribeNFT to some extent because both of them are used to represent an address to ccProfile relationship. Since Follow is implemented through SSM, it’s good for applications with lightweight social graph needs that do not want to incur gas costs. Like is used to express the relationship between an address and a post.

## Post/Comment 📝

Post is used to present users’ lightweight content publication. Since they are stored in SSM, they could not be monetized directly. The SSM also supports Comment which is associated with a certain post. Publishing both Post and Comment need the wallet holds ccProfile.

![scalable_storage_modules](/img/v2/scalable-storage-modules.png)
