---
id: middleware
title: Middleware
slug: /core-concepts/middleware
sidebar_label: Middleware
sidebar_position: 6
description: Major Concepts of CyberConnect
---
## Composable Middleware

Although the computational condition varies a lot on different dApps, many commonly seen patterns can be generalized into reusable and extensible modules. For example, dApp A wants to build a BAYC club by setting the condition that only BAYC holders can mint their app-specific ProfileNFT and dApp B wants to do the same thing for CloneX holders. The underlying pattern is the same and the only difference is the gated ERC-721 contract address.

The protocol utilizes a composable middleware layer before and after the user applies their minting actions (e.g. subscribe to a profile or collect essence). The middleware can be created to express generic constraints such as allowing only certain ERC-721 holders to pass the check. In such a way, the community can build a wide range of reusable middlewares together and dApp developers can pick and choose the relevant ones to plug into their dApp easily.

It is important to point out though that while the middleware is powerful when used to set constraints against the current blockchain state or to collect on-chain assets, it has limited utility when using it to check historical state or off-chain data. One possible solution is to call oracle contracts inside middleware to get data feeds from off-chain indexers.

# Supported Middlewares

To enable dynamic rules involved in profile creation, collecting contents and paid subscription, CyberConnect protocol provides various middlewares. There are three types of middlewares:
1. `ProfileMiddleware`, 
2. `CollectMiddleware`
3. `SubscribeMiddleware`. 

They are smart contracts with logic executed before and after `profile creation`, `collect` and `subscribe` happens.

<!-- Currently we support `PaidCollect` and `PaidSubscirbe` where users need to pay ERC20 token to collect a content or subscribe to a profile. We also support `PermissionedCollect` where the creator of the content specifies a whitelist. -->


## Subscribe Middleware

- `SubscribeDisallowedMw` - Subscribing to a user is disallowed.
- `SubscribeOnlyOnceMw` - Users can subscribe only once to this profile.
- `SubscribePaidMw` - Users pay a certain fee in ERC20 token to subscribe to this user.

## Collect Middleware

- `CollectDisallowedMw` - Collecting the essence is disallowed.
- `CollectOnlySubscribedMw` - Only subscribed profiles can collect the essence.
- `CollectPaidMw` - Users pay a certain fee in ERC20 token to collect the essence.
- `CollectPermissionMw` - Users can collect the essence only if they have a valid signature from the signer.
- `CollectMerkleDropMw` - Users can only collect an essence using the correct merkle proof.
