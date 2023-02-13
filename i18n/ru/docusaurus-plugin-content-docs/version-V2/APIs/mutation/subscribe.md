---
id: subscribe
title: Подписаться (Subscribe)
slug: /guides/mutation/subscribe
sidebar_label: Подписаться
sidebar_position: 2
description: Мутации - Подписаться
---

## Рабочий процесс

Подписка на профиль может быть осуществлена всего за несколько простых шагов. Подписка на профиль по сути означает, что пользователь создаст NFT, вызвав пару API.

1. Во-первых, данные должны быть представлены пользователю в удобочитаемом формате при подписании из кошелька. Чтобы это сделать, вам нужно будет вызвать `createSubscribeTypedData` API, который позаботится об этом.

   Если вы не знакомы с типизированными данными, вы можете прочитать об этом подробнее [здесь](https://eips.ethereum.org/EIPS/eip-712).

:::caution

Этот API требует заголовок `Authorization` с `Bearer` токеном. Вы можете узнать об этом больше [здесь](/api/user-login).

:::

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="createSubscribeTypedData" />

2. Во-вторых, как только вы получили данные в удобочитаемом формате, вам нужно будет получить для них подпись пользователя (`eth_signTypedData_v4`). В принципе, вам нужно будет написать функцию и передать ей `message` в качестве параметра и вернуть `signature`, необходимую для следующего шага.

Библиотека [Ethers](https://docs.ethers.io/v5/) - это один из вариантов, который может быстро помочь вам написать функцию для получения подписи пользователя для определенного сообщения. В нашем случае сообщение представляет собой введенные данные из первого шага.

3. В-третьих, вам нужно будет вызвать `relay` API, который будет транслировать транзакцию и отчеканит SubscribeNFT, в качестве параметров нужно будет указать `typedDataID`, который вы получили от вызова `createSubscribeTypedData` мутации и `signature`.

:::caution

Этот API требует заголовка `Authorization` с `Bearer` токеном. Вы можете узнать об этом больше [здесь](/api/user-login).

:::

<ApolloCard queryName="relay" />

Теперь вы можете подтвердить транзакцию, просмотрев `txHash` из ответа на [etherscan.io ](http://etherscan.io). Вот и все! Вы все закончили!

## Эксперимент в песочнице

Мы создали пример, который включает в себя все шаги для подписки на профиль. Не стесняйтесь экспериментировать с нашим кодом в песочнице ниже. Это включает в себя несколько шагов:

1. Войдите в систему с помощью кошелька
2. Подпишитесь на профиль

<iframe src="https://codesandbox.io/embed/subscribe-to-profile-l1hts6?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
    title="subscribe-to-profile"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
