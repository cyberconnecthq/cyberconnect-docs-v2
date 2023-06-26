---
id: publish-comment
title: Publish comment
slug: /api/content/publish-comment
sidebar_label: Publish comment
sidebar_position: 1
description: Publish comment
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
  env: Env.PRODUCTION,
  provider: provider,
  signingMessageEntity: 'CyberConnect' || your entity,
});
```

- `appId` - Your application id, can be any string less than 128 characters.
- `namespace` - Your application name.
- `env` - (optional) Env decides the endpoints. Now we have `STAGING` and `PRODUCTION`. (The default value is `Env.PRODUCTION`).
- `provider` - The corresponding provider of the given chain.
- `signingMessageEntity` - (optional) Use to describe the entity users sign their message with. Users will see it when authorizing in the wallet `I authorize ${signingMessageEntity} from this device using signing key:`. The default entity is `CyberConnect`.

### Creating comment

```ts
cyberConnect.createComment(targetContentId, content);
```

**Parameters**

- `targetContentId: string` - target content id to comment on, which can be a post, an essence or a comment

- `content: Content` - comment content

```ts
interface Content {
  title: string;
  body: string;
  author: string; // The CyberProfile handle of the author
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

### Updating comment

```ts
cyberConnect.updateComment(commentId,, targetContentId, content);
```

**Parameters**

- `commentId: string` - comment id to update
- `targetContentId: string` - target content id to comment on, which can be a post, an essence or a comment
- `content: Content` - new comment content

```ts
interface Content {
  title: string;
  body: string;
  author: string; // The CyberProfile handle of the author
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

## Verifying the proof

After creating or updating a comment successfully, you can use `arweaveTxHash` to verify the proof, go to `https://arweave.app/tx/${arweaveTxHash}`.
