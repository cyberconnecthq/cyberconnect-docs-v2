---
id: signing-key
title: Регистрация ключа подписи
slug: /api/signing-key
sidebar_label: Регистрация ключа подписи
sidebar_position: 3
description: Аутентификация - Регистрация ключа подписи
---

Все данные, хранящиеся off-chain, подписываются ключом подписи, принадлежащим каждому пользователю. Пользователям необходимо будет создать ECDSA P256 (также известный как `secp256r1` и `ES256`) пару ключей для работы в децентрализованном хранилище данных CyberConnect с суверенитетом.

Вот документация для справки: [**Proof of Connection**](/V1/protocol/proof-of-connection/).

## Рабочий процесс

Чтобы создать пару ключей, вы можете использовать следующие `openssl` команды.

1. Сгенерируйте открытый и закрытый ключи.

```
openssl ecparam -genkey -name prime256v1 -noout -out private.pem
openssl ec -in private.pem -pubout -out public.pem
```

```js
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIBsl8YngX7uLkp8yWQcdHjceD4FKYpUi6zsnaLrMOsU3oAoGCCqGSM49
AwEHoUQDQgAEnea0iASyPC2cp/fcuPLnu+xHKkSeo9St2B8gvrhwW3GxcoGELL4a
/vUHUopa8U7HEDD1MiNFyYuspYfZgRkc7A==
-----END EC PRIVATE KEY-----

-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEnea0iASyPC2cp/fcuPLnu+xHKkSe
o9St2B8gvrhwW3GxcoGELL4a/vUHUopa8U7HEDD1MiNFyYuspYfZgRkc7A==
-----END PUBLIC KEY-----
```

2. Отправьте `registerSigningKey` запрос.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="registerSigningKey" />

Используйте этот личный токен доступа в HTTP заголовке `Authorization`. Не забудте указать `bearer` перед ним.

```json
{
  "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoiY3liZXJjb25uZWN0Lm1lIiwiYWRkcmVzcyI6IjB4OTI3ZjM1NTExNzcyMWUwRThBN2I1ZUEyMDAwMmI2NUI4YTU1MTg5MCIsImlzcyI6IkN5YmVyQ29ubmVjdCIsImV4cCI6MTY2NTA4NDU2MywiaWF0IjoxNjYyNDkyNTYzfQ.X3Y-gTTnsmpNRqkZ3vAAv3UOnHBb5WH5EZ2sOcJRPnw"
}
```

## Следующий шаг

Сохраните свой закрытый ключ для последующего использования (подписание сообщений `follow` и `unfollow`).
