---
id: following-relationships
title: Get Following Relationships by an EVM address
slug: /guides/query/following-relationships
sidebar_label: Following Relationships
sidebar_position: 5
description: Query - Following Relationships
---

We support following relationship between `addresses`, which is compatible with our V1 API. You can find the `followers` and `followings` subfields under `wallets`

import PostmanCard from "@site/src/components/PostmanCard";

## List followers by a wallet

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getFollowersByAddressEVM" />

## List followings by a wallet

<ApolloCard queryName="getFollowingsByAddressEVM" />
