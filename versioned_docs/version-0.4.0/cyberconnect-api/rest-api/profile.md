---
id: profile
title: Profile
slug: /cyberconnect-api/rest-api/profile/
sidebar_label: Profile
sidebar_position: 1
description: Profile API is used for querying the ENS profile metadata of an Ethereum address or ENS name.
---

Profile API is used for querying the ENS profile metadata of an Ethereum address or ENS name. For an address’s avatar, you can retrieve its record, type, metadata, ownership, and URL among other relevant information.

## Structure

The endpoint URL for requesting the profile:

```curl
https://cyberprofile-v2.vercel.app/api/profile/{id}
```

| Field | Type   | Description                                                    |
| ----- | ------ | -------------------------------------------------------------- |
| `id`  | String | Get the profile metadata of this Ethereum address or ENS name. |

With correct inputs, you can retrieve a list of `Profile` objects with the following fields:

| Field         | Type      | Description                                                         |
| ------------- | --------- | ------------------------------------------------------------------- |
| `address`     | String    | Ethereum address.                                                   |
| `name`        | String    | The same as primaryName unless query was made with non-primary ENS. |
| `primaryName` | String    | The primary ENS name/reverse record of the address.                 |
| `ensAvatar`   | EnsAvatar | Metadata about the ENS avatar of this address.                      |

The `ensAvatar` field consists of the following subfields:

| Field        | Type    | Description                                                                                                          |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `record`     | String  | The original avatar text record set in ENS.                                                                          |
| `type`       | String  | The type of ENS avatar with options of uri:https, uri:data, uri:ipfs, nft:erc721, and nft:erc1155.                   |
| `nftMedata`  | String  | The metadata JSON of the avatar NFT.                                                                                 |
| `nftOwner`   | String  | If the avatar is of type nft:erc721, then this field returns its owner.                                              |
| `nftBalance` | String  | If the avatar is of type nft:erc1155, then this field returns the balance of the avatar NFT owned by the ENS holder. |
| `nftOwned`   | Boolean | Whether the ENS holder owns the avatar NFT.                                                                          |
| `url`        | String  | The avatar NFT image’s url.                                                                                          |

## Example

<<<<<<< HEAD
Here is an example of querying ENS profile information. Feel free to test it out in [Next Swagger Doc Demo App](https://cyberprofile-v2.vercel.app/)!

````curl
https://cyberprofile-v2.vercel.app/api/profile/pisofa.eth
=======
Here is an example of querying ENS profile information. Feel free to test it out in [Next Swagger Doc Demo App](https://cyberprofile.vercel.app/)!

```html
https://cyberprofile.vercel.app/api/profile/pisofa.eth
>>>>>>> c35ed72 (docs: generated v0.4.0)
````

Find below the example return results:

```json
{
  "address": "0xeBeD0BF2701e905b4C576B3dC943D797bAc226ed",
  "name": "pisofa.eth",
  "primaryName": "pisofa.eth",
  "ensAvatar": {
    "record": "eip155:1/erc721:0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B/11850",
    "type": "nft:erc721",
    "nftMetadata": "{\"name\":\"CloneX #18924\",\"description\":\"🧬 CLONE X 🧬\\n\\n20,000 next-gen Avatars, by RTFKT and Takashi Murakami 🌸\\n\\nIf you own a clone without any Murakami trait please read the terms regarding RTFKT - Owned Content here: https://rtfkt.com/legal-2A\\n\\nYou are also entitled to a commercial license, please read the terms to that here: https://rtfkt.com/legal-2C\",\"attributes\":[{\"trait_type\":\"DNA\",\"value\":\"Human\"},{\"trait_type\":\"Eye Color\",\"value\":\"BLU\"},{\"trait_type\":\"Hair\",\"value\":\"BLU Curtains\"},{\"trait_type\":\"Clothing\",\"value\":\"BLCK VARSITY JCKT\"},{\"trait_type\":\"Mouth\",\"value\":\"ROBO\"}],\"image\":\"https://clonex-assets.rtfkt.com/images/11850.png\"}",
    "nftOwner": "0xeBeD0BF2701e905b4C576B3dC943D797bAc226ed",
    "nftBalance": null,
    "nftOwned": true,
    "url": "https://clonex-assets.rtfkt.com/images/11850.png"
  }
}
```
