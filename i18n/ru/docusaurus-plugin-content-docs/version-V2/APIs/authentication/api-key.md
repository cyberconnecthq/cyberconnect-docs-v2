---
id: api-key
title: Создание API ключа приложения
slug: /api/api-key
sidebar_label: Создание API ключа приложения
sidebar_position: 1
description: Аутентификация - Ключ API
---

## Настройте ваше децентрализованное приложение

Как разработчику, вам понадобится ключ API для вашего социального приложения, чтобы ваши пользователи могли генерировать данные, включая создание контента, подписку на кого-либо и другие, как в глобальном, так и в вашем собственном пространстве имен.

Использование ключей API гарантирует, что:

1. Социальные данные хранятся в определенном пространстве имен, принадлежащем разработчику.
2. Ни один другой разработчик не сможет подделать данные, первоисточником которых он не является.

В будущем мы постепенно заменим метод ключа API инфраструктурой открытых ключей PKI.

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="createAPIKey" />

## Следующий шаг

Для следующих `mutations` требуется заголовок `Authorization`:

1. `follow`
2. `unfollow`

Используйте полученный `apiKey` как ваш `X-API-KEY` заголовок.

```json
{
  "X-API-KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcxNzk4NjkxODQsImVtYWlsIjoiaGlAY3liZXJjb25uZWN0Lm1lIiwidHdpdHRlcklEIjoiQGN5YmVyY29ubmVjdGhxIiwibmFtZXNwYWNlIjoiQ3liZXJDb25uZWN0Iiwib3JpZ2luX2hvc3QiOiJjeWJlcmNvbm5lY3QubWUiLCJpc3MiOiJDeWJlckNvbm5lY3QiLCJleHAiOjE2NjU4NjUyNzQsImlhdCI6MTY2MzI3MzI3NH0.VCqlS7eDzqZGq--WfJ102qVWlgXcLkMgSSlzkl9bQLU"
}
```
