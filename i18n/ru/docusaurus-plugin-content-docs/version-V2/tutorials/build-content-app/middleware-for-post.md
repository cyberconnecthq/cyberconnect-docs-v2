---
id: middleware-for-post
title: Middleware для поста
slug: /how-to/build-content-app/middleware-for-post
sidebar_label: Middleware для поста
sidebar_position: 8
description: Как создать контент приложение - Middleware для поста
---

Промежуточные программы задействуют динамические правила для выполнения действия. Middleware - это, по сути, смарт-контракты, которые выполняют часть логики до выполнения этого действия. В этом разделе действие, которое мы рассматриваем, заключается в том, чтобы [Собрать пост](/how-to/build-content-app/collect-a-post).

Middleware для поста может использоваться для установки правил о том, что должно происходить, когда пользователь собирает пост (например, пользователи должны заплатить определенную сумму в токенах ERC-20 и / или установить количество раз, когда пост может быть собран с помощью `CollectPaidMw` и т.д.).

## Мутации GraphQL

К настоящему времени этот процесс должен быть действительно знакомым. Установка Middleware для поста выполняется по тому же двухэтапному процессу, который требует двух мутаций GraphQL: `CreateSetEssenceDataTypedData` и `Relay`.

1. `CreateSetEssenceDataTypedData` используется для представления данных пользователю в удобочитаемом формате:

```tsx title="graphql/CreateSetEssenceDataTypedData.ts"
import { gql } from "@apollo/client";

export const CREATE_SET_ESSENCE_DATA_TYPED_DATA = gql`
    mutation CreateSetEssenceDataTypedData(
        $input: CreateSetEssenceDataTypedDataInput!
    ) {
        createSetEssenceDataTypedData(input: $input) {
            typedData {
                id
                chainID
                sender
                data
                nonce
            }
        }
    }
`;
```

2. `Relay` отвечает за передачу транзакции, чеканку и передачу NFT:

```tsx title="graphql/Relay.ts"
import { gql } from "@apollo/client";

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
`;
```

## Middleware для поста

:::info

Настройка промежуточных программ для сущности может быть выполнена либо во время регистрации сущности, как это было первоначально сделано в разделе [Создайте пост](/how-to/build-content-app/create-a-post), либо после процесса регистрации, как описано в этом разделе.
:::

:::tip

Существует множество доступных промежуточных программ, которые могут быть реализованы. Посетите раздел [Посредники](/concepts/middleware), чтобы просмотреть полный список.

:::

Давайте приступим к реализации! Подход почти точно такой же, как и для [Middleware для подписки](/how-to/build-content-app/middleware-for-subscribe).

Обратите внимание, что `CreateSetSubscribeDataTypedData` позволяет вам выполнить следующее:

1. Установить правила того, что должно происходить, когда пользователь собирает пост (например, пользователи должны заплатить определенное количество токена ERC-20 или установить количество раз, когда пост может быть собран);
2. Установить `tokenURI` для Essence NFT, который был создан и переведен на адрес кошелька сборщика.

В этом примере основное внимание уделяется настройке промежуточной программы `subscribePaid` для включения правила, чтобы, когда другие пользователи захотят собрать сущность пользователя, им пришлось бы заплатить 1 LINK, чтобы сделать это:

1. Получите данные в удобочитаемом формате и  `typedDataID` для них;
2. Попросите пользователя подписать данные сообщения и получить его `signature`;
3. Вызовите `relay` и передайте ему `typedDataID` и `signature`;

При желании вы также можете установить `tokenURI`, создав объект метаданных для Subscribe NFT и загрузив его в IPFS, чтобы получить хэш и передать его в качестве параметра.

```tsx title="components/SetEssenceBtn.tsx"
/* Создайте типизированные данные в удобочитаемом формате */
const typedDataResult = await createSetEssenceDataTypedData({
    variables: {
        input: {
            options: {
                /* Идентификатор цепочки, на которой будет отчеканен Essence NFT */
                chainID: chainID,
            },
            /* Идентификатор сущности, для которой установлено middleware */
            essenceId: essenceID,
            /* Идентификатор профиля, который создал сущность */
            profileId: profileID,
            /* URL для объекта json, содержащего данные о контенте и Essence NFT */
            tokenURI: `https://cyberconnect.mypinata.cloud/ipfs/QmWeusbdbY2SEry1GEiJpmzd3Frp29wMNS3ZbNN21hLbVw`,
            /* Middleware, которое будет установлено для сущности */
            middleware: {
                collectPaid: {
                    /* Адрес, на который будет получена сумма */
                    recipient: account,
                    /* Количество раз, когда сущность может быть собрана */
                    totalSupply: 1000,
                    /* Сумма, которую необходимо заплатить для сбора сущности */
                    amount: 1,
                    /* Валюта для суммы. Контракт токена Chainlink на Goerli */
                    currency: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
                    /* Если true, требует, чтобы сборщик также был подписан */
                    subscribeRequired: false,
                },
            },
        },
    },
});
const typedData =
    typedDataResult.data?.createSetEssenceDataTypedData?.typedData;
const message = typedData.data;
const typedDataID = typedData.id;

/* Получите подпись для сообщения, подписанного кошельком */
const fromAddress = await signer.getAddress();
const params = [fromAddress, message];
const method = "eth_signTypedData_v4";
const signature = await signer.provider.send(method, params);

/* Вызовите ретранслятор для передачи транзакции */
const relayResult = await relay({
    variables: {
        input: {
            typedDataID: typedDataID,
            signature: signature,
        },
    },
});
const txHash = relayResult.data?.relay?.relayTransaction?.txHash;
```

Если Middleware было установлено успешно, вы cможете проверить хэш транзакции на [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-content-app-middleware-for-post-tx.png)

![transaction hash](/img/v2/build-content-app-middleware-for-post-tx2.png)

Теперь, когда Middleware установлено, всякий раз, когда кто-то хочет собрать сущность пользователя, ему придется заплатить 1 LINK для сбора и получить Essence NFT, который выглядит следующим образом:

![nft essence](/img/v2/build-content-app-middleware-for-post-nft.png)

Поздравляю! Вы завершили руководство **Как создать контент приложение**! Теперь вы можете создать свое собственное контент приложение и проявить к нему супер творческий подход. Мы хотели бы увидеть вашу работу, поэтому не забудьте поделиться ею в нашем [Discord](https://discord.com/invite/cUc8VRGmPs)!
