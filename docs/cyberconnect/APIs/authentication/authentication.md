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

- Any transaction / smart contract interaction requires a user to have BNB to cover gas costs.  This makes user onboarding and user experience painful. There is no way to have a high conversion rate when the users have to buy BNB before being able to use the application. To overcome this, we offer both a **gas & gasless mode**  for developers:
    1. **For gasless mode**, developers can get your api key and relayer address on [https://dashboard.cyberconnect.me/](https://dashboard.cyberconnect.me/), this is covered ([in the next step](/guides/authentication/get-api-key)). You can use relayer to send meta-transactions for your users through your api key.  As you can see in the diagram below, to enable gasless mode for your users, you must deposit funds (usually BNB, but other ERC20 tokens may be supported) into the relay address provided to cover gas. The relayer sending transaction for users is called `relay` . After `relay` , you will get the `relayActionId` which you should poll the `relayActionId` to check the transaction result.
    2. **For gas mode**, developers don’t need any api key or relayer’s help. You should call the smart contract directly and then call users’ wallet to send the transaction. Users have to pay for the gas.


<img src="/img/v2/auth_and_gas_v_gasless.png" height="1700px" width="1700px"/>

import DocCardList from '@theme/DocCardList';

:::tip
You can read more about relays & meta-transactions ([here](https://hackernoon.com/what-is-a-transaction-relayer-and-how-does-it-work-bd1q3ywa))
:::


<DocCardList/>

Mutations require Authorization header:

```
registerSigningKey
createCreateProfileTypedData
createRegisterEssenceTypedData
createCollectEssenceTypedData
createSetEssenceDataTypedData
createSubscribeTypedData
createSetSubscribeDataTypedData
relay
```
