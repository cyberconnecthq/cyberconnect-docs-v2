---
id: CyberProfile
title: CyberProfile (Identity 👤)
slug: /core-concepts/cyber-profile
sidebar_label: CyberProfile (Identity 👤)
sidebar_position: 2
description: CyberProfiles - The backbone of your social identity
---

# CyberProfile

Within CyberConnect’s on-chain social graph, an identity is manifested through a **CyberProfile**. Whether it’s an NFT, an SBT, a Twitter handle, or a DID, we map all of them to one holistic identity - **CyberProfile**. Developers can integrate the CyberProfile into their dApp/protocol to benefit from the existing network of identities being built through Link3 and other CyberConnect integrated protocols.

The CyberProfile serves as a prerequisite for users who want to issue/post content (i.e. issue their custom EssenceNFTs) or form connections (i.e. issue their custom SubscribeNFTs). The deployed CyberProfile contract is used as the gateway for users to perform actions such as collecting essence, creating a profile, and subscribing to a profile in a specific dApp context.

<img src="https://media.giphy.com/media/ONopM3fhonIkFxVKWw/giphy.gif" alt="CyberProfile" width="200" height="400" class="center" />

## Why not just use EVM Address?

Although addresses are great as a decentralized identifier, they lack the functionality of more complex access control and key rotation which are crucial components in a social application.

The **CyberProfile** is the entry point for every onchain actions and act just like a profile in web2 social applications. Each CyberProfile is a ERC-721 NFT similar to other onchain identity except that each profile owns its paid subscribers and contents. Each real user could also have multiple profiles. See a profile in action on [Link3](https://link3.to/shiyu).

<!-- <iframe src='/img/v2/sampleLink3.html' width='100%'></iframe>  -->
<iframe src='https://link3.to/wilson' width='100%'></iframe>
