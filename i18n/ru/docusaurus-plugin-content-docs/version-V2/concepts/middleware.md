---
id: middleware
title: Посредники
slug: /concepts/middleware
sidebar_label: Посредники
sidebar_position: 5
description: Основные концепции CyberConnect
---

Чтобы включить динамические правила, связанные с созданием профиля, сбором контента и платной подпиской, протокол CyberConnect предоставляет различные промежуточные программы. Существует три типа промежуточных программ: `ProfileMiddleware`, `CollectMiddleware` и `SubscribeMiddleware`. Это смарт-контракты с логикой, выполняемой до и после того, как произойдет `profile creation`, `collect` и `subscribe`.

<!-- Currently we support `PaidCollect` and `PaidSubscirbe` where users need to pay ERC20 token to collect a content or subscribe to a profile. We also support `PermissionedCollect` where the creator of the content specifies a whitelist. -->

# Поддерживаемые посредники

## Subscribe Middleware

- `SubscribeDisallowedMw` - Подписка на пользователя запрещена.
- `SubscribeOnlyOnceMw` - Пользователи могут подписаться на этот профиль только один раз.
- `SubscribePaidMw` - Пользователи платят определенную плату в токене ERC20 за подписку на этого пользователя.

## Collect Middleware

- `CollectDisallowedMw` - Сбор сущности запрещен.
- `CollectOnlySubscribedMw` - Только подписанные профили могут собирать сущность.
- `CollectPaidMw` - Пользователи платят определенную плату в токене ERC20 за сбор сущности.
- `CollectPermissionMw` - Пользователи могут собирать сущность только в том случае, если у них есть действительная подпись подписанта.
- `CollectMerkleDropMw` - Пользователи могут собирать сущность только с помощью правильного доказательства Меркла.
