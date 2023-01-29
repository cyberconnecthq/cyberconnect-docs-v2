---
id: following-relationships
title: Получите отношения следования по EVM адресу
slug: /guides/query/following-relationships
sidebar_label: Отношения следования
sidebar_position: 5
description: Запросы - Отношения следования
---

Мы поддерживаем следующую взаимосвязь между `addresses`, которая совместима с нашим API версии V1. Вы можете найти субполя `followers` и `followings` в разделе `wallets`.

import PostmanCard from "@site/src/components/PostmanCard";

## Список подписчиков по кошельку

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getFollowersByAddressEVM" />

## Список подписок по кошельку

<ApolloCard queryName="getFollowingsByAddressEVM" />
