---
id: contract-architecture
title: Contract Architecture
slug: /overview/smart-contract-protocol/contract-architecture
sidebar_label: Contract Architecture
sidebar_position: 2
description: Contract Architecture
---

Although the data infrastructures provide the solution to solve data sovereignty and interoperability problems, we still need a way for users to monetize their social data such as content and connections. Furthermore, developers may need an on-chain computational environment to build up their dApps and communities.

For example, a dApp that focuses on providing premium service to certain NFT community members may want to generate a token-gated social network or a publishing platform may want to provide users the ability to monetize their high-quality content. We developed a smart contract protocol deployed on EVM-compatible blockchains to make all of these requirements possible.

## Core Concepts

The smart contract protocol consists of generative smart contracts, which means it will generate a set of new smart contracts associated with dApps or users when they interact with the protocol. This pattern is similar to the Uniswap protocol where a set of liquidity pair smart contracts will be generated when people create a new liquidity pool.

On CyberConnect, these generated smart contracts enable dApps to create their context-specific on-chain social network or users to issue their customizable NFTs to monetize their social data. At a high level, the protocol represents social data using three main contracts (all implementations of the ERC721 standard):
1. [ProfileNFT](/overview/smart-contract-protocol/smart-contract#profilenft)
2. [EssenceNFT](/overview/smart-contract-protocol/smart-contract#essencenft)
3. [SubsrcibeNFT](/overview/smart-contract-protocol/smart-contract#subsrcibenft) 


## Architecture

![gp_sm](/img/v2/gp_sm.png)


### ProfileNFT

ProfileNFT represents each user’s profile as an NFT. It serves as a prerequisite for users who want to issue their customized EssenceNFTs or SubscribeNFTs. In addition, the deployed ProfileNFT contract is used as the gateway for users to perform actions such as collecting essence, creating a profile, and subscribing to a profile in a specific dApp context.

<img src="https://media.giphy.com/media/ONopM3fhonIkFxVKWw/giphy.gif" alt="ccProfile" width="200" height="400" class="center" />

### EssenceNFT

EssenceNFT is a generic NFT that individual ProfileNFT holders can issue to express an arbitrary relationship such as investor, patron, team member, community participant, etc. Each EssenceNFT can be configured with rules like pay-to-mint (crowdfunding), hold-to-mint (community participants), etc. It can be also configured as a tradable NFT or a non-transferable soul bound token (SBT).

### SubscribeNFT

SubscribeNFT represents the unidirectional relationship between an address and a ProfileNFT. Each ProfileNFT holder can only issue one unique SubscribeNFT. Each SubscribeNFT can be configured with rules like pay-to-follow (paid subscribers), hold-to-follow (token-gated community), etc.


## Composable Middleware

Although the computational condition varies a lot on different dApps, many commonly seen patterns can be generalized into reusable and extensible modules. For example, dApp A wants to build a BAYC club by setting the condition that only BAYC holders can mint their app-specific ProfileNFT and dApp B wants to do the same thing for CloneX holders. The underlying pattern is the same and the only difference is the gated ERC-721 contract address.

The protocol utilizes a composable middleware layer before and after the user applies their minting actions (e.g. subscribe to a profile or collect essence). The middleware can be created to express generic constraints such as allowing only certain ERC-721 holders to pass the check. In such a way, the community can build a wide range of reusable middlewares together and dApp developers can pick and choose the relevant ones to plug into their dApp easily.

It is important to point out though that while the middleware is powerful when used to set constraints against the current blockchain state or to collect on-chain assets, it has limited utility when using it to check historical state or off-chain data. One possible solution is to call oracle contracts inside middleware to get data feeds from off-chain indexers.

