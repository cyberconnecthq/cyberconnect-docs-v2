---
id: cyberconnect-sdk
title: CyberConnect SDK
slug: /sdk
sidebar_label: CyberConnect SDK
sidebar_position: 1
description: CyberConnect SDK
---

## Installation

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

:::note
The CyberConnect SDK is still in early development and for now only supports the off-chain follow/unfollow connections. We will be slowly adding other mutations to the SDK, but if there are specific ones you'd like to see added sooner don't hesitate to reach out on the feedback form above.
:::
