---
id: create-a-badge
title: Create a Badge
slug: /how-to/build-nft-sbt-platform/create-a-badge
sidebar_label: Create a Badge
sidebar_position: 4
description: How to Build Badge app - Create a Badge
---

In this section you'll learn how to implement the [Register Essence](/guides/mutation/register-essence) feature. We call _essence_ everything that is content and related to it. Yes, it's also a NFT. It can take the form of a badge, a post, or something completely different that's up to your imagination.

When the user creates an essence, a non-fungible token (NFT) is only being created. The minting and transferring of the NFT is being executed in the _collect essence_ process to the user that collects it, which you'll learn all about in the upcoming section.

We use the terms SBT and NFT interchangeably in this section because a SBT is still a NFT, the only difference being that is non-transferable. In this example the essence will take the form of a badge and will be issued as a SBT. Feel free to change this since these badges can be transferable or non-transferable.

:::info

The underlying difference between a Non-fungible token (NFT) and a Soulbound token (SBT) is that the SBT is a non-transferable token.

:::

## GraphQL mutations

To register an essence, meaning to create a badge for this example, is a two step process and requires two GraphQL mutations: `CreateRegisterEssenceTypedData` and `Relay`.

1. `CreateRegisterEssenceTypedData` is used to present data to the user in a readable format:

```tsx title="graphql/CreateSubscribeTypedData.ts"
import { gql } from "@apollo/client";

export const CREATE_REGISTER_ESSENCE_TYPED_DATA = gql`
    mutation CreateRegisterEssenceTypedData(
        $input: CreateRegisterEssenceTypedDataInput!
    ) {
        createRegisterEssenceTypedData(input: $input) {
            typedData {
                id
                chainID
                sender
                data
                nonce
            }
        }
    }
`;
```

2. `Relay` is responsible for broadcasting the transaction, minting and transferring the NFT:

```tsx title="graphql/Relay.ts"
import { gql } from "@apollo/client";

export const RELAY = gql`
    mutation Relay($input: RelayInput!) {
        relay(input: $input) {
            relayTransaction {
                id
                txHash
                typedData {
                    id
                    chainID
                    sender
                    data
                    nonce
                }
            }
        }
    }
`;
```

## Metadata Schema

You can think of the Essence Metadata Schema as a standard template used to store data related to content and the NFT holding that data.

You'll notice that some of the fields are following the [OpenSea Metadata Standards](https://docs.opensea.io/docs/metadata-standards) and this is to ensure that the NFT will be displayed properly on OpenSea and other marketplaces.

Below are all the fields for the Essence Metadata Schema accompanied by a short description on what they represent.

```tsx title="types.ts"
/* Metadata schema for Essence NFT */
export enum Version {
    V1 = "1.0.0",
}

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

export interface IEssenceMetadata {
    /* ~~ REQUIRED ~~ */
    /* Unique id for the issued item */
    metadata_id: string;

    /* Version of the metadata schema used for the issued item. */
    version: Version;

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

## Create a Badge

To create a badge means to [Register a Essence](/guides/mutation/register-essence) and the process for it does require the following steps:

1. Construct the metadata object for the Essence NFT;
2. Upload the metadata to IPFS to get the hash;
3. Get data in a readable format and the `typedDataID` for it;
4. Get the user to sign the message data and get its `signature`;
5. Call the `relay` and pass it the `typedDataID` and `signature`;

```tsx title="components/BadgeBtn.tsx"
/* Construct the metadata object for the Essence NFT */
const metadata: IEssenceMetadata = {
    metadata_id: uuidv4(),
    version: Version.V1,
    app_id: "cyberconnect",
    lang: "en",
    issue_date: new Date().toISOString(),
    content: "",
    media: [],
    tags: [],
    image: nftImageURL ? nftImageURL : "",
    image_data: !nftImageURL ? svg_data : "",
    name: `@${handle}'s event`,
    description: `@${handle}'s event on CyberConnect Badge app`,
    animation_url: "",
    external_url: "",
    attributes: [
        {
            display_type: "string",
            trait_type: "title",
            value: title,
        },
        {
            display_type: "date",
            trait_type: "date",
            value: Date.now(),
        },
        {
            display_type: "string",
            trait_type: "venue",
            value: venue,
        },
    ],
};

/* Upload metadata to IPFS */
const ipfsHash = await pinJSONToIPFS(metadata);

/* Create typed data in a readable format */
const typedDataResult = await createRegisterEssenceTypedData({
    variables: {
        input: {
            options: {
                /* The chain id on which the Essence NFT will be minted on */
                chainID: chainID,
            },
            /* The profile id under which the Essence is registered */
            profileID: profileID,
            /* Name of the Essence */
            name: "Event SBT",
            /* Symbol of the Essence */
            symbol: "SBT",
            /* URL for the json object containing data about content and the Essence NFT */
            tokenURI: `https://cyberconnect.mypinata.cloud/ipfs/${ipfsHash}`,
            /* Middleware that allows users to collect the Essence NFT for free */
            middleware: {
                collectFree: true,
            },
            /* Set if the Essence should be transferable or not */
            /* SBTs are non-transferable */
            transferable: false,
        },
    },
});
const typedData =
    typedDataResult.data?.createRegisterEssenceTypedData?.typedData;
const message = typedData.data;
const typedDataID = typedData.id;

/* Get the signature for the message signed with the wallet */
const fromAddress = await signer.getAddress();
const params = [fromAddress, message];
const method = "eth_signTypedData_v4";
const signature = await signer.provider.send(method, params);

/* Call the relay to broadcast the transaction */
const relayResult = await relay({
    variables: {
        input: {
            typedDataID: typedDataID,
            signature: signature,
        },
    },
});
const txHash = relayResult.data?.relay?.relayTransaction?.txHash;
```

A couple of things to note:

-   We used the `attributes` field to store information about the badge (or the event linked to it) and followed the [OpenSea Metadata Standards](https://docs.opensea.io/docs/metadata-standards) to ensure that it will display properly on marketplaces;

-   We passed as `middleware` the `collectFree` middleware to will allow users to collect the post for free. We won't dive into middlewares in this guide but you can always check out the [Middleware](/concepts/middleware) section;

-   We set `transferable` to `false` so that the NFT won't be transferable once it ends up in the user's wallet address;

If the registration of the essence (or badge in our case) was successful, you can verify the transaction hash on [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-badge-app-create-a-badge-tx.png)

![transaction hash](/img/v2/build-badge-app-create-a-badge-tx2.png)

Note that at this stage you are only registering the SBT. When a user collects a badge is when the SBT actually gets minted and transferred to the user's wallet address, which you'll learn all about in the next section [Collect a Badge](/how-to/build-badge-app/collect-a-badge).
