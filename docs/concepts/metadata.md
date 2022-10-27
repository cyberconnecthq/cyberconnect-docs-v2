---
id: metadata
title: Metadata
slug: /concepts/metadata
sidebar_label: Metadata
sidebar_position: 6
description: Major Concepts of CyberConnect
---


# Essence Metadatas

To parse and index the essence metadata correctly, we have our eesence metadata as following. Our metadata standard supports OpenSea and other marketplaces. Please reach out to us if you have any questions or having any suggestions to keep refining our metadata standard. 
```json
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

interface Metadata {
    /* ~~ REQUIRED ~~ */

    /* Version of the metadata schema used for the issued item. Only support 1.0.0 for now. */
    version: string;

    /* ~~ OPTIONAL ~~ */
    /* Id of the application under which the items are being minted. */
    app_id?: string;

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
