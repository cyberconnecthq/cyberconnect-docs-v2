---
id: smart-contract-protocol
title: Smart Contract Protocol
slug: /overview/smart-contract-protocol
sidebar_label: Smart Contract Protocol
sidebar_position: 1
description: Smart Contract Protocol
---

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

<Tooltip anchorId="ERC721" html="ERC-721 is a data standard for creating non fungible tokens, <br /> meaning each token is unique and cannot be divided <br /> or directly exchanged for another ERC-721 token." />

The Smart Contract Protocol is the core of the CyberConnect and categorizes social data into three core components. All three components are represented as <strong id="ERC721" class="boxBorder"> ERC-721 tokens </strong> and together create the underlying nodes & edges of the decentralized social graph. 

### 1. **Identity 👤 ~>** [ccProfileNFT](/overview/smart-contract-protocol/smart-contract#profilenft)
### 2. **Connection 👥 ~>** [SubscribeNFT](/overview/smart-contract-protocol/smart-contract#subsrcibenft) 
### 3. **Content  📝 ~>** [EssenceNFT](/overview/smart-contract-protocol/smart-contract#essencenft)


The ERC-721 token format means the components of the social graph are all on-chain, benefiting from composability (i.e. shared computational environment or monetization). A set of smart contracts are deployed on EVM-compatible blockchains that enable dApps to easily create their context-specific social graph and name service in a permissionless manner. The protocol provides highly customizable [middleware](/core-concepts/middleware) layers for dApps to build their own computational conditions (e.g. pay to connect, issue badges as collectible assets). 

![gp_sm](/img/v2/Smart_Contract_Protocol_overview.png)