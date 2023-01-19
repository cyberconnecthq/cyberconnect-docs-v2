---
id: feed
title: Feed
slug: /guides/recommendation-engine/feed
sidebar_label: Feed
sidebar_position: 3
description: Recommendation Engine - Feed
---

**Feeds** provide a familiar way of surfacing web3 data to users. In its simplicest form, a feed is just a collection of content sorted in a particular order. 

CyberConnect plans to launch several feeds in the near future, including (but not limited to):
1. User Feeds
   - Feeds catered to a specific user / address' content & on-chain interactions
2. Community Feeds
   - Feeds catered to a specific community's content & on-chain interactions (ex. Azuki holders)
3. Domain Feeds
   - Feeds catered to a specific domains' content & on-chain interactions (ex. Social, Defi, etc.)

The first feed we are introducing is a user feed based on ERC transfers. The `feed` fields under `Wallet` will return the latest ERC transfer history for a given address. To speed up the query you can choose to exclude the `token` field in your query (which is only used to get the token_address info).

import ApolloCard from "@site/src/components/ApolloCard";

<ApolloCard queryName="getUserFeed" />


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