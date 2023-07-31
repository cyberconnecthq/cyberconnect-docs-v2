---
id: cyberaccount
title: CyberAccount
slug: /core-concepts/cyberaccount
sidebar_label: CyberAccount
sidebar_position: 1
description: CyberAccount
---

# CyberAccount

CyberAccount is a suite of smart contracts that collectively represent a user’s self-sovereign digital identity, linking it to their content and social connections. This web3 account infrastructure comprises 4 key components, each with a different purpose:

<div>
<img src="/img/v3/cyberaccount.png"/>
</div>

## Authentication & Authorization

CyberAccount is commissioned with defining the workflow for user authentication and authorization on the CyberConnect protocol.

Each CyberAccount is controlled and managed by one or more cryptographic key pairs, thus enabling a clear distinction between a user’s account and their web3 wallet. Through our collaboration with [ZeroDev](https://zerodev.app/), we incorporated this crucial design implementation that sets the stage to power several powerful primitives. This includes social recovery for cases of identity/private key loss as well as email, social, or phone login options for a seamless and familiar onboarding experience devoid of the need for seed phrase management.

Our team at CyberConnect is passionately committed to empowering users’ rights to privacy. We will therefore introduce an additional upgrade to CyberAccount in the coming months utilizing zero-knowledge proofs and privacy computing technology.

## ERC-4337 Compatible

CyberAccount is ERC-4337 compatible, meaning it abstracts away the complexities of network switching and gas payments for end users. We worked closely with [StackUp](https://www.stackup.sh/) & [Pimlico](https://twitter.com/pimlicoHQ) to deploy an in-house bundler and paymaster solution, allowing us to improve the clunky user experience of web3 wallets and implement third-party-designed mechanisms to pay for users’ transactions. These kinds of transactions may also be called gasless transactions, and they’re crucial to level up the end-user experience. Without a bundler and paymaster, users would need to manually change networks every time they interact with a profile or content from another blockchain and acquire the blockchain's native token in their account to pay for transactions.

The paymaster allows CyberConnect protocol, the underlying network, or any given web3 dApp to pay for transactions on users' behalf, thus opening up a whole new level of possibilities for mass user onboarding and supercharge platform bootstrapping.

On CyberConnect, users will also be able to top up their gas credit from a network of their choice and use that credit on any other chain CyberAccount is deployed on, truly taking web3 social multi-chain.

And yes, [$CYBER](https://link3.to/cyberconnect/post/d430762b4c4a220decb9e8875db78f9af741699774d483d11b9c7203b1582e36) will eventually be used as the gas token across the protocol.

## CyberID

Much like your username on Instagram or Twitter, CyberID is an ERC-721 token that represents a unique handle for your account in the CyberConnect social network.

Unlike most ERC-721 tokens, registering/minting a CyberID does not imply perpetual ownership. CyberID functions upon a demand-based recurring fees model. If you forget to extend the registration of your handle, it is released to an auction process.

During the growth phase of the CyberConnect social network, a portion of the CyberID registration fees will be refunded to the CyberAccount as $CYBER token in the form of gas credit.

## Organization Account

Web3 social is not just for individual users. It’s also for teams, organizations, and brands to connect with their audiences and build meaningful, contribution-based communities. Link3, a web3 social network to build and discover new communities, is the biggest dApp within CyberConnect by user activity. It is loved by web3-native teams across blockchain networks for their community management needs. To push the potential of CyberAccount one step further, we’ve designed a powerful new way for organizations to embark on their web3 social journey. The organization account is a special kind of CyberAccount that provides advanced account management features such as multi-sig and customizable access control rules.

Additionally, the CyberConnect social network protocol provides a robust verification infrastructure that allows any third party to verify external accounts (e.g. Twitter, Discord) associated with the org account.