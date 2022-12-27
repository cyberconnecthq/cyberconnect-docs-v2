---
id: profiles
title: Запрос профиля
slug: /guides/query/profiles
sidebar_label: Профиль
sidebar_position: 2
description: Запросы - Профиль
---

Вы можете найти Link3 `profile` по его `handle`.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getProfileByHandle" />


Также, вы можете найти Link3 `profile` по адресу кошелька. Каждый `wallet` может владеть несколькими `profiles`, однако может быть только один профиль, который `isPrimary`.

<ApolloCard queryName="listProfilesOwnedByAddress" />
