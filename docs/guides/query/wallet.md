---
id: wallet
title: Query Wallet
slug: /guides/query/wallet
sidebar_label: Wallet
sidebar_position: 2
description: Query - Wallet
---

## Get single Wallet

You can directly query the `wallet` with the combination of `<chainID, Wallet>.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getWallet" />

## Batch get multiple Wallets

You can also get multiple `wallets` by the `address` list and `chainID`.

<ApolloCard queryName="getWallets" />
