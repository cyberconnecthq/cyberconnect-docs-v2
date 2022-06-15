---
id: identity
title: Identity
slug: /concepts/identity/
sidebar_label: Identity
sidebar_position: 2
description: By adopting a decentralized social graph, users aggregate their identities across different platforms and applications.
---

By adopting a decentralized [social graph](/concepts/social-graph/), users aggregate their identities across different platforms and applications. This allows developers to retrieve more comprehensive data related to a user's address, such as:

<ul>
    <li>Their ENS or Solana domain.</li>
    <li>Their NFTs.</li>
    <li>Their avatar.</li>
    <li>Their verified web2 social account.</li>
    <li>Their first on-chain transaction.</li>
    <li>Their followers.</li>
    <li>Their followings.</li>
    <li>Their mutually-followed friends.</li>
    <li>Their notifications.</li>
</ul>

Developers can leverage those insights to build better social experiences by making a simple call to the [CyberConnect API](/cyberconnect-api/overview/).

## How does it work?

The indexer layer of the CyberConnect Protocol collects on-chain data from IPFS and blockchain networks (e.g. Ethereum, Solana) as well as off-chain data from web2 social platforms. The indexer then transforms and stores the raw data into graph databases, which enables it to curate user identities after deployment.
