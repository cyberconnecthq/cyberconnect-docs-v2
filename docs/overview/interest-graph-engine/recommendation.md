---
id: recommendation
title: Recommendation
slug: /protocol/interest-graph-engine/recommendation
sidebar_label: Recommendation
sidebar_position: 2
description: Recommendation
---

With the tools covered thus far, including the social data network, on-chain components, provides a useful SDK for building social dapps and its indexed data can help developers bootstrap a simple social profile. However, as we all know too well, what brings users back to social apps day-after-day, and has catapulted applications like TikTok, are **their recommendation engines**. 

To that end, the last component of CyberConnect's decentralized social network protocol are its recommendation engines. The recommendation engines are meant to lower the barrier of launching social applications even further and increase the access to high quality ML models to new developers. While CyberConnect's recommendations are currently internally developed and lie behind our APIs, we have plans to decentralize the creation & serving of these models in the future. 

Since most of the data used in training CyberConnect’s recommendation models is openly accessible, anyone could in theory build similar models from that data. However, the ability to quickly & cheaply bootstrap social dapps is core to our protocol, hence our decision to build them out internally first. We need to equip developers with the tools needed to build decentralized social applications that are truly competitive with their Web2 counterparts. 

While the scope of CyberConnect’s recommendation models will expand alongside its partners, the current offerings can be broken down into **three broad buckets 1) social connection recommendations 2) content & item recommendations 3) feed ranking.** 

Let’s dig into each a bit further and show some examples to make things concrete:

1. **Social Recommendations**
    1. **Recommended Accounts:** Get a personalized list of [EOA (Externally Owned Accounts)](https://ethereum.org/en/whitepaper/#ethereum-accounts) to follow based on a user’s interests and who similar users follow.
    2. **Recommended Contracts:** Get a list of contracts to follow based on a user’s interests (ex. NFT ownership) and/or who are followed by similar users who have similar interests as the input user. 
       - 
2. **Content Recommendations**
    1. **Content Recommendation:** Get a personalized set of recommended content based on a user’s interests and what similar users have engaged with.
       - This can look like recommended specific NFTs, tokens and/or games to engage with. 
    2. **Related Content:** Get content similar to other content based on categories or tags along with user engagement.
       - For example, getting recommendations for Bored Ape Kennel Club after opening the profile page of BAYC. 
3. **Feed Recommendations**
    1. **User Feeds:**  eeds catered to a specific user / address' content & on-chain interactions
       - Get a timeline of content from accounts a user is following.
       - Get a timeline of content from accounts a user has interacted with.
       - This will look like NFT transfers, essences
    2. **Community Feeds:** Feeds catered to a specific community's content & on-chain interactions
       - Get recent user activity related to a specific community (ex. Azuki holders, UNI voters, etc.)
    3. **Domain Feeds:** Feeds catered to a specific domains' content & on-chain interactions (ex. Social, Defi, etc.)
       - Get recent user activity related to a specific item (account, product, tag, post, video, etc.)

Recommendations are the last piece required for building a killer web3 social dapp. We're still early in the development of this space and appreciate any feedback or recommendations (pun-intended 😉) on what endpoints to build for our community.