---
id: profiles
title: Profiles
slug: /guides/query/profiles
sidebar_label: Profiles
sidebar_position: 2
description: Query - Profiles
---

You can find a `ccProfile` by it's `handle` - the `ccProfile`’s data is in `externalMetadataInfo`

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getProfileByHandle" />


Also, you can find a Link3 `profile` by the wallet address. Each `wallet` can own multiple `profiles`, however, there could be only one profile that `isPrimary` .

<ApolloCard queryName="listProfilesOwnedByAddress" />
