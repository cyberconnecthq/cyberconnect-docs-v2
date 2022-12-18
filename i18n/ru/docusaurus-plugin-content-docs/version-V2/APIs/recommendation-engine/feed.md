---
id: feed
title: Ленты
slug: /guides/recommendation-engine/feed
sidebar_label: Ленты
sidebar_position: 3
description: Механизм рекомендаций - Ленты
---

**Ленты** предоставляют пользователям знакомый способ отображения Web3 данных. В своей простейшей форме лента, это просто набор контента, отсортированного в определенном порядке.

CyberConnect планирует запустить несколько лент в ближайшем будущем, включая (но не ограничиваясь):
1. Ленты пользователя
   - Ленты, ориентированные на контент и on-chain взаимодействия конкретного пользователя / адреса
2. Ленты сообщества
   - Ленты, ориентированные на контент и on-chain взаимодействия конкретного сообщества (например, держатели Azuki)
3. Ленты домена
   - Ленты, ориентированные на контент on-chain взаимодействия  определенных доменов (например, Social, Defi и т.д.)

Первая лента, которую мы представим, это пользовательская лента, основанная на ERC переводах. Поля `feed`  в разделе `Wallet` вернут последнюю историю переводов ERC для данного адреса. Чтобы ускорить запрос, вы можете исключить поле `token` в вашем запросе (которое используется только для получения информации о token_address).

import PostmanCard from "@site/src/components/PostmanCard";

<PostmanCard 
  queryURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-d226b206-9ee7-4dde-b1d9-9b08fda6b307"
  exampleURL="https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-637501c0-782e-477c-b34f-999af81c00b8"
/>

```json
{
    "data": {
        "address": {
            "ethWallet": {
                "feed": [

                {
                        "evt_type": "Mint",
                        "token_standard": "ERC721",
                        "evt_block_time": "2022-07-19T17:32:24Z",
                        "token_address": "0x8cc6517e45db7a0803fef220d9b577326a12033f",
                        "tx_hash": "0x9345dcb5c1b398db288bceaa668fe9a1ea8d7d90a589a3f7ba0fe82da5ca6ade",
                        "amount": "1",
                        "tokenId": "20",
                        "token": {
                            "token": {
                                "name": "Link3",
                                "contractAddress": "0x8cc6517e45db7a0803fef220d9b577326a12033f",
                                "contract_creation_time": "2022-07-18T05:25:04Z",
                                "block_number": 15164734
                            },
                            "tokenLogo": "https://openseauserdata.com/files/070f3c5149a0d4bfae3a04312af6d42f.png",
                            "twitter": "https://twitter.com/link3to",
                            "homepage": "http://link3.to",
                            "etherscan_labels": [],
                            "etherscan_token_contractnames": [],
                            "etherscan_acccount_contractnames": [],
                            "trustwallet_tags": [],
                            "dune_category": "",
                            "coingecko_categories": [],
                            "blog": "",
                            "medium": "",
                            "github_organization": "",
                            "github": "",
                            "subreddit_url": "",
                            "telegram_channel_url": "",
                            "facebook_page": "",
                            "discord": "https://discord.gg/cUc8VRGmPs",
                            "total_supply": "0",
                            "description": "Link3 is a Web3 social network of verifiable identities. \n\nAggregating both on-chain and off-chain data, Link3 profiles serve as holistic identities enabling trustworthy networking and meaningful connections among users and organizations.",
                            "banner_image_url": "https://openseauserdata.com/files/5174bdfeb2a72b6f2529eb208545c4b0.png",
                            "opensea_status": "not_requested"
                        }
                    },
```