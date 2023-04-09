---
id: create-a-badge
title: Создайте бейдж
slug: /how-to/build-nft-sbt-platform/create-a-badge
sidebar_label: Создайте бейдж
sidebar_position: 4
description: Как создать приложение для бейджей - Создайте бейдж
---

В этом разделе вы узнаете, как реализовать функцию [Регистрации сущностей](/api/content/essence/register-essence). Мы называем _сущностью (essence)_ все, что является контентом и связано с ним. Да, это тоже NFT. Это может быть бейдж, пост или что-то совершенно другое, все зависит от вашего воображения.

Когда пользователь создает сущность, создается только невзаимозаменяемый токен (NFT). Чеканка и передача NFT пользователю, который его собирает, выполняется в процессе _сбора сущности (collect essence)_, о чем вы узнаете все в следующем разделе.

В этом разделе мы используем термины SBT и NFT равнозначно, поскольку SBT по-прежнему является NFT, с той лишь разницей, что он не подлежит передаче. В этом примере сущность примет форму бейджа и будет выпускаться как SBT. Не стесняйтесь изменять это, так как эти бейджи могут быть передаваемыми или непередаваемыми.

:::info

Основное различие между невзаимозаменяемым токеном (NFT) и токеном Soulbound (SBT) заключается в том, что SBT является непередаваемым токеном.

:::

## Мутации GraphQL

Регистрация сущности, то есть создание бейджа для этого примера, представляет собой двухэтапный процесс и требует двух мутаций GraphQL: `CreateRegisterEssenceTypedData` и `Relay`.

1. `CreateRegisterEssenceTypedData` используется для представления данных пользователю в удобочитаемом формате:

```tsx title="graphql/CreateSubscribeTypedData.ts"
import { gql } from '@apollo/client'

export const CREATE_REGISTER_ESSENCE_TYPED_DATA = gql`
  mutation CreateRegisterEssenceTypedData($input: CreateRegisterEssenceTypedDataInput!) {
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

## Схема метаданных

Вы можете думать о схеме метаданных сущности как о стандартном шаблоне, используемом для хранения данных, связанных с контентом, и NFT, содержащем эти данные.

Вы можете заметить, что некоторые поля соответствуют [стандартам метаданных OpenSea](https://docs.opensea.io/docs/metadata-standards) и это делается для того, чтобы гарантировать, что NFT будет должным образом отображаться на OpenSea и других маркетплейсах.

Ниже приведены все поля для схемы метаданных сущности, сопровождаемые кратким описанием того, что они представляют.

```tsx title="types.ts"
/* Схема метаданных для Essence NFT */

interface Media {
  /* Тип MIME для медиа */
  media_type: string
  /* URL-ссылка для медиа */
  media_url: string
  /* Альтернативный текст, когда медиа не может быть отображено */
  alt_tag?: string
  /* Изображение предварительного просмотра для медиа */
  preview_image_url?: string
}

interface Attribute {
  /* Поле, указывающее, как вы хотели бы, чтобы оно отображалось */
  /* необязательно trait_type должен быть string */
  display_type?: string
  /* Название признака */
  trait_type: string
  /* Значение признака */
  value: string
}

export interface IEssenceMetadata {
  /* ~~ ОБЯЗАТЕЛЬНЫЕ ~~ */
  /* Уникальный идентификатор для выданного элемента */
  metadata_id: string

  /* Версия схемы метаданных, используемой для выданного элемента */
  version: string

  /* ~~ ОПЦИОНАЛЬНЫЕ ~~ */
  /* Идентификатор приложения, в рамках которого минтятся элементы */
  app_id?: string

  /* Язык содержимого в виде языкового тега BCP47 */
  lang?: string

  /* Время создания элемента в соответствии с ISO 8601 */
  issue_date?: string

  /* Контент, связанный с элементом */
  content?: string

  /* Медиа относящиеся к любому изображению, видео или любому другому типу MIME, прикрепленному к контенту. Ограничено макс. 10 медиаобъектов */
  media?: Media[]

  /* Поле, указывающее теги, связанные с контентом. Ограничено макс. 5 тегов */
  tags?: string[]

  /* ~~ OPENSEA (ОПЦИОНАЛЬНЫЕ) ~~ */
  /* URL-адрес изображения элемента */
  image?: string

  /* Данные изображения SVG, когда изображение не передается. Используйте это только в том случае, если вы не включаете параметр image. */
  image_data?: string

  /* Название элемента */
  name?: string

  /* Описание элемента */
  description?: string

  /* URL-адрес мультимедийного вложения для элемента */
  animation_url?: string

  /* Атрибуты для элемента */
  attributes?: Attribute[]

  /* URL-адрес элемента на вашем сайте */
  external_url?: string
}
```

:::tip

[Проверка метаданных сущности](/api/content/essence/verify-essence-metadata) позволяет проверить валидность схемы метаданных сущности.

:::

## Создайте бейдж

Создать бейдж означает [Зарегистрировать сужность](/api/content/essence/register-essence) и для этого требуется выполнение следующих шагов:

1. Создайте объект метаданных для Essence NFT;
2. Загрузите метаданные в IPFS, чтобы получить хэш;
3. Получите данные в удобочитаемом формате и `typedDataID` для них;
4. Попросите пользователя подписать данные сообщения и получить его `signature`;
5. Вызовите `relay` и передайте ему `typedDataID` и `signature`;

```tsx title="components/BadgeBtn.tsx"
/* Создайте объект метаданных для Essence NFT */
const metadata: IEssenceMetadata = {
  metadata_id: uuidv4(),
  version: '1.0.0',
  app_id: 'cyberconnect',
  lang: 'en',
  issue_date: new Date().toISOString(),
  content: '',
  media: [],
  tags: [],
  image: nftImageURL ? nftImageURL : '',
  image_data: !nftImageURL ? svg_data : '',
  name: `@${handle}'s event`,
  description: `@${handle}'s event on CyberConnect Badge app`,
  animation_url: '',
  external_url: '',
  attributes: [
    {
      display_type: 'string',
      trait_type: 'title',
      value: title,
    },
    {
      display_type: 'date',
      trait_type: 'date',
      value: Date.now(),
    },
    {
      display_type: 'string',
      trait_type: 'venue',
      value: venue,
    },
  ],
}

/* Загрузите метаданные в IPFS */
const ipfsHash = await pinJSONToIPFS(metadata)

/* Создайте типизированные данные в удобочитаемом формате */
const typedDataResult = await createRegisterEssenceTypedData({
  variables: {
    input: {
      options: {
        /* Идентификатор цепочки, на которой будет отчеканен Essence NFT */
        chainID: chainID,
      },
      /* Идентификатор профиля, под которым Essence зарегистрирована */
      profileID: profileID,
      /* Название Сущности  */
      name: 'Event SBT',
      /* Символ Сущности */
      symbol: 'SBT',
      /* URL для объекта json, содержащего данные о контенте и Essence NFT */
      tokenURI: `https://cyberconnect.mypinata.cloud/ipfs/${ipfsHash}`,
      /* Middleware, позволяющее пользователям бесплатно собирать Essence NFT */
      middleware: {
        collectFree: true,
      },
      /* Установите, должна ли Сущность быть передаваемой или нет */
      /* SBT не подлежат передаче */
      transferable: false,
    },
  },
})
const typedData = typedDataResult.data?.createRegisterEssenceTypedData?.typedData
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

Следует отметить пару моментов:

- Мы использовали поле `attributes` для хранения информации о бейдже (или событии, связанном с ним) и следовали [стандарту метаданных OpenSea](https://docs.opensea.io/docs/metadata-standards), чтобы гарантировать, что он будет правильно отображаться на маркетплейсах;

- Мы передали в качестве `middleware` промежуточную программу `collectFree`, чтобы позволить пользователям собирать пост бесплатно. В этом руководстве мы не будем углубляться в промежуточные программы, но вы всегда можете ознакомиться с разделом [Посредники](/concepts/middleware);

- Мы установили `transferable` в значение `false`, таким образом, NFT не будет передаваться, как только он попадет на адрес кошелька пользователя;

Если регистрация сущности (или бейджа в нашем случае) прошла успешно, вы можете проверить хэш транзакции на [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-badge-app-create-a-badge-tx.png)

![transaction hash](/img/v2/build-badge-app-create-a-badge-tx2.png)

Обратите внимание, что на данном этапе вы только регистрируете SBT. Когда пользователь получает бейдж, SBT фактически будет отчеканен и переведен на адрес кошелька пользователя, о котором вы узнаете все в следующем разделе [Соберите бейдж](/how-to/build-badge-app/collect-a-badge).
