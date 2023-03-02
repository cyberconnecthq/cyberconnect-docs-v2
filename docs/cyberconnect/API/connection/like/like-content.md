---
id: like-content
title: Like content
slug: /api/connection/like-content
sidebar_label: Like content
sidebar_position: 1
description: Like content
---

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
  namespace: 'CyberConnect',
  env: Env.Production,
  provider: provider,
  signingMessageEntity: 'CyberConnect' || your entity,
});
```

- `namespace` - Your applciation name.
- `env` - (optional) Env decides the endpoints. Now we have `staging` and `production`. (The default value is `Env.Production`).
- `provider` - The corresponding provider of the given chain.
- `signingMessageEntity` - (optional) Use to describe the entity users sign their message with. Users will see it when authorizing in the wallet `I authorize ${signingMessageEntity} from this device using signing key:`. The default entity is `CyberConnect`.

### Like content

```ts
cyberConnect.like(id);
```

**Parameters**

- `id: string` - The content id to like which can the id of a post, comment or an essence.

**Return**

- `response: LikeResponse` - like response

```ts
type LikeResponse = {
  status: Status;
};

enum Status {
  SUCCESS,
  INVALID_PARAMS,
  RATE_LIMITED,
  TARGET_NOT_FOUND,
  ALREADY_DONE,
  INVALID_MESSAGE,
  INVALID_SIGNATURE,
  MESSAGE_EXPIRED,
}
```

### Dislike post

```ts
cyberConnect.dislike(id);
```

**Parameters**

- `id: string` - The content id to dislike which can the id of a post, comment or an essence.

**Return**

- `response: DislikeResponse` - dislike response

```ts
type DislikeResponse = {
  tsInServer: number;
  status: Status;
};

enum Status {
  SUCCESS,
  INVALID_PARAMS,
  RATE_LIMITED,
  TARGET_NOT_FOUND,
  ALREADY_DONE,
  INVALID_MESSAGE,
  INVALID_SIGNATURE,
  MESSAGE_EXPIRED,
}
```

### Cancel reaction

```ts
cyberConnect.cancelReaction(id);
```

**Parameters**

- `id: string` - The content id to cancel reaction on which can the id of a post, comment or an essence.

**Return**

- `response: CancelReactionResponse` - cancel reaction response

```ts
type CancelReactionResponse = {
  status: Status;
};

enum Status {
  SUCCESS,
  INVALID_PARAMS,
  RATE_LIMITED,
  TARGET_NOT_FOUND,
  ALREADY_DONE,
  INVALID_MESSAGE,
  INVALID_SIGNATURE,
  MESSAGE_EXPIRED,
}
```

### Verify the proof

After liking or disliking content successfully, you can use `arweaveTxHash` to verify the proof, go to https://arweave.net/ + `arweaveTxHash`.
