---
id: cybergraph
title: CyberGraph
slug: /core-concepts/cybergraph
sidebar_label: CyberGraph
sidebar_position: 2
description: CyberGraph
---

# CyberGraph

In web2, social graphs represent the connections between users, their content, and interests. They are a key data set social network platforms use to capture attention and increase user engagement. However, social graphs have recently become more of a limitation for users and developers due to their rampant centralization by big tech. To offer an alternative, we’re introducing CyberGraph, a decentralized, censorship-resistant, and user-owned alternative to power the next generation of social networking platforms on the internet.

CyberGraph is a set of smart contracts that links user identities (CyberAcconts) to their content and social connections and enables the recording of that rich social data onto multiple EVM-compatible blockchains. Through CyberGraph’s unique, customizable middleware design, storing users’ high-unit value social data on blockchain databases unlocks several novel social networking and community-building primitives, including monetization through tokenization.

<div>
<img src="/img/v3/cybergraph.png"/>
</div>

## Content

Every user with a CyberAccount is already equipped with creator capabilities and can publish monetizable content. When a piece of content like a post, image, or video is first created on a dApp on the CyberConnect protocol, it is uploaded to a decentralized storage system like IPFS or Arweave, following which a link between the URL of the content and the creator’s account is recorded on the CyberGraph smart contract. This decentralized account-to-content linking is foundational in guaranteeing true user ownership and removing centralized control from any one platform.  It is a critical step in facilitating online communication on the open web to prevent a corrupted/disincentivized platform from monopolizing and manipulating content distribution.

CyberGraph also sets the stage for the next stage of growth for the creator economy, empowering artists and creators to offer new experiences to their fans/audience by making their content collectible. Each collect signals a fan’s support of a specific piece of content or creator with a permanent record on the blockchain. Creators can use this engagement information to identify their earliest or their most engaged supporters and tailor their rewards or growth campaigns accordingly.

Additionally, every time a user comments on a piece of content on the CyberConnect social network, a link to the original content is established on the smart contract, ensuring content sovereignty and provenance. Users can also amplify the original content by sharing posts, images, videos, etc., much like in web2.

## W3ST

One of the most community-loved features of CyberConnect V2 is W3ST (Web3 Status Token, pronounced as West). It is a non-transferrable NFT with on-chain issuer reference that acts as a digitally verifiable indicator of a user’s status in their community. It is a powerful instrument for users to find their tribe in web3. Organizations use W3ST to recognize their most engaged and loyal supporters and therefore build a digitally verifiable, immutable, and contextually meaningful contribution-based value system in their communities. W3ST is also instrumental in growing communities because it helps identify potential members with similar interests, affiliations, and past experiences.

We are thrilled to share that W3ST is now more gas efficient and even more discoverable. Instead of every W3ST as its unique ERC-721 contract, organizations will now utilize a singular ERC-1155 smart contract to save gas and empower their members with better discoverability on NFT platforms.

## Subscription

Connections are the fabric that weaves online social networks; creators should be able to monetize the relationships and friendships they've garnered from their content and social capital. On CyberConnect protocol, subscriptions are designed to enable self-sovereign monetization of creators' communities.

In V3, users must set up their subscription logic with a predefined monthly fee to enable subscriptions. When your audience subscribes to you, they would need to prepay at least one month of subscription fee. With Subscription, creators can easily monetize their exclusive pay-to-reveal content.

## Middleware

CyberGraph follows a middleware architecture to create more design space for customized logic. Middlewares are plug-and-play custom execution logic codes that run before and after an action trigger to extend the default behaviors in social networks.

CyberConnect provides a repository of middleware for developers to use by generalizing common computational patterns. For example, imagine that dApp *A* wants to build a social network for [Bored Ape Yacht Club](https://boredapeyachtclub.com/#/) by setting the condition that only BAYC holders can mint their app-specific ContentNFT, and dApp *B* wants to do the same thing for RTFKT’s [CloneX](https://clonex.rtfkt.com/) holders. The underlying pattern here is the same; the only difference is the gated ERC-721 contract address.

We invite the developer community to contribute to this repository and help us build a wide range of reusable middleware together. Dapp developers can pick and choose the relevant ones to plug into their dApp easily.