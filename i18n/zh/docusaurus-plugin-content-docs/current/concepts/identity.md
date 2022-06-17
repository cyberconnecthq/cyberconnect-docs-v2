---
id: identity
title: 身份
slug: /concepts/identity/
sidebar_label: 身份
sidebar_position: 2
description: By adopting a decentralized social graph, users aggregate their identities across different platforms and applications.
---

通过采用去中心化的 [社交图谱](/concepts/social-graph/)， 用户可以跨不同平台和应用程序聚合他们的身份。这允许开发者检索与用户地址相关的更全面的数据，例如：

<ul>
    <li>ENS 或 Solana 域名</li>
    <li>NFT</li>
    <li>头像</li>
    <li>经过验证的 Web2 社交帐户</li>
    <li>第一次链上交易</li>
    <li>关注他们的人</li>
    <li>他们关注的人</li>
    <li>相互关注的朋友</li>
</ul>

开发者可以调用 [CyberConnect API](/cyberconnect-api/overview/) 来构建更好的社交体验。

## 它是如何工作的？

CyberConnect 协议的索引器层收集来自 IPFS 和区块链网络（例如以太链、Solana）的链上数据以及来自 Web2 社交平台的链下数据。然后，索引器将原始数据转换并存储到图形数据库中，这使其能够在部署后管理用户身份。
