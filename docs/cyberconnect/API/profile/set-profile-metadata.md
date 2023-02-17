---
id: set-profile-metadata
title: Set profile metadata
slug: /api/profile/set-profile-metadata
sidebar_label: Set profile metadata
sidebar_position: 3
description: Set profile metadata
---

To set the metadata of a profile you need to follow 5 steps:

- [Upload the metadata to IPFS](#upload-the-metadata-to-ipfs)
- [Create typed data with the CID](#create-typed-data-with-the-cid)
- [Sign typed data](#sign-typed-data)
- [Relay the action](#relay-the-action)
- [Check relay result](#check-relay-result)

:::tip
CyberConnect covers the transaction fee for this operation every 3 days for each user.
:::

## Upload the metadata to IPFS

Follow the metadata schema to construct the right data structure, each field of it is modifiable, however, we strongly recommend keeping `handle` and `version` unchanged, `handle` should be the same as the handle of the profile, `version` represents the version of current schema.

**Profile Metadata Schema**

```ts
type Attribute = {
  display_type: string;
  trait_type: string;
  value: string;
};

type ProfileMetadata = {
  handle: string;
  display_name: string;
  bio: string;
  avatar: string;
  cover_image: string;
  attributes: Attribute[];
  version: string;
};
```

**Pin to IPFS**

There're many different ways to upload/pin data to IPFS, we use Pinata here, check their doc for detailed usage.

```ts
const pinJSONToIPFS = async (json: ProfileMetadata) => {
  const data = JSON.stringify(json);
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  return axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecret,
      },
    })
    .then((response) => response.data.IpfsHash)
    .catch((error) => {
      throw error;
    });
};

const CID = await pinToIPFS(updatedMetadata);
```

## Create typed data with the CID

After uploading the metadata to IPFS successfully, you need to call the `createSetMetadataTypedData` to get the corresponding typed data, you also need to save the typed data id in somewhere for later calling the `relay` API.

```ts
const [metadataTypedDataID, setMetadataTypedDataID] = React.useState("");

const createSetMetadataTypedData = async (cid: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      query: `
            mutation createSetMetadataTypedData($input: CreateSetMetadataTypedDataInput!) {
                  createSetMetadataTypedData(input: $input) {
                    typedData {
                      id
                      data
                      sender
                    }
                  }
                }

			`,
      variables: {
        input: {
          metadata: cid,
          profileId: primaryProfile?.profileID,
        },
      },
    }),
  });

  const resData = await res.json();

  const typedData = resData.data.createSetMetadataTypedData.typedData;

  const typedDataID = typedData.id;
  setMetadataTypedDataID(typedDataID);

  return typedData;
};
```

## Sign typed data

In this step, you need to sign the typed data returned from `createSetMetadataTypedData`, we'll use [wagmi useSignTypedData](https://wagmi.sh/react/hooks/useSignTypedData) to perform the sign operation here.

```ts
import { useSignTypedData } from "wagmi";

const { data: signMetadataSignature, signTypedData } = useSignTypedData();

const parsed = JSON.parse(typedData.data);

signTypedData({
  domain: parsed.domain,
  types: parsed.types,
  value: parsed.message,
});
```

## Relay the action

After signing the typed data, you'll get a signature which is `signMetadataSignature` here, call `relay` API to broadcast the action, it'll return a relay action id.

```ts
const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "X-API-KEY": process.env.NEXT_PUBLIC_CYBERCONNECT_API_KEY,
  } as any,
  body: JSON.stringify({
    query: `
			mutation relay($input: RelayInput!) {
				relay(input:$input) {
					relayActionId
				}
			}
			`,
    variables: {
      input: {
        typedDataID,
        signature,
      },
    },
  }),
});

const resData = await res.json();
return resData?.data?.relay?.relayActionId;

const relayActionId = await relay(metadataTypedDataID, signMetadataSignature);
```

## Check relay result

Relay is an asynchronous operation which means it won't be successful immediately, you need to keep calling `relayActionStatus` to check the latest result, once it returns `txHash` is `SUCCESS`, the update action is completed.

```ts
const relayActionStatus = async (relayActionId: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "X-API-KEY": process.env.NEXT_PUBLIC_CYBERCONNECT_API_KEY,,
    },
    body: JSON.stringify({
      query: `query relayActionStatus($relayActionId: ID!) {
				relayActionStatus(relayActionId: $relayActionId){
                    ... on RelayActionStatusResult {
                    txHash
                    }
                    ... on RelayActionError {
                    reason
                    }
                    ... on RelayActionQueued {
                    reason
                    }
				}
			}
			`,
      variables: {
        relayActionId,
      },
    }),
  });

  const resData = await res.json();

  return resData.data.relayActionStatus;
};
```
