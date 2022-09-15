---
id: namespace
title: Query Namespace and its profiles
slug: /guides/query/namespace
sidebar_label: Namespace
sidebar_position: 2
description: Query - Namespace
---

Right now we support `namespaceByContractAddress` , `namespaceByName` . `namespace` is the entry point to `profile` which is always bound to a namespace. For example you could have a `Link3 Profile` as `vitalik.link3` and a `CyberConnect Profile` as `vitalik.cyberconnect`

To query the profiles, simply use profileByHandle to get one profile or use profiles to list multiple on a namespace.

Use the following to get `Link3` namespaces on BNB, ETH Mainnet. Or `CyberConnect` namespace on Goerli.

## Link3 on ETH

[Run on Postman](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-60a8c464-8c6b-48cd-a138-7f5ca462a00b) [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-79eb293e-a493-48fc-ac97-5c06eea53d20)

## CyberConnect on Goerli

[Run on Postman](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-2067d63f-e7d5-4d86-a2d2-2d96077d2b97) [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-54797ffe-ddb0-4773-b658-f4f712af02cb)
