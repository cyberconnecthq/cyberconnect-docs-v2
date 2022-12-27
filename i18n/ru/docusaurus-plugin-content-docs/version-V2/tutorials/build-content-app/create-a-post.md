---
id: create-a-post
title: Создайте пост
slug: /how-to/build-content-app/create-a-post
sidebar_label: Создайте пост
sidebar_position: 5
description: Как создать контент приложение - Создайте пост
---

В этом разделе вы узнаете, как реализовать функцию [Регистрации сущности](/guides/mutation/register-essence). Мы называем _сущностью (essence)_ все, что является контентом и связано с ним. Да, это тоже NFT. Это может быть пост, статья, soulbound токен (SBT) или что-то совершенно другое, все зависит от вашего воображения.

Вы заметите, что процесс очень похож на тот, который описан в разделе [Подписка на профиль](/how-to/build-content-app/subscribe-to-profile), но есть небольшая разница. Когда пользователь создает сущность, создается только невзаимозаменяемый токен (NFT). Чеканка и передача NFT пользователю, который ее собирает, выполняется в процессе _сбора сущности (collect essence)_,  о чем вы узнаете все в следующем разделе.



## Мутации GraphQL

Регистрация сущности, то есть создание поста для этого примера, представляет собой двухэтапный процесс и требует двух мутаций GraphQL: `CreateRegisterEssenceTypedData` и `Relay`.

1. `CreateRegisterEssenceTypedData` используется для представления данных пользователю в удобочитаемом формате:

```tsx title="graphql/CreateSubscribeTypedData.ts"
import { gql } from "@apollo/client";

export const CREATE_REGISTER_ESSENCE_TYPED_DATA = gql`
    mutation CreateRegisterEssenceTypedData(
        $input: CreateRegisterEssenceTypedDataInput!
    ) {
        createRegisterEssenceTypedData(input: $input) {
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

## Схема метаданных

Вы можете думать о схеме метаданных сущности как о стандартном шаблоне, используемом для хранения данных, связанных с контентом, и NFT, содержащем эти данные.

Вы можете заметить, что некоторые поля соответствуют [стандартам метаданных OpenSea](https://docs.opensea.io/docs/metadata-standards) и это делается для того, чтобы гарантировать, что NFT будет должным образом отображаться на OpenSea и других маркетплейсах.

Ниже приведены все поля для схемы метаданных сущности, сопровождаемые кратким описанием того, что они представляют.

```tsx title="types.ts"
/* Схема метаданных для Essence NFT */

interface Media {
    /* Тип MIME для медиа */
    media_type: string;
    /* URL-ссылка для медиа */
    media_url: string;
    /* Альтернативный текст, когда медиа не может быть отображено */
    alt_tag?: string;
    /* Изображение предварительного просмотра для медиа */
    preview_image_url?: string;
}

interface Attribute {
    /* Поле, указывающее, как вы хотели бы, чтобы оно отображалось */
    /* необязательно trait_type должен быть string */
    display_type?: string;
    /* Название признака */
    trait_type: string;
    /* Значение признака */
    value: number | string;
}

export interface IEssenceMetadata {
    /* ~~ ОБЯЗАТЕЛЬНЫЕ ~~ */
    /* Уникальный идентификатор для выданного элемента */
    metadata_id: string;

    /* Версия схемы метаданных, используемой для выданного элемента */
    version: string;

    /* ~~ ОПЦИОНАЛЬНЫЕ ~~ */
    /* Идентификатор приложения, в рамках которого минтятся элементы */
    app_id?: string;

    /* Язык содержимого в виде языкового тега BCP47 */
    lang?: string;

    /* Время создания элемента в соответствии с ISO 8601 */
    issue_date?: string;

    /* Контент, связанный с элементом */
    content?: string;

    /* Медиа относящиеся к любому изображению, видео или любому другому типу MIME, прикрепленному к контенту. Ограничено макс. 10 медиаобъектов */
    media?: Media[];

    /* Поле, указывающее теги, связанные с контентом. Ограничено макс. 5 тегов */
    tags?: string[];

    /* ~~ OPENSEA (ОПЦИОНАЛЬНЫЕ) ~~ */
    /* URL-адрес изображения элемента */
    image?: string;

    /* Данные изображения SVG, когда изображение не передается. Используйте это только в том случае, если вы не включаете параметр image. */
    image_data?: string;

    /* Название элемента */
    name?: string;

    /* Описание элемента */
    description?: string;

    /* URL-адрес мультимедийного вложения для элемента */
    animation_url?: string;

    /* Атрибуты для элемента */
    attributes?: Attribute[];

    /* URL-адрес элемента на вашем сайте */
    external_url?: string;
}
```

:::tip

[Проверка метаданных сущности](/guides/query/verify-essence-metadata) позволяет проверить валидность схемы метаданных сущности.

:::

## Создайте пост

Создать пост означает [Зарегистрировать сужность](/guides/mutation/register-essence). Для этого требуется пара дополнительных шагов по сравнению с подпиской, но эти шаги относятся только к данным, связанным с Essence NFT:

1. Создайте объект метаданных для Essence NFT;
2. Загрузите метаданные в IPFS, чтобы получить хэш;
3. Получить данные в удобочитаемом формате и `typedDataID` для них;
4. Попросите пользователя подписать данные сообщения и получить его `signature`;
5. Вызовите `relay` и передайте ему `typedDataID` и `signature`;

```tsx title="components/PostBtn.tsx"
/* Создайте объект метаданных для Essence NFT */
const metadata: IEssenceMetadata = {
    metadata_id: uuidv4(),
    version: "1.0.0",
    app_id: "cyberconnect",
    lang: "en",
    issue_date: new Date().toISOString(),
    content: post,
    media: [],
    tags: [],
    image: nftImageURL ? nftImageURL : "",
    image_data: !nftImageURL ? svg_data : "",
    name: `@${handle}'s post`,
    description: `@${handle}'s post on CyberConnect Content app`,
    animation_url: "",
    external_url: "",
    attributes: [],
};

/* Загрузите метаданные в IPFS */
const ipfsHash = await pinJSONToIPFS(metadata);

/* Создайте типизированные данные в удобочитаемом формате */
const typedDataResult = await createRegisterEssenceTypedData({
    variables: {
        input: {
            options: {
                /* Идентификатор цепочки, на которой будет отчеканен Essence NFT */
                chainID: chainID,
            },
            /* Идентификатор профиля, под которым Сущность зарегистрирована */
            profileID: profileID,
            /* Название Сущности */
            name: "Post",
            /* Символ Сущности */
            symbol: "POST",
            /* URL для объекта json, содержащего данные о контенте и Essence NFT */
            tokenURI: `https://cyberconnect.mypinata.cloud/ipfs/${ipfsHash}`,
            /* Middleware, позволяющее пользователям бесплатно собирать Essence NFT */
            middleware: {
                collectFree: true,
            },
            /* Установите, должна ли Сущность быть передаваемой или нет */
            transferable: true,
        },
    },
});

const typedData =
    typedDataResult.data?.createRegisterEssenceTypedData?.typedData;
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

:::info

Настройка промежуточных программ для сущности может быть выполнена либо во время регистрации сущности, как представлено в этом разделе, либо после процесса регистрации, как описано в разделе [Middleware для поста](/how-to/build-content-app/middleware-for-post).


:::

:::tip

Существует множество доступных промежуточных программ, которые могут быть реализованы. Посетите раздел [Посредники](/concepts/middleware), чтобы просмотреть полный список.

:::

В этом примере мы просто передаем в качестве `middleware` промежуточную программу `collectFree`, которая позволит пользователям собирать посты бесплатно. Существует множество вариантов с точки зрения промежуточных программ, которые вы можете выбрать в разделе [Посредники](/concepts/middleware).

Если регистрация сущности (или поста в нашем случае) прошла успешно, вы сможете проверить хэш транзакции на [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-content-app-create-a-post-tx.png)

![transaction hash](/img/v2/build-content-app-create-a-post-tx2.png)

Обратите внимание, что на данном этапе вы только регистрируете NFT. Чеканка и передача NFT на адрес кошелька пользователя, происходит только тогда, когда пользователь собирает пост, о чем вы узнаете в следующем разделе [Соберите пост](/how-to/build-content-app/collect-a-post).


