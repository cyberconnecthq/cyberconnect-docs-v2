---
id: set-follow-relationships
title: Set follow relationship
slug: /api/connection/set-follow-relationship
sidebar_label: Set follow relationship
sidebar_position: 1
description: Set follow relationship
---

# Follow/Unfollow

### Installation

```sh
npm install @cyberlab/cyberconnect-v2
or
yarn add @cyberlab/cyberconnect-v2
```

### Basic usage

#### Init CyberConnect

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
- `namespace` - Your applciation name.
- `env` - (optional) Env decides the endpoints. Now we have `staging` and `production`. (The default value is `Env.Production`).
- `provider` - The corresponding provider of the given chain.
- `signingMessageEntity` - (optional) Use to describe the entity users sign their message with. Users will see it when authorizing in the wallet `I authorize ${signingMessageEntity} from this device using signing key:`. The default entity is `CyberConnect`.

#### Follow

```ts
cyberConnect.follow(handle);
```

- `handle` - The CyberProfile handle to follow.

#### Unfollow

```ts
cyberConnect.unfollow(handle);
```

- `handle` - The CyberProfile handle to unfollow.
