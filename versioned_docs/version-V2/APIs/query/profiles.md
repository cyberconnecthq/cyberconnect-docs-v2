---
id: profiles
title: Profiles
slug: /guides/query/profiles
sidebar_label: Profiles
sidebar_position: 2
description: Query - Profiles
---

You can find a CyberProfile by it's `handle`.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getProfileByHandle" />

Also, you can find a CyberProfile by the wallet address. Each `wallet` can own multiple `profiles`, however, there could be only one profile that `isPrimary` .

<ApolloCard queryName="listProfilesOwnedByAddress" />

To get Link3 profile data from a CyberProfile, you need to specify `externalMetadataInfo` field in the query.

<ApolloCard queryName="getLink3ProfileData" />
