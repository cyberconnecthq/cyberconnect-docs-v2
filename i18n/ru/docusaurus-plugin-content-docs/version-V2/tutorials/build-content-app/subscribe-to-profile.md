---
id: subscribe-to-profile
title: Подпишитесь на профиль
slug: /how-to/build-content-app/subscribe-to-profile
sidebar_label: Подпишитесь на профиль
sidebar_position: 4
description: Как создать контент приложение - Подпишитесь на профиль
---

В этом разделе вы узнаете, как реализовать функцию подписки. Под капотом, когда пользователь подписывается на профиль, чеканится невзаимозаменяемый токен (NFT), который автоматически переводится на кошелек пользователя.
Чтобы это произошло, вы, по сути, будете следовать шагам, описанным в разделе [Подписка](/guides/mutation/subscribe).

## Мутации GraphQL

Подписка на профиль представляет собой двухэтапный процесс, требующий двух мутаций GraphQL: `Create Subscribe TypedData` и `Relay`.

1. `CreateSubscribeTypedData` используется для представления данных пользователю в удобочитаемом формате:

```tsx title="graphql/CreateSubscribeTypedData.ts"
import { gql } from '@apollo/client'

export const CREATE_SUBSCRIBE_TYPED_DATA = gql`
  mutation CreateSubscribeTypedData($input: CreateSubscribeTypedDataInput!) {
    createSubscribeTypedData(input: $input) {
      typedData {
        id
        chainID
        sender
        data
        nonce
      }
    }
  }
`
```

2. `Relay` отвечает за передачу транзакции, чеканку и передачу NFT:

```tsx title="graphql/Relay.ts"
import { gql } from '@apollo/client'

export const RELAY = gql`
  mutation Relay($input: RelayInput!) {
    relay(input: $input) {
      relayTransaction {
        id
        txHash
        typedData {
          id
          chainID
          sender
          data
          nonce
        }
      }
    }
  }
`
```

## Подпишитесь на профиль

Теперь вы знаете, какие API использовать для реализации функции подписки. Единственное, что остается, это установить связь между ними, вот так:

1. Получите данные в удобочитаемом формате и `typedDataID` для них;
2. Попросите пользователя подписать данные сообщения и получить его `signature`;
3. Вызовите `relay` и передайте ему `typedDataID` и `signature`;

```tsx title="components/SubscribeBtn.tsx"
/* Создайте типизированные данные в удобочитаемом формате */
const typedDataResult = await createSubscribeTypedData({
  variables: {
    input: {
      options: {
        chainID: chainID,
      },
      profileIDs: [profileID],
    },
  },
})
const typedData = typedDataResult.data?.createSubscribeTypedData?.typedData
const message = typedData.data
const typedDataID = typedData.id

/* Получите подпись для сообщения, подписанного кошельком */
const fromAddress = await signer.getAddress()
const params = [fromAddress, message]
const method = 'eth_signTypedData_v4'
const signature = await signer.provider.send(method, params)

/* Вызовите ретранслятор для передачи транзакции */
const relayResult = await relay({
  variables: {
    input: {
      typedDataID: typedDataID,
      signature: signature,
    },
  },
})
const txHash = relayResult.data?.relay?.relayTransaction?.txHash
```

Если процесс подписки прошел успешно, вы сможете проверить хэш транзакции на [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-content-app-subscribe-to-profile-tx.png)

Вы также можете просмотреть NFT, когда пользователь подписывается на профиль на [testnets.opensea.io](https://testnets.opensea.io). На данном этапе у NFT нет ни набора промежуточных программ, ни NFT изображения, но вы узнаете, как все это сделать, в разделе [Middleware для подписок](/how-to/build-content-app/middleware-for-post).

![nft subscribe](/img/v2/build-content-app-subscribe-to-profile-nft.png)

Далее мы рассмотрим контент и то, как он соотносится с Essence NFT в разделе [Создайте пост](/how-to/build-content-app/create-a-post).
