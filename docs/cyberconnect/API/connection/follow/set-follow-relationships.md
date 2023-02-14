---
id: set-follow-relationships
title: Follow / Unfollow SDK
slug: /api/connection/set-follow-relationships
sidebar_label: Set follow relationships
sidebar_position: 1
description: Set follow relationships
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

#### Follow

```ts
cyberConnect.follow(address, handle);
```

- `address` - Current signed in wallet address.
- `handle` - The target handle.

#### Unfollow

```ts
cyberConnect.unfollow(address, handle);
```

- `address` - Current signed in wallet address.
- `handle` - The target handle.
