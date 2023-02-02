---
id: authentication
title: Authentication
slug: /guides/authentication/authentication
sidebar_label: Authentication
sidebar_position: 1
description: Authentication - Get your API & Relay Address
---

In order to interact with the CyberConnect API you're going to need a few things:
1. **API Key**: Used to authenticate & identify your project (_Required_)
 - No expiration, only retrieve once - detailed in the next section
2. **Auth Token**: Used to authenticate & identify your users (_Required_)
 - This has an expiration and needs to be refreshed
3. **Relay Address**: A unique **proxy relayer** address to delegate to. The relayer is responsible for broadcasting the transaction, minting and transferring the NFT (_Optional_)

<img src="/img/v2/auth_and_gas_v_gasless.png" height="1700px" width="1700px"/>

import DocCardList from '@theme/DocCardList';

<DocCardList/>

Mutations require Authorization header:

registerSigningKey
createRegisterEssenceTypedData
createCollectEssenceTypedData
createSetEssenceDataTypedData
createSubscribeTypedData
createSetSubscribeDataTypedData
relay