---
id: subscribemw
title: Установить Subscribe Middleware
slug: /guides/mutation/middleware-subscribe
sidebar_label: Установить Subscribe Middleware
sidebar_position: 5
description: Посредники - Subscribe Middleware
---

## Рабочий процесс

Установка промежуточной программы для подписки - это мощный API, который позволяет разработчикам настраивать свои приложения и создавать уникальный опыт для своих пользователей. API взаимодействует со смарт-контрактом и устанавливает определенные правила о том, как он должен вести себя для определенного действия, такого как подписка на профиль.

1. Во-первых, данные должны быть представлены пользователю в удобочитаемом формате при подписании из кошелька. Чтобы это сделать, вам нужно будет вызвать `createCollectEssenceTypedData` API, который позаботится об этом.

   Если вы не знакомы с типизированными данными, вы можете прочитать об этом подробнее [здесь](https://eips.ethereum.org/EIPS/eip-712).

   Этот API устанавливает параметры для подписки, такие как `tokenURI` и `middleware`, поэтому, когда пользователь подписывается на этот профиль, запускается промежуточная программа, и отчеканенный NFT будет иметь указанный URI токена.

   В этом примере мы устанавливаем промежуточную программу `subscribePaid`, которая потребует от пользователя внесения платы за подписку на профиль.<br/>
   Чтобы просмотреть полный список поддерживаемых промежуточных программ, ознакомьтесь с руководством [Посредники](/concepts/middleware).

:::caution

Этот API требует заголовок `Authorization` с `Bearer` токеном. Вы можете узнать об этом больше [здесь](/api/authentication/user-login).

:::

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="createSetSubscribeDataTypedData" />

2. Во-вторых, как только вы получили данные в удобочитаемом формате, вам нужно будет получить для них подпись пользователя. В принципе, вам нужно будет написать функцию и передать ей `message` в качестве параметра и вернуть `signature`, необходимую для следующего шага.

3. В-третьих, вам нужно будет вызвать `relay` API, который будет транслировать транзакцию и отчеканит NFT для собранной сущности, в качестве параметров нужно будет указать `typedDataID`, который вы получили от вызова `createSubscribeTypedData` мутации и `signature`.

:::caution

Этот API требует заголовок `Authorization` с `Bearer` токеном. Вы можете узнать об этом больше [здесь](/api/authentication/user-login).

:::

<ApolloCard queryName="relay" />

Теперь вы можете подтвердить транзакцию, просмотрев `txHash` из ответа на [etherscan.io ](http://etherscan.io). Вот и все! Вы все закончили!

## Эксперимент в песочнице

Мы создали пример, который включает в себя все шаги по настройке промежуточной программы для подписки. Не стесняйтесь экспериментировать с нашим кодом в песочнице ниже.

<iframe src="https://codesandbox.io/embed/set-middleware-subscribe-bc24yk?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
     title="set-middleware-subscribe"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
