---
id: register-essence
title: Зарегистрировать сущность (Register Essence)
slug: /guides/mutation/register-essence
sidebar_label: Зарегистрировать сущность
sidebar_position: 3
description: Мутации - Зарегистрировать сущность
---

## Рабочий процесс

Регистрация сущности может быть осуществлена всего за несколько простых шагов. Регистрация сущности по сути означает, что пользователь развернет NFT контракт, вызвав пару API.

1. Во-первых, данные должны быть представлены пользователю в удобочитаемом формате при подписании из кошелька. Чтобы это сделать, вам нужно будет вызвать `createRegisterEssenceTypedData` API, который позаботится об этом.

   Если вы не знакомы с типизированными данными, вы можете прочитать об этом подробнее [здесь](https://eips.ethereum.org/EIPS/eip-712).

:::caution

Этот API требует заголовок `Authorization` с `Bearer` токеном. Вы можете узнать об этом больше [здесь](/api/user-login).

:::

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="createRegisterEssenceTypedData" />

2. Во-вторых, как только вы получили данные в удобочитаемом формате, вам нужно будет получить для них подпись пользователя (`eth_signTypedData_v4`). В принципе, вам нужно будет написать функцию и передать ей `message` в качестве параметра и вернуть `signature`, необходимую для следующего шага.

3. В-третьих, вам нужно будет вызвать `relay` API, который будет транслировать транзакцию и отчеканит EssenceNFT, в качестве параметров нужно будет указать `typedDataID`, который вы получили от вызова `createSubscribeTypedData` мутации и `signature`.

:::caution

Этот API требует заголовок `Authorization` с `Bearer` токеном. Вы можете узнать об этом больше [здесь](/api/user-login).

:::

<ApolloCard queryName="relay" />

Теперь вы можете подтвердить транзакцию, просмотрев `txHash` из ответа на [etherscan.io ](http://etherscan.io). Вот и все! Вы все закончили!

## Эксперимент в песочнице

Мы создали пример, который включает в себя все шаги для регистрации сущности. Не стесняйтесь экспериментировать с нашим кодом в песочнице ниже. Это включает в себя несколько шагов:

1. Войдите в систему с помощью кошелька
2. Зарегистрируйте сущность

<iframe src="https://codesandbox.io/embed/register-essence-kfmjbi?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
    title="register-essence"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
