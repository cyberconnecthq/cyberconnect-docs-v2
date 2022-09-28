---
id: collectessencenft
title: Collect Essence NFT
slug: /how-to/build-a-nft-sbt-platform/collect-essence-nft
sidebar_label: Collect Essence NFT
sidebar_position: 5
description: How to Build a NFT/SBT platform - Collect Essence NFT
---

In order to allow the user to Collect an Essence NFT, you will actually be implementing the steps described in the [Collect Essence](/guides/mutation/collect-essence) section.

## Workflow

![how-to-build-nft-sbt-collect-essence.gif](/gif/how-to-build-nft-sbt-collect-essence.gif)

## GraphQL mutations

By now you should be familiar with this process and know that you'll need to write the GraphQL mutations for the Collect Essence steps:

1. first mutation is to format data so that the user can sign data in a readable format:

```jsx title="/src/graphql/CreateCollectEssenceTypedData.ts"
import { gql } from "@apollo/client";

export const CREATE_COLLECT_ESSENCE_TYPED_DATA = gql`
    mutation CreateCollectEssenceTypedData(
        $input: CreateCollectEssenceTypedDataInput!
    ) {
        createCollectEssenceTypedData(input: $input) {
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

2. second mutation is to call the `relay` that will broadcast the transaction and mint the Essence NFT:

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

## Collect Essence NFT

With our GraphQL mutations prepared, the final step is to create the `CollectEssenceNFTBtn` component. Once the button is clicked, it will call both `createCollectEssenceTypedData` and `relay` APIs.

```jsx title="src/components/CollectEssenceNFTBtn.tsx"
import { Web3Provider } from "@ethersproject/providers";
import { useMutation } from "@apollo/client";
import { CREATE_COLLECT_ESSENCE_TYPED_DATA, RELAY } from "../graphql";

const DEMO_CHAIN_ID = 5; // Goerli Test Network
const DEMO_NAMESPACE = "CyberConnect";

function CollectEssenceNFTBtn({
    provider,
    profileID,
    essenceID,
    disabled,
}: {
    provider: Web3Provider | null,
    profileID: number,
    essenceID: number,
    disabled: boolean,
}) {
    const [createCollectEssenceTypedData] = useMutation(
        CREATE_COLLECT_ESSENCE_TYPED_DATA
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

            const signer = provider.getSigner();
            const address = await signer.getAddress();

            // Create typed data
            const typedDataResult = await createCollectEssenceTypedData({
                variables: {
                    input: {
                        options: {
                            namespaceName: DEMO_NAMESPACE,
                            chainID: chainID,
                        },
                        collector: address,
                        profileID: profileID,
                        essenceID: essenceID,
                    },
                },
            });

            const typedData =
                typedDataResult.data?.createCollectEssenceTypedData?.typedData;
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

            alert(`Successfully collected the SBT!`);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    };

    return (
        <button onClick={handleOnClick} disabled={disabled}>
            Collect Essence NFT
        </button>
    );
}

export default CollectEssenceNFTBtn;
```

The `relay` will return as a reponse the `txHash` that you can verify on [goerli.etherscan.io](https://goerli.etherscan.io/) to check that the SBT was indeed collected!

Awsome job, you've completed the guide! Now you can build your own NFT/SBT issuing platform. Be as creative as possible and don't forget to share your work with our community on [Discord](https://discord.com/invite/cUc8VRGmPs)!
