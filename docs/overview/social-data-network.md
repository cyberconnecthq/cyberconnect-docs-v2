---
id: social-data-network
title: Social Data Network
slug: /overview/social-data-network
sidebar_label: Social Data Network
sidebar_position: 1
description: Social Data Network
---

CyberConnect has two components to help developer build social applications: **Social Data Network** and [Interest Graph Engine](/overview/interest-graph-engine).

## Modules

Users generate various data when they are engaging in social platforms through setting up their profile for the first time, following content creators and creating contents. We categorize them into the following three components.

### Identity

User-generated social profiles and on-chain address-related data that form the user’s decentralized identity. Whether it’s an NFT, an ENS name, a Twitter handle, or a DID, we map all of them to one holistic identity.

### Connection

Connections represent relationships between identities. Social connections include following and subscribing to a creator, being friends with your buddies, belonging to an organization, and participations in activities and communities.

### Content

User-generated content such as posts, videos, and publications. We also look at how people are engaging with such content through innovative smart contract-enabled ways like funding public goods, donating to charity, and governance.

## Architecture

To build a social application, a developer should only focus on user experience, user acquisition, and content moderation rather than worrying about building and maintaining the infrastructure. CyberConnect supports developers to build new applications thru APIs and SDKs. Although the experience is seamless to developers, we want to highlight our architectural design that makes CyberConnect gasless, composable and highly scalable.

**Sufficiently decentralized data infrastructures** that help users manage their portable and self-sovereign social data at scale. The data are represented in _verifiable credentials_ and developers can safely rely on the infrastructures to write and update millions of records.

**Smart contract protocol** consists of smart contracts deployed on EVM-compatible blockchains that enables content creators to build their on-chain social network and monetize their social data with _highly-customizable middleware_.
