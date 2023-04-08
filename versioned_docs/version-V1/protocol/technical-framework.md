---
id: technical-framework
title: Technical Framework
slug: /protocol/technical-framework/
sidebar_label: Technical Framework
sidebar_position: 1
description: At its core, CyberConnect is a tamper-proof data structure that efficiently facilitates creation, update, query, and verification of user-centric data.
---

## Storage

At its core, CyberConnect is a tamper-proof data structure that efficiently facilitates creation, update, query, and verification of user-centric data.

Each piece of user-centric data is represented as a data stream where updates are only allowed by the data owner. Each update to the data is appended to the data stream in the form of an append-only commit log and the resulting data structure becomes a hash linked data structure called a Merkle DAG. To provide data authenticity, we utilize dag-jose IPLD codec so that each piece of data, whether the creation file or the individual updates is signed and optionally encrypted by the data owner. Before appending a new commit to the data stream, an authorization check is performed to ensure that only the data owner could append new updates. After the custom IPLD encoding, the data is safely stored in IPFS to provide content addressed lookup and data integrity. By this design, each user's [social graph](/V1/concepts/social-graph/) is only modifiable by the user, readable to applications with proper decryption permission given by the user, and verifiable by the signature attached.

We partner with Ceramic for our first release based on their implementation of such a mutable data stream storage system on top of IPFS. Further performance improvements will be achieved by writing a heavy data model.

Data availability among nodes is achieved through libp2p pubsub so that as long as one node subscribed to the pubsub topic has the needed commit log, data will be available for query among all the nodes.

Long-term data retention is guaranteed through Ceramic's blockchain anchoring and our custom data pinning service.

## Authentication and Authorization

To fully give back to users' data ownership, we have to first sort out authentication and authorization. The authentication of users simply means to verify if they are who they claim to be and this is easily achieved by a signature using a user's private key. The authorization of user data means that only the user has the access to write their own data and no other central party like Facebook could modify anyone's data. Authorization is done with the help of pre-commit checks and dag-jose IPLD encoding to ensure correct signing after commit.

Given these two requirements on authentication and authorization, we designed a safe keychain scheme for Authentication and Authorization based on a public-key system (asymmetric key pairs). Firstly, users should not sign any non-transactional data with their blockchain private key. Signing with a blockchain private key presents an extra hurdle to user experience and broadens the attack surface. Thus, we need to generate key pairs with ed25519 curve from the entropy of a blockchain wallet signature on the client side. The private key is generated inside a protected iframe and exposed to applications only through RPC to prevent xss attacks.
The key pairs are then later encrypted with the user's existing keychain private key (blockchain private key if keychain private key is not existent) and stored in the specific data stream for a keychain. The keychain data stream is authorized and protected through a key rotation scheme combined with blockchain anchoring to resolve conflicts.

## User-centric User Tables

IPFS storage has a common centralization concern about CIDs being stored in a centralized server. This raises the problem of data authenticity where a central server could swap out the real user-created data with fake ones by changing the CID. As mentioned above, we do enforce data signature with dag-jose codec so that data authenticity is guaranteed.
To look up a certain user's social graph, we first need to look up the keychain of the user through their blockchain address. Then we could look up the user table through the keychain public key. In contrast to an application-centric design in Web2, where each application stores some information about the user and information like name and avatar are duplicated across applications, in our design, a single user table for each user contains all the information needed and could be used across all applications. By putting all the social graph information inside one user table, only that user has the permission to update any data involved and only the parties that have been given the decryption key could read the data inside if encrypted.

## Data Indexer

Similar to how thegraph indexes transactional data on Ethereum, all social graph data on top of CyberConnect welcome data indexers. On CyberConnect, social graph data is stored as unilateral [connections](/V1/concepts/connection/). For example, if Alice follows Bob, Alice would add Bob to her own following list. However, Alice could not modify Bob's follower list due to limited access. Thus, we only store the following list inside the user table but not a follower list. Any indexer could easily retrieve such following list and recover a counter-party follower list and provide such data for easier application queries. We would first rollout an indexer for the aforementioned follower list use case (stored in computed index) and welcome our community to take up other interesting data indexing opportunities. Any user with some technical skills could verify the validity of a computed index and a more sophisticated system involving slashing could be developed in the future.

## Node

A node must provide the following functionalities to maintain such a decentralized social graph:

<ol>
    <li>A Ceramic node including a custom IPFS daemon with dag-jose IPLD encoding. This handles all the keychain authenticated data stream creation and update. It also maintains the desired data availability through libp2p and IPFS data pinning service, and stream data consensus with blockchain anchoring.</li>
    <li>An RPC endpoint that exposes the data stream.</li>
    <li>A data indexer that provides reverse lookups and data aggregation. To generate a reverse "follower list" based on unidirectional following connection.</li>
</ol>
