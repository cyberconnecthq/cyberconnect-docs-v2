---
id: subscribing-relationships
title: Get Subscribing Relationships by an EVM address
slug: /guides/query/subscribing-relationships
sidebar_label: Subscribing Relationships
sidebar_position: 3
description: Query - Subscribing Relationships
---

Since all social data (`w3st` , `content`) are created under a `profile` , a subscription relationship is from a wallet to a profile. Each `wallet` has their subscribing `profiles` and each `profiles` has their subscriber `wallets`.

If this asymmetric design is too complicated, reach out to the team please!

## List subscribings by a wallet

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getSubscribingByAddressEVM" />

## List subscribers by a profile

<ApolloCard queryName="getSubscribersByProfile" />
