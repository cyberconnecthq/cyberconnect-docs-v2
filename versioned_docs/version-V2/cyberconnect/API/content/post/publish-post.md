---
id: publish-post
title: Publish post
slug: /api/content/publish-post
sidebar_label: Publish post
sidebar_position: 2
description: Publish post
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

### Create post

```ts
cyberConnect.createPost(post);
```

**Parameters**

- `post: Post` - post content

```ts
type Post = {
  title: string;
  body: string;
};
```

**Return**

- `response: PublishResponse` - publish response

```ts
type PublishResponse = {
  status: Status;
  id: string;
  arweaveTxHash: string;
};

enum Status {
  SUCCESS,
  INVALID_ADDRESS,
  INVALID_ID,
  RATE_LIMITED,
  NOT_FOUND,
  ALREADY_EXISTED,
  INVALID_MESSAGE,
  INVALID_SIGNATURE,
  MESSAGE_EXPIRED,
  INVALID_SIGNING_KEY,
}
```

### Update post

```ts
cyberConnect.updatePost(post, id);
```

**Parameters**

- `post: Post` - post content

```ts
type Post = {
  title: string;
  body: string;
};
```

- `id: string` - target post id

**Return**

- `response: PublishResponse` - publish response

```ts
type PublishResponse = {
  status: Status;
  id: string;
  arweaveTxHash: string;
};

enum Status {
  SUCCESS,
  INVALID_ADDRESS,
  INVALID_ID,
  RATE_LIMITED,
  NOT_FOUND,
  ALREADY_EXISTED,
  INVALID_MESSAGE,
  INVALID_SIGNATURE,
  MESSAGE_EXPIRED,
  INVALID_SIGNING_KEY,
}
```

### Verify proof

After creating or updating a post successfully, you can use `arweaveTxHash` to verify the proof, go to https://arweave.net/ + `arweaveTxHash`.
