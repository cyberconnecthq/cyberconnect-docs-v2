---
id: link3-profiles
title: Link3 Profiles
slug: /guides/query/link3-profiles
sidebar_label: Link3 Profiles
sidebar_position: 2
description: Query - Link3 Profiles
---

You can find a Link3 `profile` by it's `handle`.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getProfileByHandle" />


Also, you can find a Link3 `profile` by the wallet address. Each `wallet` can own multiple `profiles`, however, there could be only one profile that `isPrimary` .

<ApolloCard queryName="listProfilesOwnedByAddress" />