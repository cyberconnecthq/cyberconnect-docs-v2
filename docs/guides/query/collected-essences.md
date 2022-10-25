---
id: collected-essences
title: List Collected Essences by a wallet
slug: /guides/query/collected-essences
sidebar_label: Collected Essences
sidebar_position: 7
description: Query - Collected Essences
---

A `Wallet` can collect `Essence` created by different `Profile`. When the `Essence` is collected, an NFT is minted under the `Wallet` address.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getCollectedEssencesByAddressEVM" />


You can query the `essence` directly by its `tokenURI`

<ApolloCard queryName="essenceByTokenURI" />

And verify if the essence metadata meet our Link3 standard.

<ApolloCard queryName="verifyEssenceMetadata" />

