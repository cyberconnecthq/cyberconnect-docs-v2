---
id: identity
title: Identity
slug: /concepts/identity
sidebar_label: Identity
sidebar_position: 1
description: Major Concepts of CyberConnect
---

User-generated social profiles and on-chain address-related data that form the user’s decentralized identity. Whether it’s an NFT, an ENS name, a Twitter handle, or a DID, we map all of them to one holistic identity. In CyberConnect’s infrastructure, an identity is currently manifested thru either an address or a profile.

## Address

Users can bring their already familiar EVM addresses to CyberConnect and create new social data on applications built with CyberConnect.

## Profile

Although addresses are great as a decentralized identifier, they lack the functionality of more complex access control and key rotation which are crucial components in a social application. Profile is the entry point for every onchain actions and act just like a profile in web2 social applications. Each profile is a ERC-721 NFT similar to other onchain identity except that each profile owns its paid subscribers and contents. Each real user could also have multiple profiles. See a profile in action on [Link3](https://link3.to/shiyu).
