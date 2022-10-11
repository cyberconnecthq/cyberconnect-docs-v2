---
id: create-essence-nft
title: Create Essence NFT
slug: /how-to/build-nft-sbt-platform/create-essence-nft
sidebar_label: Create Essence NFT
sidebar_position: 4
description: How to Build NFT/SBT platform - Create Essence NFT
---

In order to Create an Essence NFT, you will actually be implementing the steps described in the [Register Essence](/guides/mutation/register-essence) section.

## Workflow

![how-to-build-nft-sbt-create-essence.gif](/gif/how-to-build-nft-sbt-create-essence.gif)

## GraphQL mutations

As previously mentioned, you will Register an Essence. To do so, you need to write the GraphQL mutations required for it:

1. first mutation is to format data so that the user can sign data in a readable format:

```jsx title="/src/graphql/CreateRegisterEssenceTypedData.ts"
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

2. second mutation is to call the `relay` that will broadcast the transaction and create the Essence NFT:

```jsx title="/src/graphql/Relay.ts"
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

## Metadata schema

:::info

The underlying difference between a Non-fungible token (NFT) and a Soulbound token (SBT) is that the SBT is a **non-transferable token**.

:::

The **metadata schema** contains all the fields that make up the minted NFT/SBT. In other words, it holds data used to display the Essence NFT in your app and it is customized by the user based on the user's input.

The schema can be slipt into 3 main parts:

1. The first part follows the [Opensea Metadata Standard](https://docs.opensea.io/docs/metadata-standards).

2. The second part we entitled it **CyberConnect Metadata Schema** and this is common for all Essence NFTs.

3. The third part consists of a couple of fields that are specific to SBTs.

In this example you will creating a SBT which means that the `metadata` will contain the _required_ fields specific to SBTs:

-   `holder` is the user's handle;
-   `issuer` is the address that created it;

A couple of things to note, like setting the correct `type` as `SBT` for it (useful for indexing) and pass the `transferable` param as `false` since, as previously mentioned, SBTs are non-transferable tokens.

```jsx
const metadata = {
    // Opensea standard schema
    image: "https://gateway.pinata.cloud/ipfs/QmNcqSpCvhiyHocUaVf7qB8qwEGerSpnELeAi567YEraYm", // string (required, only optional if `animation_url` has value)
    image_data: "",
    description: `SBT of @${handle}`, // string (optional)
    name: `@${handle} SBT`, // string (required)
    attributes: [], // array (required)
    animation_url: "", // string (required, only optional if `image` has value)
    external_url: "", // string (optional)
    background_color: "", // string (optional)
    youtube_url: "", // string (optional)

    // CyberConnect schema
    media: [], // (required, empty array for SBT)
    version: "1.0.0", // string (required)
    appId: DEMO_APP_ID, // string (required)
    locale: "en", // string (optional)
    type: "SBT", // "PUBLICATIONS" | "SBT" (optional, default is `PUBLICATIONS`)
    issued_date: new Date(), // string (required)

    // Specific to SBT
    holder: `@${handle}`, // string (required)
    issuer: address, // string (required)
    venue: "", // string (optional) e.g. Discord, Twitter etc.
};
```

## Create Essence NFT

Now that we've covered the Metadata schema, what is left to do is to put all logic into a `CreateEssenceNFTBtn` component. Once the button is clicked, it will compute the `tokenURI` as a `base64` string and call both `createRegisterEssenceTypedData` and `relay` APIs.

```jsx title="/src/components/CreateEssenceNFTBtn.tsx"
import { Web3Provider } from "@ethersproject/providers";
import { useMutation } from "@apollo/client";
import { CREATE_REGISTER_ESSENCE_TYPED_DATA, RELAY } from "../graphql";

const DEMO_CHAIN_ID = 5; // Goerli Test Network
const DEMO_NAMESPACE = "CyberConnect";
const DEMO_APP_ID = "CyberConnect";
const DEMO_OPERATOR_MW_CONTRACT = "0x0000000000000000000000000000000000000000";

function CreateEssenceNFTBtn({
    provider,
    handle,
    profileID,
    setEssenceID,
    disabled,
}: {
    provider: Web3Provider | null,
    handle: string,
    profileID: number,
    setEssenceID: (essenceID: number) => void,
    disabled: boolean,
}) {
    const [createRegisterEssenceTypedData] = useMutation(
        CREATE_REGISTER_ESSENCE_TYPED_DATA
    );
    const [relay] = useMutation(RELAY);

    const handleOnClick = async () => {
        try {
            // Check for the provider
            if (!provider) {
                throw Error("No provier detected.");
            }

            // Check for the chain id
            const network = await provider.getNetwork();
            const chainID = network.chainId;

            if (chainID !== DEMO_CHAIN_ID) {
                throw Error("Wrong chain.");
            }

            // Construct metadata for SBT
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const metadata = {
                // Opensea standard schema
                image: "https://gateway.pinata.cloud/ipfs/QmNcqSpCvhiyHocUaVf7qB8qwEGerSpnELeAi567YEraYm", // string (required, only optional if `animation_url` has value)
                image_data: "",
                description: `SBT of @${handle}`, // string (optional)
                name: `@${handle} SBT`, // string (required)
                attributes: [], // array (required)
                animation_url: "", // string (required, only optional if `image` has value)
                external_url: "", // string (optional)
                background_color: "", // string (optional)
                youtube_url: "", // string (optional)

                // CyberConnect schema
                media: [], // (required, empty array for SBT)
                version: "1.0.0", // string (required)
                appId: DEMO_APP_ID, // string (required)
                locale: "en", // string (optional)
                type: "SBT", // "PUBLICATIONS" | "SBT" (optional, default is `PUBLICATIONS`)
                issued_date: new Date(), // string (required)

                // Specific to SBT
                holder: `@${handle}`, // string (required)
                issuer: address, // string (required)
                venue: "", // string (optional) e.g. Discord, Twitter etc.
            };

            // Construct tokenURI as string
            const tokenURI = `data:application/json;base64,${Buffer.from(
                JSON.stringify(metadata),
                "binary"
            ).toString("base64")}`;

            // Collect input
            const name = prompt("SBT name:") || "Demo SBT";
            const symbol = prompt("SBT symbol:") || "SBT";

            // Create typed data
            const typedDataResult = await createRegisterEssenceTypedData({
                variables: {
                    input: {
                        options: {
                            namespaceName: DEMO_NAMESPACE,
                            chainID: chainID,
                        },
                        profileID: profileID,
                        name: name,
                        symbol: symbol,
                        tokenURI: tokenURI,
                        mwContract: DEMO_OPERATOR_MW_CONTRACT,
                        transferable: false, // SBTs are non-transferable
                    },
                },
            });

            const typedData =
                typedDataResult.data?.createRegisterEssenceTypedData?.typedData;
            const message = typedData.data;
            const typedDataID = typedData.id;

            // Get signature for typed data
            const fromAddress = address;
            const params = [fromAddress, message];
            const method = "eth_signTypedData_v4";
            const signature = await signer.provider.send(method, params);

            // Relay
            const relayResult = await relay({
                variables: {
                    input: {
                        typedDataID: typedDataID,
                        signature: signature,
                    },
                },
            });
            const txHash = relayResult.data?.relay?.relayTransaction?.txHash;

            console.log("~~ Tx hash ~~");
            console.log(txHash);

            // Update state for essenceID
            // First Essence NFT created will start at 1. Second Essence NFT will have the essenceID 2, etc.
            setEssenceID(1);

            alert(`Successfully created the SBT!`);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    };

    return (
        <button onClick={handleOnClick} disabled={disabled}>
            Create Essence NFT
        </button>
    );
}

export default CreateEssenceNFTBtn;
```

The `relay` will return as a reponse the `txHash` that you can verify on [goerli.etherscan.io](https://goerli.etherscan.io/) to check that the SBT was indeed created!

Well done! Next up, you will learn how to implement the [Collect an Essence NFT](/how-to/build-nft-sbt-platform/collect-essence-nft) functionality.
