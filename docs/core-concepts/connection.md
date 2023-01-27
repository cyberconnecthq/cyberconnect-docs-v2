---
id: connection
title: Connection
slug: /concepts/connection
sidebar_label: Connection
sidebar_position: 3
description: Types of on & off-chain connections supported
---
Connections are at the fabric that weave together social graphs. Within CyberConnect,
a connection represents relationships between two [ccProfiles](/concepts/cc-profile). 

There are two forms of connections: **follow and subscribe**. 

## 1. Follow

Follow is the simplest form of unilateral connection where one ccProfile follows another ccProfile. This profile to profile following connection is represented as a ERC721 NFT on whichever EVM chain it's being deployed on. This is great for applications with light weight social graph needs like following another user’s wallet activity.

## 2. Subscribe

While `Follow` represents a simple directed relationship from one ccProfile to the other, `Subscribe` represent the a more composale relationship. Subscriptions include [middleware](/concepts/middleware), which can include arbitrary rules for subscription. For example, they could provide the ability to being subscribed to with payment attached. Each profile could specify the amount of token needed to pay for becoming a subscribers to that profile and subscribers will obtain a subscriber NFT. For more examples check out the next section on [Middlewares](/concepts/middleware).

:::tip 
The two base forms of connections can be used as building blocks for countless alternate connections, including paid subscriptions to a creator, bi-directional friend connections, belonging to an organization, and DAO governance roles, and whatever you can imagine.
:::