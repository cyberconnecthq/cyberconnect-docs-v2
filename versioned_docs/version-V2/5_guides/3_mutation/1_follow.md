---
id: follow
title: Follow
slug: /guides/mutation/follow
sidebar_label: Follow
sidebar_position: 1
description: Mutation - Follow
---

## Workflow

1. Generate `operation` json string as below.

```graphql
”{\"name\":\"follow\",\"from\":\"0x803F69aE5f5D839071fcD712e25BF3c8c35B2664\",\"to\":\"0xab7824a05ef372c95b9cfeb4a8be487a0d5d8ecb\",\"namespace\":\"test\",\"network\":\"ETH\",\"alias\":\"\",\"timestamp\":1662671067623}
```

1. Sign the `operation` string with your private signing key and get signature.
2. Sending following request with your `X-API-KEY` header.

```graphql
mutation follow {
    follow(
        input: {
            fromAddr: "0x803F69aE5f5D839071fcD712e25BF3c8c35B2664"
            toAddr: "0xab7824a0ef372c95b9cfeb4a8be487a0d5d8ecb"
            signature: "0xdcf2dae91b1372767d05f209c096dc35f65e1a91e9e7b0521a8a23802e42ca273aea934046e79ec75f8290ff6c1b7bf35d023c8dcb0bf956f56fdaec3633620f1c"
            signingKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEqw+1M+P+2SBcf6mTtGEQ2rbEIq0/eYbzYPtzu75DfC93Y6twu7yq7BEE3yqokSIpBGXI92m6EPkhH+kUx4+ZyQ=="
            namespace: "CyberConnect"
            operation: "{\"name\":\"follow\",\"from\":\"0x803F69aE5f5D839071fcD712e25BF3c8c35B2664\",\"to\":\"0xab7824a05ef372c95b9cfeb4a8be487a0d5d8ecb\",\"namespace\":\"test\",\"network\":\"ETH\",\"alias\":\"\",\"timestamp\":1662672662623}"
        }
    ) {
        success
    }
}
```

## Experiment in Sandbox

We’ve created an example that incorporates all the steps for Following an address. Feel free to experiment with our code in the sandbox below. This covers a couple of steps

1. Login with wallet
2. Follow an address

<iframe src="https://codesandbox.io/embed/follow-unfollow-e6x6fh?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
    title="connect-with-follow-button"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
