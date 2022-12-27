---
id: collected-essences
title: Получите список собранных сущностей по кошельку
slug: /guides/query/collected-essences
sidebar_label: Собранные сущности
sidebar_position: 6
description: Запросы - Собранные сущности
---

`Wallet` может собирать сущность `Essence`, созданную другим `Profile`. Когда сущность `Essence` собрана, NFT чеканится по адресу `Wallet`.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getCollectedEssencesByAddressEVM" />

И проверьте, соответствуют ли метаданные сущности нашему стандарту Link3. Пожалуйста, обратитесь к разделу [**Метаданные сущности**](/concepts/metadata)

<ApolloCard queryName="verifyEssenceMetadata" />
