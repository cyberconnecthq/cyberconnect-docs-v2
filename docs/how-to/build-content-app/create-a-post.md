---
id: create-a-post
title: Create a Post
slug: /how-to/build-content-appcreate-a-post
sidebar_label: Create a Post
sidebar_position: 5
description: How to Build Content app - Create a Post
---

In this section you'll learn how to implement the [Register Essence](/guides/mutation/register-essence) functionality. We call _essence_ everything that is content and related to it. Yes, it's also a NFT. It can take the form a post, an article, a soulbound token (SBT) or something completely different that's up to your imagination.

You'll notice that the process is very to the one is described [Subscribe to profile](/how-to/build-content-app/subscribe-to-profile) but there is a small difference. When the user creates an essence, a non-fungible token (NFT) is created. The minting and transfer of that NFT is being executed in the _collect essence_ process to the user that collects it, which you'll learn all about in the upcoming section.

## GraphQL mutations

If you haven't already set the `ApolloClient` please go [Authentication](/how-to/build-content-app/authentication) to do so.

To register an essence, meaning to create a post in this example, is a two step process and requires two GraphQL mutations: `CreateRegisterEssenceTypedData` and `Relay`:

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

## Essence Metadata Schema

```tsx title="types.ts"
/* Metadata schema for Essence NFT */
export enum Version {
    V1 = "1.0.0",
}

export interface Media {
    /* The MIME type for the media */
    media_type: string;
    /* The URL link for the media */
    media_url: string;
    /* Alternative text when media can't be rendered */
    alt_tag?: string;
    /* The preview image for the media */
    preview_image_url?: string;
}

export interface IEssenceMetadata {
    /* ~~ REQUIRED ~~ */
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

    /* SVG image data when the image is not passed. Only use this if you're not including the image parameter. */
    image_data?: string;

    /* Name of the item. */
    name?: string;

    /* Description of the item. */
    description?: string;

    /* URL to a multi-media attachment for the item. */
    animation_url?: string;
}
```

## Create a Post

```tsx title="components/PostBtn.tsx"
try {
    /* Check if the user connected with wallet */
    if (!(provider && address)) {
        throw Error("Connect with MetaMask.");
    }

    /* Check if the has signed in */
    if (!accessToken) {
        throw Error("Youn need to Sign in.");
    }

    /* Check if the has signed up */
    if (!profileID) {
        throw Error("Youn need to Sign up.");
    }

    /* Check if the network is the correct one */
    await checkNetwork(provider);

    /* Function to render the svg data for the NFT */
    /* (default if the user doesn't pass a image url) */
    const svg_data = renderSVGData(post);

    /* Collect user input for NFT image */
    const nftImageURL = prompt("NFT image URL:");

    /* Create the metadata for the NFT */
    const metadata: IEssenceMetadata = {
        version: Version.V1,
        app_id: "cyberconnect",
        lang: "en",
        issue_date: new Date().toISOString(),
        content: post,
        media: [],
        tags: [],
        image: nftImageURL ? nftImageURL : "",
        image_data: !nftImageURL ? svg_data : "",
        name: `@${handle}'s post`,
        description: `@${handle}'s post on CyberConnect Content app`,
        animation_url: "",
    };

    /* Upload metadata to IPFS */
    const ipfsHash = await pinJSONToIPFS(metadata);

    /* Get the signer from the provider */
    const signer = provider.getSigner();

    /* Get the network from the provider */
    const network = await provider.getNetwork();

    /* Get the chain id from the network */
    const chainID = network.chainId;

    /* Create typed data in a readable format */
    const typedDataResult = await createRegisterEssenceTypedData({
        variables: {
            input: {
                options: {
                    chainID: chainID,
                },
                profileID: profileID,
                name: "Post",
                symbol: "POST",
                tokenURI: `https://cyberconnect.mypinata.cloud/ipfs/${ipfsHash}`,
                middleware: {
                    collectFree: true,
                },
                transferable: true,
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

    /* Log the transaction hash */
    console.log("~~ Tx hash ~~");
    console.log(txHash);

    /* Display success message */
    alert("Successfully created the post!");
} catch (error) {
    /* Display error message */
    alert(error.message);
}
```
