---
id: profiles
title: Profiles
slug: /api/profile/get-profiles
sidebar_label: Get profiles
sidebar_position: 2
description: Get profiles
---

You can find a `ccProfile` by it's `handle` - the `ccProfile`’s data is in `externalMetadataInfo`

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getProfileByHandle" />

Also, you can find a Link3 `profile` by the wallet address. Each `wallet` can own multiple `profiles`, however, there could be only one profile that `isPrimary` .

<ApolloCard queryName="listProfilesOwnedByAddress" />
