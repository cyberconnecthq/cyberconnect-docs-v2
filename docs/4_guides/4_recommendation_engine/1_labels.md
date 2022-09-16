---
id: labels
title: Labels
slug: /guides/recommendation-engine/labels
sidebar_label: Labels
sidebar_position: 1
description: Recommendation Engine - Labels
---

## CyberConnect Labels

Looking up someone’s address on a block explorer can be quite confusing for newcomers. All these random hexadecimal encoded strings are not very insightful and can alienate users. That’s where CyberConnect Labels come in.

### What is a label?

A label is **a piece of metadata about an address**, a tag if you will, represented as a string. There are currently two kinds of labels:

1. Contract Labels (i.e. ContractNames)
2. Project Labels

Project labels are the parent of contract labels. For example where `Opensea` is the project label and `OpenSea: Wyvern Exchange v1` is an example of a child contract label.

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

    {
      "contractName": "OpenSea: Wyvern Exchange v2",
      "address": "0x7f268357a8c2552623316e2562d90e642bb538e5"
    },

    {
      "contractName": "OpenSea: ENS Resolver",
      "address": "0x9c4e9cce4780062942a7fe34fa2fa7316c872956"
    }
  ]
}
```

### What do labels looks like?

Right now we support inspecting labels through the number of interactions an address has had with those labels (i.e. the number of transactions that address has sent/received from contracts belonging to those labels).

## Contract & Project Level interactions stats

The `getProjectInteractionStats` and `getContractInteractionStats` provide lists of projects and contracts with which an address has interacted with, respectively. They also return general stats about those project/contract level interactions such as:

- The transaction counts - also broken down received vs sent
- first & last transactions’ timestamps
- sample transaction hash from the given interactions

### Contract Level Interaction Stats

[Run in Postman](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-c38142e2-e5a9-4938-b877-58505b224e69) | [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-a972d9ff-36a2-4498-9cc3-224b38129d9e)

### Project Level Interaction Stats

[Run in Postman](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-f8948b6d-4c42-448b-bc0a-65ee75815847) | [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-9a0f9ff3-2fb4-4086-819b-e115f09e7a48)
