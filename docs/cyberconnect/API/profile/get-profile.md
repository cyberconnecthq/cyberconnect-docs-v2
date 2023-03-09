---
id: get-profile
title: Get profile
slug: /api/profile/get-profile
sidebar_label: Get profile
sidebar_position: 2
description: Get profile
---

The `ccProfile` is the gateway to the CyberConnect social graph. Profiles are owned by a `wallet` and are identifiable by a unique `handle`.

Given that, there are two primary ways of resolving a profile:
1. Get a `ccProfile` by it's handle
2. Get a `ccProfile` by it's EVM Address

In addition, profiles hold key information about a user, such as their Link3 account's public information.

3. Retrieving a `ccProfile`'s Link3 account by handle


:::info
The explorers below are using the mainnet endpoint https://api.cyberconnect.dev/playground.
:::

### 1. Get a `ccProfile` by it's handle

import {ApolloCardProduction} from "@site/src/components/ApolloCard";

<ApolloCardProduction queryName="getProfileByHandle" />

### 2. Get a `ccProfile` by it's EVM Address

<ApolloCardProduction queryName="getProfileByAddress" />

### 3. Retrieving a `ccProfile`'s Link3 account by handle

Also, you can get the Link3 `profile` from the `externalMetadataInfo` field.

<ApolloCardProduction queryName="getLink3ProfileData" />


<!-- This can be retrieved using the `externalMetadataInfo` field. -->