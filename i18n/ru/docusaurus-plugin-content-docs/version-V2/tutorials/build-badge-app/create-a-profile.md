---
id: create-a-profile
title: Создайте профиль
slug: /how-to/build-badge-app/create-a-profile
sidebar_label: Создайте профиль
sidebar_position: 2
description: Как создать приложение для бейджей - Создайте профиль
---

В этом разделе вы узнаете, как взаимодействовать со смарт-контрактом для создания профиля. Мы иногда называем это _profile NFT_, и причина этого заключается в том, что после создания профиля, NFT будет автоматически отчеканен и переведен на кошелек пользователя.

:::tip

Приложение, которое вы создаете в этом примере, использует смарт-контракт **Link3 Profile** для **Goerli Testnet Network**. Если вы хотите создавать в другой сети (например **BNB Testnet**), пожалуйста, обратитесь к [Шпаргалке](/cheat-sheet) чтобы найти соответствующий адрес и обновить переменные _contract_ и _chain id_ в вашем проекте.

:::

## Подключите кошелек

Самый первый шаг в создании любого Web3 приложения, это разрешить пользователю подключаться к приложению с помощью своего кошелька, в данном случае кошелька MetaMask.

Независимо от того, хочет ли пользователь создать профиль или собирать и так далее, вам сначала нужно убедиться, что пользователь подключился к приложению, и вы можете использовать для этого библиотеку, такую как [Ethers.js](https://docs.ethers.io/v5/).

В качестве наилучшей практики было бы полезно рассмотреть возможность реализации функции проверки, чтобы удостовериться, подключен ли пользователь к правильной сети каждый раз, когда он использует свой кошелек.

После того, как вы рассмотрели эти две основные функции, связанные с кошельком MetaMask, вы можете перейти к более важным вещам, таким как взаимодействие со смарт-контрактом.

## ABI контракта

ABI (Application Binary Interface) - это способ взаимодействия со смарт-контрактом непосредственно из кошелька пользователя. Если вы не знакомы с этим, потратьте пару минут на то, чтобы ознакомиться со [спецификацией ABI](https://docs.soliditylang.org/en/v0.8.17/abi-spec.html).

ABI - это просто файл JSON, который необходимо импортировать в ваш проект, и самое приятное, что вам нужно добавить только те функции, которые вы действительно используете в своем приложении.

В этом примере вы будете работать с ABI для Link3 Profile NFT контракта `0x57e12b7a5f38a7f9c23ebd0400e6e53f2a45f271`. Поскольку вам нужно только создать профиль и получить идентификатор профиля после того, как профиль был создан, укажите в своем .json файле функции `createProfile` и `getProfileIdByHandle`.

```json title="abi/ProfileNFT.json"
[
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "handle",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "avatar",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "metadata",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "internalType": "struct DataTypes.CreateProfileParams",
                "name": "params",
                "type": "tuple"
            },
            { "internalType": "bytes", "name": "preData", "type": "bytes" },
            { "internalType": "bytes", "name": "postData", "type": "bytes" }
        ],
        "name": "createProfile",
        "outputs": [
            { "internalType": "uint256", "name": "tokenID", "type": "uint256" }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "string", "name": "handle", "type": "string" }
        ],
        "name": "getProfileIdByHandle",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
```

:::info

Пользователи могут создавать столько профилей, сколько пожелают. Существует также функция `setPrimaryProfile` в ABI контракта Profile NFT, которая может быть реализована, следуя той же логике, что и описанная для `createProfile`.

:::

Давайте подробнее рассмотрим требуемые параметры, которые ожидает функция:

-   `CreateProfileParams`;
-   `preData`;
-   `postData`.

Во-первых, существуют `CreateProfileParams` которые содержат всю необходимую информацию о профиле.
Первые 3 пары ключ-значение для этого параметра довольно понятны:

-   `to` - адрес кошелька пользователя;
-   `handle` - дескриптор пользователя;
-   `avatar` - URL-ссылка для аватара пользователя.

Также, есть `metadata`, и именно здесь Profile NFT начинает сиять, потому что он позволяет вам проявить творческий подход. Все зависит от того, как будет выглядеть ваше приложение и какую информацию оно будет отображать.

:::tip

Здесь `metadata` не соответствуют определенной схеме, поэтому они позволяют разработчикам настраивать структуру.

:::

Вот как выглядит интерфейс `metadata` для этого приложения:

```tsx title="types.ts"
/* Схема метаданных для Profile NFT */
interface IProfileMetadata {
    name: string;
    bio: string;
    handle: string;
    version: string;
}
```

И последнее, но не менее важное, существует `operator` который сообщает контракту, на какой адрес разрешено вносить изменения от имени адреса кошелька пользователя.

Следующими необходимыми параметрами являются `preData` и `postData` которые, по сути, являются Middleware - промежуточными программами, которые будут диктовать, что контракт должен обрабатывать до и после создания профиля.

Чтобы упростить задачу, в этом примере вы не будете устанавливать никаких промежуточных программ. Подробнее на эту тему читайте в разделе [Посредники](/concepts/middleware).

## Создайте профиль

Как упоминалось ранее, вы будете работать с Link3 Profile NFT, а соответственно с контрактом `0x57e12b7a5f38a7f9c23ebd0400e6e53f2a45f271`.

Все, что будет происходить на стороне клиента:

1. Соберите пользовательский ввод и создайте схему метаданных;
2. Загрузите объект метаданных в IPFS, чтобы получить хэш;
3. Создайте экземпляр объекта `contract` и вызовите функции `create Profile` и `getProfileIdByHandle`;

```tsx title="components/Buttons/SignupBtn.tsx"
/* Соберите пользовательский ввод  */
const handle = prompt("Handle:") || randUserName();
const avatar = prompt("Avatar URL:") || randAvatar({ size: 200 });
const name = prompt("Name:") || randFullName();
const bio = prompt("Bio:") || randPhrase();

/* Постройте схему метаданных */
const metadata: IProfileMetadata = {
    name: name,
    bio: bio,
    handle: handle,
    version: "1.0.0",
};

/* Загрузите метаданные в IPFS */
const ipfsHash = await pinJSONToIPFS(metadata);

/* Получите подписанта от поставщика */
const signer = provider.getSigner();

/* Получите экземпляр контракта */
const contract = new ethers.Contract(
    PROFILE_NFT_CONTRACT,
    ProfileNFTABI,
    signer
);

/* Вызовите функцию createProfile, чтобы создать профиль */
const tx = await contract.createProfile(
    /* CreateProfileParams */
    {
        to: address,
        handle: handle,
        avatar: avatar,
        metadata: ipfsHash,
        operator: PROFILE_NFT_OPERATOR,
    },
    /* preData */
    0x0,
    /* postData */
    0x0
);

/* Дождитесь, пока транзакция будет завершена */
await tx.wait();

/* Вызовите функцию getProfileIdByHandle, чтобы получить идентификатор профиля */
const profileID = await contract.getProfileIdByHandle(handle);
```

Если профиль был успешно создан, вы сможете проверить хэш зарегистрированной транзакции на [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-content-app-create-a-profile-tx.png)

Вы также сможете просмотреть NFT для профиля на [testnets.opensea.io](https://testnets.opensea.io/). Контракт Link3 Profile NFT генерирует эти красивые SVG изображения для NFT, чеканит NFT профиля, а затем переводит его на адрес кошелька владельца.

![nft profile](/img/v2/build-content-app-create-a-profile-nft.png)

Отличная работа! Вы создали свой первый профиль! В следующем разделе мы рассмотрим процесс [Аутентификации](/how-to/build-badge-app/authentication).
