---
id: subscribing-relationships
title: Получите отношения подписки по EVM адресу
slug: /guides/query/subscribing-relationships
sidebar_label: Отношения подписки
sidebar_position: 7
description: Запросы - Отношения подписки
---

Поскольку все социальные данные (`w3st` , `content`) создаются в `profile`, отношения подписки осуществляются от кошелька к профилю. У каждого `wallet` есть `profiles` на которые он подписан, и у каждого `profiles` есть подписанные на него `wallets`.

Если этот асимметричный дизайн слишком сложен, пожалуйста, свяжитесь с командой!

## Список подписок по кошельку

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getSubscribingByAddressEVM" />

## Список подписчиков по профилю

<ApolloCard queryName="getSubscribersByProfile" />
