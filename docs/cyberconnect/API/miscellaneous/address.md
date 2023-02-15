---
id: get-address
title: Get address
slug: /api/miscellaneous/get-address
sidebar_label: Get address
sidebar_position: 1
description: Get address
---

## Get single address

The most basic concept in CyberConnect is a EVM `address` which encapsulates multiple `wallet`. Each Wallet is a combination of `<chainId, address>` .

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getAddressByEVMWallet" />

## Batch get multiple addresses

You can also get multiple addresses and their identity, recommendations at a time! This is useful when you have a page / list of addresses.

<ApolloCard queryName="batchGetAddressByEVMWallet" />
