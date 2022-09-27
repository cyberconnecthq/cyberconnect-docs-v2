---
id: middleware
title: Middleware
slug: /concepts/middleware
sidebar_label: Middleware
sidebar_position: 4
description: Major Concepts of CyberConnect
---

To enable dynamic rules involved in profile creation, collecting contents and paid subscription, CyberConnect protocol provides various middlewares. There are three types of middlewares, `ProfileMiddleware`, `CollectMiddleware` and `SubscribeMiddleware`. They are smart contracts with logic executed before and after `profile creation`, `collect` and `subscribe` happens.

<!-- Currently we support `PaidCollect` and `PaidSubscirbe` where users need to pay ERC20 token to collect a content or subscribe to a profile. We also support `PermissionedCollect` where the creator of the content specifies a whitelist. -->

# Supported Middlewares

## Profile Middleware

- `PermissionedFeeCreationMw` - The namespace owner sets a tier fee for profile creation.

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
