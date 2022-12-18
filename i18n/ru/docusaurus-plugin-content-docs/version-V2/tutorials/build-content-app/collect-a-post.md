---
id: collect-a-post
title: Соберите пост
slug: /how-to/build-content-app/collect-a-post
sidebar_label: Соберите пост
sidebar_position: 6
description: Как создать контент приложение - Соберите пост
---

В этом разделе вы узнаете, как реализовать функцию [Сбора сущности](/guides/mutation/collect-essence). Ранее вы узнали, что создание поста означает регистрацию сущности, но процесс чеканки и передачи NFT фактически выполняется только тогда, когда пользователь собирает пост.

## Мутации GraphQL

Сбор сущности, то есть сбор поста, представляет собой двухэтапный процесс и требует двух мутаций GraphQL: `CreateCollectEssenceTypedData` и `Relay`.

1. `CreateCollectEssenceTypedData` используется для представления данных пользователю в удобочитаемом формате:

```tsx title="graphql/CreateCollectEssenceTypedData.ts"
import { gql } from "@apollo/client";

export const CREATE_COLLECT_ESSENCE_TYPED_DATA = gql`
    mutation CreateCollectEssenceTypedData(
        $input: CreateCollectEssenceTypedDataInput!
    ) {
        createCollectEssenceTypedData(input: $input) {
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

## Соберите пост

Теперь, когда вы настроили необходимые API, вы можете реализовать функцию сбора. Подход почти точно такой же, как и для [Подписки на профиль](/how-to/build-content-app/subscribe-to-profile):

1. Получите данные в удобочитаемом формате и  `typedDataID` для них;
2. Попросите пользователя подписать данные сообщения и получить его `signature`;
3. Вызовите `relay` и передайте ему  `typedDataID` и `signature`;

```tsx title="components/CollectBtn.tsx"
/* Создайте типизированные данные в удобочитаемом формате */
const typedDataResult = await createCollectEssenceTypedData({
    variables: {
        input: {
            options: {
                chainID: chainID,
            },
            collector: account,
            profileID: profileID,
            essenceID: essenceID,
        },
    },
});

const typedData =
    typedDataResult.data?.createCollectEssenceTypedData?.typedData;
const message = typedData.data;
const typedDataID = typedData.id;

/* Получите подпись для сообщения, подписанного кошельком */
const params = [account, message];
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

Если процесс сбора прошел успешно, вы сможете проверить хэш транзакции на [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-content-app-collect-a-post-tx.png)

Вы также можете просмотреть NFT, когда пользователь собирает пост на [testnets.opensea.io](testnets.opensea.io). Вы заметите, что изображение для NFT и все другие сведения о нем соответствуют сведениям, переданным в поля [Схемы метаданных](/how-to/build-content-app/create-a-post#metadata-schema) (например, `image_data`, `name`, `description`, и т.д.).

![nft essence](/img/v2/build-content-app-collect-a-post-nft.png)

Далее вы глубоко погрузитесь в промежуточные программы и узнаете, как их устанавливать. Давайте начнем с [Middleware для подписок](/how-to/build-content-app/middleware-for-subscribe).
