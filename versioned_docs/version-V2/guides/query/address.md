---
id: address
title: Query Address
slug: /guides/query/address
sidebar_label: Address
sidebar_position: 2
description: Query - Address
---

## Get single address

The most basic concept in CyberConnect is a EVM `address` which encapsulates multiple `wallet`. Each Wallet is a combination of `<chainId, address>` .

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getAddressByEVMWallet" />

## Batch get multiple addresses

You can also get multiple addresses and their identity, recommendations at a time! This is useful when you have a page / list of addresses.

<ApolloCard queryName="batchGetAddressByEVMWallet" />
