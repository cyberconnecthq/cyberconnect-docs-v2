---
id: get-follower-following-relationships
title: Get Follow Relationships
slug: /api/connection/get-follow-relationships
sidebar_label: Get follow relationships
sidebar_position: 2
description: Get follow relationships
---

We support following relationship between `addresses` and `handles`. Since an address can only follow a `handle` (i.e. a user that has minted a ProfileNFT on a supported chain), then finding followers is only relevant by ProfileID or handle. Similarly since only EVM addresses can follow `handles`, looking up the following is only relevant on an EVM address.

## List followers by a handle

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getFollowersByHandle" />

## List followings by a EVM Adress

<ApolloCard queryName="getFollowingsByAddressEVM" />
