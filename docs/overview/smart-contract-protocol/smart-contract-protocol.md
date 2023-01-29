---
id: smart-contract-protocol
title: Smart Contract Protocol
slug: /overview/smart-contract-protocol
sidebar_label: Smart Contract Protocol
sidebar_position: 1
description: Smart Contract Protocol
---

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

<Tooltip anchorId="ERC721" html="ERC-721 is a data standard for creating non fungible tokens, <br /> meaning each token is unique and cannot be divided <br /> or directly exchanged for another ERC-721 token." />

The Smart Contract Protocol is the core of the CyberConnect, and categorizes social data into three core components: identity, connection, and content. These three components are represented as <strong id="ERC721" class="boxBorder"> ERC-721 tokens </strong> and together create the underlying nodes & edges of the decentralized social graph. All three are ERC721-compliant and fully composable.

The ERC-721 token format means the components of the social graph are all on-chain, benefiting from composability (i.e. shared computational environment or monetization). A set of smart contracts are deployed on EVM-compatible blockchains that enable dApps to easily create their context-specific social graph and name service in a permissionless manner. The protocol provides highly customizable [middleware](/core-concepts/middleware.md) layers for dApps to build their own computational conditions (e.g. pay to connect, issue badges as collectible assets). 

## Modules

Users generate various data when they are engaging in social platforms through setting up their profile for the first time, following content creators and creating contents. We categorize them into the following three components.
1. [Identity](/overview/smart-contract-protocol/#Identity) 👤
2. [Connection](/overview/smart-contract-protocol/#Connection) 👥
3. [Content](/overview/smart-contract-protocol/#Content) 📝


### 1. Identity
<!-- <img align="right" src="https://media.giphy.com/media/ONopM3fhonIkFxVKWw/giphy.gif" alt="ccProfile" width="200" height="400" class="center" />  -->
User-generated social profiles and on-chain address-related data that form the user’s decentralized identity. Whether it’s an NFT, an ENS name, a Twitter handle, or a DID, we map all of them to one holistic identity.
<img src="https://media.giphy.com/media/ONopM3fhonIkFxVKWw/giphy.gif" alt="ccProfile" width="200" height="400" class="center" /> 

### 2. Connection

Connections represent relationships between identities. Social connections include following and subscribing to a creator, being friends with your buddies, belonging to an organization, and participations in activities and communities.

![follow-gif](/img/v2/follow-gif.gif)

### 3. Content

User-generated content such as posts, videos, and publications. We also look at how people are engaging with such content through innovative smart contract-enabled ways like funding public goods, donating to charity, and governance.


## Architecture

To build a social application, a developer should only focus on user experience, user acquisition, and content moderation rather than worrying about building and maintaining the infrastructure. CyberConnect supports developers to build new applications through APIs and SDKs. Although the experience is seamless to developers, we want to highlight our architectural design that makes CyberConnect gasless, composable and highly scalable.

**Sufficiently decentralized data infrastructures** that help users manage their portable and self-sovereign social data at scale. The data are represented in _verifiable credentials_ and developers can safely rely on the infrastructures to write and update millions of records.

**Smart contract protocol** consists of smart contracts deployed on EVM-compatible blockchains that enables content creators to build their on-chain social network and monetize their social data with _highly-customizable middleware_.
