---
id: ccProfile
title: ProfileNFT (Identity)
slug: /concepts/cc-profile
sidebar_label: ProfileNFT (Identity)
sidebar_position: 2
description: ccProfiles - The backbone of your social identity
---

# ProfileNFT (aka ccProfile)
Within CyberConnect’s on-chain social graph, an identity is manifested through a ProfileNFT (otherwise known a **ccProfile**). Whether it’s an NFT, an ENS name, a Twitter handle, or a DID, we map all of them to one holistic identity - **ccProfile**. 

The ProfileNFT serves as a prerequisite for users who want to issue/post content (i.e. issue their custom EssenceNFTs) or form connections (i.e. issue their custom SubscribeNFTs). The deployed ProfileNFT contract is used as the gateway for users to perform actions such as collecting essence, creating a profile, and subscribing to a profile in a specific dApp context. 

### ccProfile
The ccProfile (prev known as Link3 profile) is CyberConnect's universal implementation of the ProfileNFT. Developers can integrate the ccProfile into their dApp/protocol to benefit from the existing network of identities being built through Link3 and other CyberConnect integrated protocols.

Similar to an ENS domain, developers are able to use CyberConnect to map all on-chain credentials/assets to the ccProfile. Whether it’s an NFT, an ENS name, a Twitter handle, or a DID, we map all of them to one holistic identity: the ccProfile.

:::info 
All Link3 profiles will soon be upgraded to ccProfiles as part of our universal Web3 account system. Going forward, all future users will mint their .cc profile handle through [the protocol website cc.me](https://cc.me), and use that handle as their Web3 identity across dApps integrated with CyberConnect protocol.
:::


<img src="https://media.giphy.com/media/ONopM3fhonIkFxVKWw/giphy.gif" alt="ccProfile" width="200" height="400" class="center" />


## Why not just use EVM Address?

Although addresses are great as a decentralized identifier, they lack the functionality of more complex access control and key rotation which are crucial components in a social application. 

The **ccProfile** is the entry point for every onchain actions and act just like a profile in web2 social applications. Each ccProfile is a ERC-721 NFT similar to other onchain identity except that each profile owns its paid subscribers and contents. Each real user could also have multiple profiles. See a profile in action on [Link3](https://link3.to/shiyu).

<!-- <iframe src='/img/v2/sampleLink3.html' width='100%'></iframe>  -->
<iframe src='https://link3.to/wilson' width='100%'></iframe> 
