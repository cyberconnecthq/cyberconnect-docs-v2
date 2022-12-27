---
id: address
title: Запрос адреса
slug: /guides/query/address
sidebar_label: Адрес
sidebar_position: 1
description: Запросы - Адрес
---

## Получение единого адреса

Самой базовой концепцией в CyberConnect является EVM `address`, который инкапсулирует несколько `wallet`. Каждый кошелек представляет собой комбинацию `<chainId, address>`.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getAddressByEVMWallet" />

## Пакетное получение нескольких адресов

Вы также можете получить несколько адресов, их идентичность и рекомендации одновременно! Это полезно, когда у вас есть страница / список адресов.

<ApolloCard queryName="batchGetAddressByEVMWallet" />
