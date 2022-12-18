---
id: labels
title: Ярлыки
slug: /guides/recommendation-engine/labels
sidebar_label: Ярлыки
sidebar_position: 1
description: Механизм рекомендаций - Ярлыки
---

## Ярлыки CyberConnect

Поиск чьего-либо адреса в проводнике блоков может быть довольно запутанным для людей, не знакомых с данными блокчейна. Все эти случайные шестнадцатеричные кодированные строки `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` не удобны для пользователя и могут оттолкнуть новичков. Вот тут-то и пригодятся ярлыки CyberConnect. 

### Что такое ярлык?

Ярлык - это **фрагмент метаданных об адресе**, тег, если хотите, представленный в виде строки. В настоящее время существует два вида ярлыков:

1. **Ярлык контракта<sup>1</sup>**
    - Карта **1-к-1** с адресами контрактов
    - Они похожи на названия контрактов в Etherscan
    
      ![contract](/img/v2/contract-labels-comparison.png)
2. **Ярлык проекта**
    - Карта **1-ко-многим** с адресами контрактов
    - Предназначены для объекта более высокого уровня, привязывающего несколько контрактов к одному объекту
    - Они похожи на значки / метки, найденные в верхней части контрактов / адресов на Etherscan
    
      ![project](/img/v2/project-labels-comparison.png)

Другой способ думать о двух типах ярлыков заключается в том, что ярлыки проекта являются родительскими для ярлыков контракта. Например, где `Opensea` это ярлык проекта, а `OpenSea: Wyvern Exchange v1` пример ярлыка дочернего контракта.

```json
{
    "project": "OpenSea",
    "contracts": [
        {
            "contractName": "OpenSea: Wyvern Exchange v1",
            "address": "0x7be8076f4ea4a4ad08075c2508e481d6c946d12b"
        },
        {
            "contractName": "OpenSea: Registry",
            "address": "0xa5409ec958c83c3f309868babaca7c86dcb077c1"
        },
        ...
    ]
}
```

# Как я могу использовать эти ярлыки?

Прямо сейчас наш основной способ получить доступ к этим ярлыкам, это получить количество взаимодействий, которые адрес имел с этими ярлыками (т.е. количество транзакций, отправленных / полученных этим адресом из контрактов, принадлежащих этим ярлыкам). В настоящее время мы раскрываем только взаимодействия на уровне проекта, но планируем опубликовать подробную информацию на уровне контракта в следующем выпуске.

## Статистика взаимодействий на уровне проекта

Свойство `projectInteractionStats` предоставляет список проектов, с которыми взаимодействовал входной адрес / пользователь. Он также возвращает общую статистику о взаимодействии с проектом, такую как:

-   Количество транзакций, также в разбивке по полученным и отправленным
-   Временные метки первой и последней транзакций
-   Пример хэша транзакции из заданных взаимодействий

import PostmanCard from "@site/src/components/PostmanCard";

### Детальный вид

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-f8948b6d-4c42-448b-bc0a-65ee75815847"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-9a0f9ff3-2fb4-4086-819b-e115f09e7a48"
/>

```json
"address": {
            "ethWallet": {
                "metadata": {
                    "projectInteractionStats": [
                        {
                            "project": "Uniswap User",
                            "txCount": 92,
                            "numSent": 92,
                            "numReceived": 0,
                            "firstInteraction": "2020-08-31T20:53:47Z",
                            "lastInteraction": "2022-02-21T04:02:28Z",
                            "sampleTxHashes": [
                                "0x5eb719bc6cc83a2dbffeb14e430954ba83cfed7f6558167da5d1a08bdea86e3b",
                                "0x648460f73e80353b839e43749041ba38545906d5669d1e943c436d70044309c3",
                                ...
                            ]
                        },
                        {
                            "project": "OpenSea User",
                            "txCount": 52,
                            "numSent": 52,
                            "numReceived": 0,
                            "firstInteraction": "2020-11-29T05:48:58Z",
                            "lastInteraction": "2022-01-26T21:47:08Z",
                            "sampleTxHashes": [
                                "0xe9b98371f9a60c602850b35cf471ce81b104a0ad4d6f9bbad45894eac4f2b0d1",
                                "0xfbffed3c8f9a6fc6c9eea7f6d9f6d7e260fd4b3745652d1471dba1555a713cf0"
                            ]
                        },
```

### Агрегированный вид

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-0483574a-f11c-4053-9fd7-daa4f11cda78"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-92cb285d-2e04-4ea8-9f20-0da2a7cf3a9d"
/>

```json
{
    "data": {
        "address": {
            "ethWallet": {
                "labels": {
                    "cyberconnectLabels": [
                        "OpenSea Master (50+ txs)",
                        "Uniswap Master (50+ txs)",
                        "ENS Diamond User (40+ txs)",
                        "Binance Platinum User (30+ txs)",
                        "Wrapped Token Gold User (20+ txs)",
                        "Yield Farming Gold User (20+ txs)",
                        "SushiSwap Silver User (10+ txs)",
                        "Staking Silver User (10+ txs)",
                        "Yearn.Finance Bronze User (5+ txs)",
                        "Zapper.Fi Bronze User (5+ txs)",
                        "0x Bronze User (5+ txs)",
                        "Bitfinex Bronze User (5+ txs)",
                        ...
                    ]
                }
            }
        }
    }
}
```

<details>
    <summary>
    [1] Примечание к ярлыкам контракта
    </summary>
    <div>
    В настоящее время мы раскрываем только детали на уровне проекта. Сопоставление между контрактом -> проектами не является общедоступным. Если вы хотите получить доступ к этому отображению, пожалуйста, свяжитесь с nazih.kalo@cyberconnect.me или отправьте отзыв, используя https://9txmc3wk3bc.typeform.com/to/Oapbu1SX и дайте нам знать, что вы думаете!
    </div>
</details>
