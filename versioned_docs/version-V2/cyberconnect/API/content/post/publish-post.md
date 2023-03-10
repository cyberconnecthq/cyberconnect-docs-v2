---
id: publish-post
title: Publish post
slug: /api/content/publish-post
sidebar_label: Publish post
sidebar_position: 1
description: Publish post
---

## SDK

### Installation

```sh
npm install @cyberlab/cyberconnect-v2
or
yarn add @cyberlab/cyberconnect-v2
```

### Init CyberConnect

```ts
import CyberConnect, {
  Env
} from '@cyberlab/cyberconnect-v2';

const cyberConnect = new CyberConnect({
  appId: 'cyberconnect',
  namespace: 'CyberConnect',
  env: Env.Production,
  provider: provider,
  signingMessageEntity: 'CyberConnect' || your entity,
});
```

- `appId` - Your application id, can be any string less than 128 characters.
- `namespace` - Your application name.
- `env` - (optional) Env decides the endpoints. Now we have `staging` and `production`. (The default value is `Env.Production`).
- `provider` - The corresponding provider of the given chain.
- `signingMessageEntity` - (optional) Use to describe the entity users sign their message with. Users will see it when authorizing in the wallet `I authorize ${signingMessageEntity} from this device using signing key:`. The default entity is `CyberConnect`.

### Creating post

```ts
cyberConnect.createPost(content);
```

**Parameters**

- `content: Content` - post content

```ts
interface Content {
  title: string;
  body: string;
  author: string; // The ccProfile handle of the author
}
```

**Return**

- `response: PublishResponse` - publish response

```ts
type PublishResponse = {
  status: Status;
  contentID: string;
  arweaveTxHash: string;
  tsInServer: number;
};

enum Status {
  SUCCESS,
  INVALID_PARAMS,
  RATE_LIMITED,
  HANDLE_NOT_FOUND,
  CONTENT_NOT_FOUND,
  TARGET_NOT_FOUND,
  NOT_PROFILE_OWNER,
  ALREADY_EXISTED,
  INVALID_MESSAGE,
  INVALID_SIGNATURE,
  MESSAGE_EXPIRED,
  INVALID_SIGNING_KEY,
}
```

### Updating post

```ts
cyberConnect.updatePost(id, content);
```

**Parameters**

- `id: string` - published post id
- `content: Content` - new post content

```ts
interface Content {
  title: string;
  body: string;
  author: string; // The ccProfile handle of the author
}
```

**Return**

- `response: PublishResponse` - publish response

```ts
type PublishResponse = {
  status: Status;
  contentID: string;
  arweaveTxHash: string;
  tsInServer: number;
};

enum Status {
  SUCCESS,
  INVALID_PARAMS,
  RATE_LIMITED,
  HANDLE_NOT_FOUND,
  CONTENT_NOT_FOUND,
  TARGET_NOT_FOUND,
  NOT_PROFILE_OWNER,
  ALREADY_EXISTED,
  INVALID_MESSAGE,
  INVALID_SIGNATURE,
  MESSAGE_EXPIRED,
  INVALID_SIGNING_KEY,
}
```

## Direct API Calling

You can also choose to call the publish post API directly which involves three parts:

1. Signing Key Management
2. Signing Key Registration
3. Signing Operation

---

### Signing Key Management

The publish post API accepts two parameters `contentID` and `input`, the `contentID` is for updating published post, the `input` has three properties `message`, `signature` and `signingKey` which requires a locally generated signing key pair to perform the sign operation.

Generating Signing Key

JavaScript has a native crypto API called `window.crypto`, by using `window.crypto.subtle.generateKey`, we can get the expected signing key pair, for the publish post API, we need an ECDSA key pair with `P-256` named curve. you can read the complete API usage [here](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey).

```ts
async function generateSigningKey(address: string) {
  const algorithm = {
    name: "ECDSA",
    namedCurve: "P-256",
  };
  const extractable = false;
  const keyUsages: KeyUsage[] = ["sign", "verify"];

  const signingKey = await window.crypto.subtle.generateKey(
    algorithm,
    extractable,
    keyUsages
  );

  return signingKey;
}
```

Storing Signing Key

For key storage, we follow the W3C specification [recommended solution](https://w3c.github.io/webcrypto/#concepts-key-storage) using the Indexed Database API, you can use [idb](https://www.npmjs.com/package/idb?activeTab=readme) to interact with IndexedDB which is more DX-friendly.

```ts
// A simple example with idb

import { openDB } from "idb";

let dbPromise: any = null;

if (typeof window !== "undefined" && typeof window.indexedDB !== "undefined") {
  dbPromise = openDB("CyberConnect", 1, {
    upgrade(db) {
      db.createObjectStore("store");
    },
  });
}

async function get(key: string) {
  if (dbPromise) {
    return (await dbPromise).get("store", key);
  }

  return;
}

async function set(key: string, val: CryptoKeyPair) {
  if (dbPromise) {
    return (await dbPromise).put("store", val, key);
  }

  return;
}

async function clear() {
  return (await dbPromise).clear("store");
}

// Save signing key
// We're using address as the key to make the signing key address-specific
set(address, signingKey);
```

---

### Signing Key Registration

After generating a signing key successfully, you need to authorize it which means making users sign a message with the public key in it, and then pass the signature to `registerSigningKey` to complete the registration.

Getting the Public Key

To get the public key from the signing key, first, you need to extract the signing key from the IndexDB, then call `window.crypto.subtle.exportKey` with `spki` format, this returns an array buffer, to get the expected PEM-encoded format like this:

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3j+HgSHUnc7F6XzvEbD0
r3M5JNy+/kabiJVu8IU1ERAl3Osi38VgiMzjDBDOrFxVzNNzl+SXAHwXIV5BHiXL
CQ6qhwYsDgH6OqgKIwiALra/wNH4UHxj1Or/iyAkjHRR/kGhUtjyVCjzvaQaDpJW
2G+syd1ui0B6kJov2CRUWiPwpff8hBfVWv8q9Yc2yD5hCnykVL0iAiyn+SDAk/rv
8dC5eIlzCI4efUCbyG4c9O88Qz7bS14DxSfaPTy8P/TWoihVVjLaDF743LgM/JLq
CDPUBUA3HLsZUhKm3BbSkd7Q9Ngkjv3+yByo4/fL+fkYRa8j9Ypa2N0Iw53LFb3B
gQIDAQAB
-----END PUBLIC KEY-----
```

we also need two extra steps:

1. Covert the array buffer to string
2. Encode the string to base64

```ts
async function getPublicKey(address: string) {
  // 1.Getting the signing key from IndexDB
  const signingKey = await getSigningKey(address);

  // 2.Export the public key
  const exported = await window.crypto.subtle.exportKey(
    "spki",
    signingKey.publicKey
  );

  // 3. Convert to PEM-encoded format
  return window.btoa(arrayBuffer2String(exported));
}
```

Getting Signing Key Signature

After exporting the public key, you need to use this public key to compose a sign message which consists of two parts: `acknowledgment` and `publicKey`, in the `acknowledgment`, you can change the singing message entity which is _CyberConnect_ by default.

```ts
const publicKey = await getPublicKey(this.address);

const acknowledgement = `I authorize ${
  signingMessageEntity || "CyberConnect"
} from this device using signing key:\n`;

const message = `${acknowledgement}${publicKey}`;
```

Let users sign this message with their wallets, you'll get a signing key signature, pass this signature along with the `message` and signer's address to `registerSigningKey`, if the response status is `SUCCESS`, then it indicates the whole signing key registration is completed, you can use this signing key to perform operations like follow, like, publish post and comment content.

![register-signing-key](/img/v2/register-signing-key.png)

### Signing Operation

Once the signing key gets registered, you can use it to publish post without any external wallet operation needed. To publish a post with the signing key, you need to call `createPublishPostTypedMessage` to get the typed message, sign the message and then pass the signature and other required parameters to `publishPost`.

Get typed post message

```ts
const input = {
  address: this.address,
  handle: this.getHandleWithoutSuffix(content.author),
  title: content.title,
  body: content.body,
} as const;

const res = await createPublishPostTypedMessage(
  input,
  this.endpoint.cyberConnectApi
);

const message = res.data.createPublishPostTypedMessage.message;
```

![typed-post-message](/img/v2/typed-post-message.png)

How to sign a message with the signing key

```ts
async function signWithSigningKey(input: string, address: string) {
  const signingKey = await getSigningKey(address);
  const algorithm = {
    name: "ECDSA",
    hash: {
      name: "SHA-256",
    },
  };
  const enc = new TextEncoder();
  const encodedMessage = enc.encode(input);

  const signature = await window.crypto.subtle.sign(
    algorithm,
    signingKey.privateKey,
    encodedMessage
  );

  return arrayBuffer2Hex(signature);
}
```

Use the signing key to sign the post message

```ts
const signature = await signWithSigningKey(message, this.address);
```

Publish post

```ts
const publicKey = await getPublicKey(this.address);

const params = {
  contentId: undefined, // undefined for new post, contentId for updating post
  input: {
    authorAddress: "0x0000000...",
    message: stringifiedMessage,
    signature,
    signingKey: publicKey,
    authorHandle: "test",
  },
};

await publishPost(params, this.endpoint.cyberConnectApi);
```

![publish-post](/img/v2/publish-post.png)

## Verifying the proof

After creating or updating a post successfully, you can use `arweaveTxHash` to verify the proof, go to `https://arweave.app/tx/${arweaveTxHash}`.
