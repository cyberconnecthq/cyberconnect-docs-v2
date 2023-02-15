---
id: profile-metadata
title: Profile Metadata
slug: /core-concepts/metadata/profile-metadata
sidebar_label: Profile metadata
sidebar_position: 1
description: Profile metadata
---

# Profile Metadata

The Profile Metadata Schema acts as a standard template that is being used to store data about the Profile NFT. This metadata schema was created to ensure proper parsing and indexing of the Profile NFT.

```ts
type Attribute = {
  display_type: string;
  trait_type: string;
  value: string;
};

type ProfileMetadata = {
  handle: string;
  displayName: string;
  bio: string;
  avatar: string;
  coverImage: string;
  attributes: Attribute[];
  version: string;
};
```
