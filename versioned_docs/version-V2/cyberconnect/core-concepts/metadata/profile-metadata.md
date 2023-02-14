---
id: profile-metadata
title: Profile Metadata
slug: /core-concepts/metadata/profile-metadata
sidebar_label: Profile Metadata
sidebar_position: 1
description: Major Concepts of CyberConnect
---

# Profile Metadata

The Profile Metadata Schema acts as a standard template that is being used to store data about the Profile NFT. This metadata schema was created to ensure proper parsing and indexing of the Profile NFT.

Below you will find the list of fields for the Essence Metadata Schema accompanied by a short description on what each field represents.

```tsx

interface Attribute {
  /* Field indicating how you would like it to be displayed */
  /* optional if the trait_type is string */
  display_type?: string;
  /* Name of the trait */
  trait_type: string;
  /* Value of the trait */
  value: number | string;
}

interface ProfileMetadata {
  /* ~~ REQUIRED ~~ */
  /* Handle of the profile */
  handle: string;

  /* Version of the metadata schema used for the issued item. */
  version: string;

  /* Display name of the profile. */
  display_name: string;

  /* Avatar of the profile. */
  avatar: string;

  /* Cover image of the profile */
  cover_image: string;

  /* Attributes for the item. */
  attributes?: Attribute[];
}
```
