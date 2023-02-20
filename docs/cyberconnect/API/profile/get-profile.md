---
id: get-profile
title: Get profile
slug: /api/profile/get-profile
sidebar_label: Get profile
sidebar_position: 2
description: Get profile
---

You can find a `ccProfile` by it's `handle`.

:::info
The explorer below is using the mainnet endpoint https://api.cyberconnect.dev/.
:::

import {ApolloCardProduction} from "@site/src/components/ApolloCard";

<ApolloCardProduction queryName="getProfileByHandle" />

Also, you can get the Link3 `profile` from the `externalMetadataInfo` field.

:::info
The explorer below is using the mainnet endpoint https://api.cyberconnect.dev/.
:::

<ApolloCardProduction queryName="getLink3ProfileData" />
