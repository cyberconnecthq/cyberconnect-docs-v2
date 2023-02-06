---
id: follower-following-relationship
title: Get Followers by Handle / Following by an EVM address
slug: /guides/query/follower-following-relationship
sidebar_label: Follower Following Relationship
sidebar_position: 5
description: Query - Follower Following Relationship
---

We support following relationship between `addresses` and `handles`. Since an address can only follow a `handle` (i.e. a user that has minted a ProfileNFT on a supported chain), then finding followers is only relevant by ProfileID or handle. Similarly since only EVM addresses can follow `handles`, looking up the following is only relevant on an EVM address.


## List followers by a handle

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getFollowersByHandle" />

## List followings by a EVM Adress

<ApolloCard queryName="getFollowingsByAddressEVM" />