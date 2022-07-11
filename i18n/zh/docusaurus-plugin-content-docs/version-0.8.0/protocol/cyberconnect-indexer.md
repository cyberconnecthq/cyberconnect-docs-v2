---
id: cyberconnect-indexer
title: CyberConnect 索引器
slug: /protocol/cyberconnect-indexer/
sidebar_label: CyberConnect 索引器
sidebar_position: 2
description: We introduce how to mutate (follow and unfollow) a connection status between addresses in Connect with SDK and Connect with Follow Button sections.
---

## CyberConnect 索引器的高阶理解

我们在[**用 SDK 连接**](/cyberconnect-sdk/connect-with-js-sdk/)和[**用关注按钮连接**](/cyberconnect-sdk/connect-with-follow-button/)这两个部分介绍了如何改变（关注和取消关注）一个[**社交连接**](/concepts/connection/)地址之间的状态。在本节中，我们将指导您如何从 CyberConnect 索引器查询连接数据并获得潜在的关系[**建议**](/concepts/recommend/)。

CyberConnect 索引器从 IPFS 和区块链网络收集链上数据，并从各种平台收集链下数据。然后，它对原始数据进行汇总、转换并存储到图形数据库。在部署之后，索引器可以执行地址[身份](/concepts/identity/)策划，并在用户端应用中向社会图谱模块提供连接建议。

![CyberConnect Indexer 1](/img/v0.2.0/protocol/indexer1.png)

## CyberConnect 索引器架构

CyberConnect 索引器可分为四个部分：处理器，聚合器，推荐器，和查询器。它们中的每一个都以流水线的方式依次处理数据，在下文中，我们将按照这个顺序介绍每个部分。

处理器旨在索引来自 IPFS 网络、以太链和 Solana 等区块链网络的原始数据，并从 Rarible、推特、NFTBank 等平台获取链外数据。处理器将把获取的和索引的数据存储在 MySQL、PostgreSQL 等关联型数据库中。

聚合器读取处理器写入关联型数据库的数据，将其转换并存储到 Neo4j、TigerGraph 等图形数据库中，供推荐器和查询器使用。

推荐器采用非加权（按在整个网络中的受欢迎程度等）和加权（基于资产、基于行动等）推荐算法来分析潜在的关系并进行推荐。它还支持根据主人的需要定制推荐算法。

![CyberConnect Indexer 2](/img/v0.2.0/protocol/indexer2.png)

查询器主要有三个目的：提供身份数据，提供关系数据，以及连接推荐。它从图数据库中检索数据，从推荐器中获取推荐结果，并按照要求的方式返回数据。

## 数据检索

CyberConnect 索引器使用 GraphQL 作为数据检索的查询语言。你可以通过索引器的 GraphQL 端点查询地址身份信息并获得推荐。在 [CyberConnect API](/cyberconnect-api/overview/) 章节中了解更多信息。
