---
id: middleware-for-subscribe
title: Middleware для подписки
slug: /how-to/build-content-app/middleware-for-subscribe
sidebar_label: Middleware для подписки
sidebar_position: 7
description: Как создать контент приложение - Middleware для подписки
---

Промежуточные программы задействуют динамические правила для выполнения действия. Middleware - это, по сути, смарт-контракты, которые выполняют часть логики до выполнения этого действия. В этом разделе действие, которое мы рассматриваем, заключается в том, чтобы [Подписаться на профиль](/how-to/build-content-app/subscribe-to-profile).

Middleware для подписки может использоваться для установки правил о том, что должно происходить, когда кто-то подписывается на профиль пользователя (например, разрешить другим пользователям подписываться только один раз с помощью `SubscribeOnlyOnceMw` или оплатить определенную сумму в токенах ERC-20 с помощью `SubscribePaidMw` и т.д.).

## Мутации GraphQL

К настоящему времени этот процесс должен быть действительно знакомым. Установка Middleware для подписки выполняется по тому же двухэтапному процессу, который требует двух мутаций GraphQL: `CreateSetSubscribeDataTypedData` и `Relay`.

1. `CreateSetSubscribeDataTypedData` используется для представления данных пользователю в удобочитаемом формате:

```tsx title="graphql/CreateSetSubscribeDataTypedData.ts"
import { gql } from "@apollo/client";

export const CREATE_SET_SUBSCRIBE_DATA_TYPED_DATA = gql`
    mutation CreateSetSubscribeDataTypedData(
        $input: CreateSetSubscribeDataTypedDataInput!
    ) {
        createSetSubscribeDataTypedData(input: $input) {
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

## Middleware для подписки

:::tip

Существует множество доступных промежуточных программ, которые могут быть реализованы. Посетите раздел [Посредники](/concepts/middleware), чтобы просмотреть полный список.

:::

Давайте приступим к реализации! Подход почти точно такой же, как и для [Подписки на профиль](/how-to/build-content-app/subscribe-to-profile).

Обратите внимание, что `CreateSetSubscribeDataTypedData` позволяет вам выполнить следующее:

1. Установить правила того, что должно происходить, когда кто-то подписывается на профиль пользователя;
2. Установить `tokenURI` для Subscribe NFT, который был отчеканен и переведен на адрес кошелька подписчика.

В этом примере основное внимание уделяется настройке промежуточной программы `subscribePaid` для включения правила, чтобы, когда другие пользователи захотят подписаться на профиль пользователя, им пришлось бы заплатить 1 LINK, чтобы сделать это:

1. Получите данные в удобочитаемом формате и  `typedDataID` для них;
2. Попросите пользователя подписать данные сообщения и получить его `signature`;
3. Вызовите `relay` и передайте ему `typedDataID` и `signature`;

При желании вы также можете установить `tokenURI`, создав объект метаданных для Subscribe NFT и загрузив его в IPFS, чтобы получить хэш и передать его в качестве параметра.

```tsx title="components/SetSubscribeBtn.tsx"
/* Создайте объект метаданных для Subscribe NFT */
const metadata = {
    image_data: getSubscriberSVGData(),
    name: `@${handle}'s subscriber`,
    description: `@${handle}'s subscriber on CyberConnect Content app`,
};

/* Загрузите метаданные в IPFS */
const ipfsHash = await pinJSONToIPFS(metadata);

/* Создайте типизированные данные в удобочитаемом формате */
const typedDataResult = await createSetSubscribeDataTypedData({
    variables: {
        input: {
            options: {
                /* Идентификатор цепочки, на которой будет отчеканен Subscribe NFT */
                chainID: chainID,
            },
            /* Идентификатор профиля пользователя, для которого включены правила */
            profileId: profileID,
            /* URL для объекта json, содержащего данные о Subscribe NFT */
            tokenURI: `https://cyberconnect.mypinata.cloud/ipfs/${ipfsHash}`,
            middleware: {
                subscribePaid: {
                    /* Адрес, на который будет получена сумма */
                    recipient: account,
                    /* Сумма, которую необходимо оплатить для подписки */
                    amount: 1,
                    /* Валюта для суммы. Контракт токена Chainlink на Goerli */
                    currency: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
                    /* Если true, требует от подписчика наличия NFT */
                    nftRequired: false,
                    /* Контракт NFT, который подписчик должен удерживать */
                    nftAddress: "0x0000000000000000000000000000000000000000",
                },
            },
        },
    },
});
const typedData =
    typedDataResult.data?.createSetSubscribeDataTypedData?.typedData;
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

Если Middleware было установлено успешно, вы сможете проверить хэш транзакции на [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-content-app-middleware-for-subscribe-tx.png)

![transaction hash](/img/v2/build-content-app-middleware-for-subscribe-tx2.png)

Теперь, когда Middleware установлено, всякий раз, когда кто-то хочет подписаться на профиль пользователя, ему придется заплатить 1 LINK, чтобы подписаться, и он получит Subscribe NFT, который выглядит следующим образом:

![nft subscribe](/img/v2/build-content-app-subscribe-to-profile-nft.png)

Далее вы углубитесь в [Middleware для поста](/how-to/build-content-app/middleware-for-post) и узнайте, как и когда его использовать и как его установить.
