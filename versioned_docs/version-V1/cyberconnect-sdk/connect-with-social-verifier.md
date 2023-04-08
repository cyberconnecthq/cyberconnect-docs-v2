---
id: connect-with-social-verifier
title: Connect with Social Verifier
slug: /cyberconnect-sdk/connect-with-social-verifier/
sidebar_label: Connect with Social Verifier
sidebar_position: 5
description: CyberConnect offers an open-source social verifier and a public verified list in an effort to bring a democratic social network.
---

CyberConnect offers an open-source social verifier and a public verified list in an effort to bring a democratic social network.

:::info

Currently, CyberConnect Social Verifier only supports `Twitter` and `Github` account verification. More platforms are in the development backlog.

:::

You can visit [Github](https://github.com/cyberconnecthq/social-verifier) for codebase use or review, [CyberConnect API](/V1/cyberconnect-api/overview/) for Indexer Query or test out the CyberConnect Social Verifier in the sandbox from [Verify a Twitter Account](/V1/get-started/verify-a-twitter-account/) section.

## Installation

In order to install the Social Verifier, simply run:

```bash npm2yarn
npm install @cyberlab/social-verifier
```

## Use the Verifier

- [Twitter Verifier](/V1/cyberconnect-sdk/connect-with-social-verifier/#twitter-verifier)
- [Github Verifier](/V1/cyberconnect-sdk/connect-with-social-verifier/#github-verifier)

## Twitter Verifier

**Twitter Verifier** uses a 3 step process for linking an Ethereum address to a Twitter account:

1. Users use their Ethereum private key to sign a message with their Twitter handle to get a message which contains the generated signature.
2. Users post a tweet with this message so others can view.
3. Users send a verify request to our server with their wallet address. Our server will recover the signer address from the signature found in the tweet and save the verified information if the signer address is the same as the address in the request.

### Signing Data

Using `twitterAuthorize` to get signature message.

```jsx
import { twitterAuthorize } from '@cyberlab/social-verifier'

const sig = twitterAuthorize(provider, address, handle)
```

- `provider` - An ETH provider which should implement one of the following methods: send, sendAsync, request.
- `address` - The Ethereum address that you want to link with the Twitter account.
- `handle` - The handle of your Twitter account.

### Posting message

You can customize your tweet text, but the text should include the signature message from the [Signing Data](/V1/cyberconnect-sdk/connect-with-social-verifier/#signing-data-0) step.

```jsx
const text = `Verifying my Web3 identity on @cyberconnecthq: %23LetsCyberConnect %0A ${sig}`

window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
```

### Verifying

After posting the tweet, you can call `twitterVerify` to link your address with your twitter account.

```jsx
import { twitterVerify } from '@cyberlab/social-verifier'

try {
  await twitterVerify(address, handle)
  console.log('Verify Success!')
} catch (e) {
  console.log('Error: ', e.message)
}
```

- `address` - The Ethereum address that you want to link with your twitter account.
- `handle` - The handle of your twitter account.

## Github Verifier

**Github Verifier** uses a 3 step process for linking an Ethereum address to a Github account.

1. Users use their Ethereum private key to sign a message with their Github username to get a message which contains the generated signature.
2. Users create a Github gist with this message.
3. Users send a verify request to our server with their wallet address and the gist id. Our server will recover the signer address from the signature found in the gist and save the verified information if the signer address is the same as the address in the request.

### Signing Data

Using `githubAuthorize` to get signature message.

```jsx
import { githubAuthorize } from '@cyberlab/social-verifier'

const sig = githubAuthorize(provider, address, username)
```

- `provider` - An ETH provider which should implement one of the following methods: send, sendAsync, request.
- `address` - The Ethereum address that you want to link with your Github account.
- `username` - The username of your Github account.

### Posting message

You need to create a gist in your Github. You can customize your gist text, but the text should include the signature message from the [Signing Data](/V1/cyberconnect-sdk/connect-with-social-verifier/#signing-data-1) step.

### Verifying

After posting the gist, you can call `githubVerify` to link your address with your Github account.

```jsx
import { githubVerify } from '@cyberlab/social-verifier'

try {
  await githubVerify(address, gist_id)
  console.log('Verify Success!')
} catch (e) {
  console.log('Error: ', e.message)
}
```

- `address` - The Ethereum address that you want to link with your Github account.
- `gist_id` - The id of your Github gist. It's the last part of your gist url.
