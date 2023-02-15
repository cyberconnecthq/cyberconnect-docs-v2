---
id: recommendation-labels
title: Labels
slug: /guides/recommendation/labels
sidebar_label: Labels
sidebar_position: 2
description: Recommendation labels
---

## CyberConnect Labels

Looking up someone’s address on a block explorer can be quite confusing for people new to blockchain data. All these random hexadecimal encoded strings `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` aren't user friendly and can alienate newcomers. That’s where CyberConnect Labels come in. CyberConnect Labels are meant to

### What is a label?

A label is **a piece of metadata about an address**, a tag if you will, represented as a string. There are currently two kinds of labels:

1. **Contract Labels<sup>1</sup>**
   - Map **1-to-1** with contract addresses
   - These are similar to contract names on bscscan
     ![contract](/img/v2/contract-labels-comparison.png)
2. **Project Labels**
   - Map **1-to-Many** with contract addresses
   - Are meant to be higher level object tying multiple contracts to one entity
   - These are similar to badge/tags found at the top of contracts/addresses on bscscan
     ![project](/img/v2/project-labels-comparison.png)

Another way to think of the two label types are that project labels are the parent of contract labels. For example where `Opensea` is the project label and `OpenSea: Wyvern Exchange v1` is an example of a child contract label.

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

# How can I use these labels?

Right now we primary way of accessing these labels is through getting the number of interactions an address has had with those labels (i.e. the number of transactions that address has sent/received from contracts belonging to those labels). We currently only expose the project level interactions, but plan to release contract level detail in an upcoming release.

## Project Level interactions stats

The `projectInteractionStats` provides a list of projects with which the input address/user has interacted with. It also returns general stats about the project interactions such as:

- The transaction counts - also broken down received vs sent
- first & last transactions’ timestamps
- sample transaction hash from the given interactions

import ApolloCard from "@site/src/components/ApolloCard";

### Detailed View

<ApolloCard queryName="getCCLabelsDetailed" />

#### Sample output

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

### Aggregated View

<ApolloCard queryName="getCCLabels" />

#### Sample output

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
    [1] Contract Labels Note
    </summary>
    <div>
    We currently only expose project level details. The mapping between contract->projects is not publicly available. If you'd like to get access to this mapping please reach out at nazih.kalo@cyberconnect.me or submit feedback using https://9txmc3wk3bc.typeform.com/to/Oapbu1SX and let us know what are your thoughts!
    </div>
</details>
