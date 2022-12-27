---
id: collect-a-badge
title: Соберите бейдж
slug: /how-to/build-badge-app/collect-a-badge
sidebar_label: Соберите бейдж
sidebar_position: 5
description: Как создать приложение для бейджей - Соберите бейдж
---

В этом разделе вы узнаете, как реализовать функцию [Собрать сущность](/guides/mutation/collect-essence). Ранее вы узнали, что создание бейджа означает регистрацию сущности, но процесс чеканки и передачи SBT фактически выполняется, когда пользователь получает бейдж, посещая мероприятие.

Чтобы упростить задачу, мы сосредоточимся только на фактической реализации сбора бейджей пользователями. Привязка их к реальному мероприятию и проверка того, посещали ли пользователи это мероприятие, выходит за рамки данного руководства.

## Мутации GraphQL

Сбор сущности, то есть получение SBT бейджа, представляет собой двухэтапный процесс и требует двух мутаций GraphQL: `CreateCollectEssenceTypedData` и `Relay`.

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

## Соберите бейдж

Теперь, когда вы настроили необходимые API, вы можете реализовать функцию сбора. Подход почти точно такой же, как и для [Создания бейджа](/how-to/build-badge-app/create-a-badge):

1. Получите данные в удобочитаемом формате и `typedDataID` для них;
2. Попросите пользователя подписать данные сообщения и получить его `signature`;
3. Вызовите `relay` и передайте ему `typedDataID` и `signature`;

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

![transaction hash](/img/v2/build-badge-app-collect-a-badge-tx.png)

Вы также можете просмотреть NFT, когда пользователь собирает бейдж в [testnets.opensea.io](testnets.opensea.io). Вы заметите, что изображение для NFT и все другие сведения о нем соответствуют сведениям, переданным в поля [Схемы метаданных](/how-to/build-nft-sbt-platform/create-a-badge#metadata-schema) (например, `image_data`, `name`, `attributes` и т.д.).

![nft essence](/img/v2/build-badge-app-collect-a-badge-nft.png)

Отлично! Вы завершили **Руководство по созданию приложения для бейджей**! Теперь вы можете создать свое собственное приложение, которое выдает бейджи. Поделитесь своей работой в нашем [Discord](https://discord.com/invite/cUc8VRGmPs ). Мы с удовольствием посмотрим, что вы создали!
