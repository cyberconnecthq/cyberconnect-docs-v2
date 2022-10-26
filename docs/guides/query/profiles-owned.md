---
id: profiles-owned
title: List Profiles owned by Wallet
slug: /guides/query/profiles-owned
sidebar_label: Profiles Owned
sidebar_position: 3
description: Query - Profiles Owned
---

Each `wallet` can own multiple `profiles` in multiple `namespaces` . Within one namespace, however, there could be only one profile that `isPrimary` .

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="listProfilesOwnedByAddress" />
