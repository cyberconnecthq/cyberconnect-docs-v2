---
id: user-login
title: Вход пользователя
slug: /api/user-login
sidebar_label: Вход пользователя
sidebar_position: 2
description: Аутентификация - Вход пользователя
---

CyberConnect использует поток входа в систему с помощью Ethereum (SIWE) для пользователей, чтобы:

1. Отправить on-chain транзакцию через службу ретрансляции. Таким образом, чтобы пользователям не нужно было бы платить за газ.
2. Это также используется при регистрации ключа подписи для хранения данных off-chain (follow).

## Поток входа в систему

1. Отправьте запрос `loginGetMessage` со следующими полями.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="loginGetMessage" />

2. Подпишите это сообщение с помощью указанного вами кошелька. Не забудьте заменить \n новыми строками (подробнее, [неэкранированный json](https://www.freeformatter.com/json-escape.html#before-output)). Используйте следующие инструменты, чтобы подписать сообщение своим ETH кошельком.

   1. Используйте [Etherscan](https://etherscan.io/verifiedSignatures#)
      ![siwe.png](/img/v2/siwe.png)
   2. Знакомый вам Ether.js, web3.js или другой пакет

3. Проверьте подпись с помощью шлюза и сохраните токен.

<ApolloCard queryName="loginVerify" />

## Следующий шаг

Для следующих `mutations` требуется заголовок `Authorization`:

1. `registerSigningKey`
2. `createRegisterEssenceTypedData`
3. `createCollectEssenceTypedData`
4. `createSetEssenceDataTypedData`
5. `createSubscribeTypedData`
6. `createSetSubscribeDataTypedData`
7. `relay`

Используйте этот личный токен доступа в HTTP заголовке `Authorization`. Не забудте указать `bearer` перед ним.

```json
{
  "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoiY3liZXJjb25uZWN0Lm1lIiwiYWRkcmVzcyI6IjB4OTI3ZjM1NTExNzcyMWUwRThBN2I1ZUEyMDAwMmI2NUI4YTU1MTg5MCIsImlzcyI6IkN5YmVyQ29ubmVjdCIsImV4cCI6MTY2NTA4NDU2MywiaWF0IjoxNjYyNDkyNTYzfQ.X3Y-gTTnsmpNRqkZ3vAAv3UOnHBb5WH5EZ2sOcJRPnw"
}
```
