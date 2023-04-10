---
id: get-subscribing-relationship
title: Get subscribe relationship
slug: /api/connection/subscribe/get-subscribe-relationship
sidebar_label: Get subscribe relationship
sidebar_position: 2
description: Get subscribe relationship
---

Since all social data (`w3st` , `content`) are created under a `profile` , a subscription relationship is from a wallet to a profile. Each `wallet` has their subscribing `profiles` and each `profiles` has their subscriber `wallets`.

If this asymmetric design is too complicated, reach out to the team please!

## List subscribings by a wallet

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getSubscribingByAddressEVM" />

## List subscribers by a profile

<ApolloCard queryName="getSubscribersByProfile" />
