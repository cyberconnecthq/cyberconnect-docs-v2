---
id: get-profile
title: Get profile
slug: /api/profile/get-profile
sidebar_label: Get profile
sidebar_position: 2
description: Get profile
---

You can find a `ccProfile` by it's `handle`.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getProfileByHandle" />

Also, you can get the corresponding Link3 `profile` from the `externalMetadataInfo` field.
<ApolloCard queryName="getLink3ProfileData" />
