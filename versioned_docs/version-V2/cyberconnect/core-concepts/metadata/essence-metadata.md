---
id: essence-metadata
title: Essence Metadata
slug: /core-concepts/metadata/essence-metadata
sidebar_label: Essence Metadata
sidebar_position: 2
description: Major Concepts of CyberConnect
---

# Essence Metadata

The Essence Metadata Schema acts as a standard template that is being used to store data about the Essence NFT. This metadata schema was created to ensure proper parsing and indexing of the Essence NFT.

:::tip

[Verify Essence Metadata](/guides/query/verify-essence-metadata) allows you to verify the validity of an essence's metadata schema.

:::

The Essence Metadata Schema follows the [OpenSea Metadata Standards](https://docs.opensea.io/docs/metadata-standards) which means that the Essence NFT is supported by OpenSea and other marketplaces.

Below you will find the list of fields for the Essence Metadata Schema accompanied by a short description on what each field represents.

```tsx
interface Media {
  /* The MIME type for the media */
  media_type: string;
  /* The URL link for the media */
  media_url: string;
  /* Alternative text when media can't be rendered */
  alt_tag?: string;
  /* The preview image for the media */
  preview_image_url?: string;
}

interface Attribute {
  /* Field indicating how you would like it to be displayed */
  /* optional if the trait_type is string */
  display_type?: string;
  /* Name of the trait */
  trait_type: string;
  /* Value of the trait */
  value: number | string;
}

interface EssenceMetadata {
  /* ~~ REQUIRED ~~ */
  /* Unique id for the issued item */
  metadata_id: string;

  /* Version of the metadata schema used for the issued item. Only support 1.0.0 for now. */
  version: string;

  /* Id of the application under which the items are being minted. */
  app_id: string;

  /* ~~ OPTIONAL ~~ */
  /* Language of the content as a BCP47 language tag. */
  lang?: string;

  /* Creation time of the item as ISO 8601. */
  issue_date?: string;

  /* The content associated with the item */
  content?: string;

  /* Media refers to any image, video, or any other MIME type attached to the content.
    Limited to max. 10 media objects. */
  media?: Media[];

  /* Field indicating the tags associated with the content. Limited to max. 5 tags. */
  tags?: string[];

  /* ~~ OPENSEA (optional) ~~ */
  /* URL to the image of the item. */
  image?: string;

  /* SVG image data when the image is not passed. Only use this if you're not
    including the image parameter. */
  image_data?: string;

  /* Name of the item. */
  name?: string;

  /* Description of the item. */
  description?: string;

  /* URL to a multi-media attachment for the item. */
  animation_url?: string;

  /* Attributes for the item. */
  attributes?: Attribute[];

  /* URL to the item on your site. */
  external_url?: string;
}
```
