---
id: collect-essence
title: Собрать сущность (Collect Essence)
slug: /api/content/essence/collect-essence
sidebar_label: Собрать сущность
sidebar_position: 4
description: Мутации - Собрать сущность
---

## Рабочий процесс

Сбор сущности может быть осуществлен всего за несколько простых шагов. Сбор сущности по сути означает, что пользователь создаст NFT, вызвав пару API.

1. Во-первых, данные должны быть представлены пользователю в удобочитаемом формате при подписании из кошелька. Чтобы это сделать, вам нужно будет вызвать `createCollectEssenceTypedData` API, который позаботится об этом.

   Если вы не знакомы с типизированными данными, вы можете прочитать об этом подробнее [здесь](https://eips.ethereum.org/EIPS/eip-712).

:::caution

Этот API требует заголовок `Authorization` с `Bearer` токеном. Вы можете узнать об этом больше [здесь](/api/authentication/user-login).

:::

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="CreateCollectEssenceTypedData" />

2. Во-вторых, как только вы получили данные в удобочитаемом формате, вам нужно будет получить для них подпись пользователя. В принципе, вам нужно будет написать функцию и передать ей `message` в качестве параметра и вернуть `signature`, необходимую для следующего шага.

Библиотека [Ethers](https://docs.ethers.io/v5/) - это один из вариантов, который может быстро помочь вам написать функцию для получения подписи пользователя для определенного сообщения. В нашем случае сообщение представляет собой введенные данные с первого шага.

3. В-третьих, вам нужно будет вызвать `relay` API, который будет транслировать транзакцию и отчеканит NFT для собранной сущности, в качестве параметров нужно будет указать `typedDataID`, который вы получили от вызова `createSubscribeTypedData` мутации и `signature`.

:::caution

Этот API требует заголовок `Authorization` с `Bearer` токеном. Вы можете узнать об этом больше [здесь](/api/authentication/user-login).

:::

<ApolloCard queryName="relay" />

Теперь вы можете подтвердить транзакцию, просмотрев `txHash` из ответа на [etherscan.io ](http://etherscan.io). Вот и все! Вы все закончили!

## Эксперимент в песочнице

Мы создали пример, который включает в себя все шаги для сбора сущности. Не стесняйтесь экспериментировать с нашим кодом в песочнице ниже. Это включает в себя несколько шагов:

1. Войдите в систему с помощью кошелька
2. Соберите сущность

<iframe src="https://codesandbox.io/embed/collect-essence-phlqfs?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
    title="collect-essence"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
