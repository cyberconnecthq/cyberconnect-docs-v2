---
id: unfollow
title: Unfollow
slug: /guides/mutation/unfollow
sidebar_label: Unfollow
sidebar_position: 4
description: Mutation - Unfollow
---

`Unfollow` is a method to nullify a previously established `follow` connection. For more info on follow/unfollow and the difference between them and Subscribe, please refer to the [core concepts section on follow](/concepts/follow-connection).


## Workflow


1. The first step is to create a `message` as a json string, adhering to the following schema.

```go
type FollowMessage struct {
	Op      string `json:"op"`      // operation "follow", "unfollow"
	Address string `json:"address"` // address of the user to follow/unfollow
	Handle  string `json:"handle"`  // profile handle of the user to follow/unfollow
	Ts      int64  `json:"ts"`      // timestamp in milliseconds
}
```
Below is an example of a valid json string `message`. Replace `address`, `handle`, and current `timestamp` fields with proper data. 

```json
"{\"op\":\"unfollow\",\"address\":\"0x803F69aE5f5D839071fcD712e25BF3c8c35B2664\",\"handle\":\"shiyu\",\"ts\":\"1662671067623\"}"
```
2. Sign the `message` string with users' private signing key and get the signature.

3. Sending following request with your `X-API-KEY` header. (Refer to: [Create an Application API Key](/guides/authentication/get-api-key))

```graphql
mutation unfollow {
    unfollow(
        input: {
            address: "0x803F69aE5f5D839071fcD712e25BF3c8c35B2664"
            handle: "shiyu"
            message:"{\"op\":\"follow\",\"address\":\"0x803F69aE5f5D839071fcD712e25BF3c8c35B2664\",\"handle\":\"shiyu\",\"ts\":\"1662671067623\"}"
            signature: "0xdcf2dae91b1372767d05f209c096dc35f65e1a91e9e7b0521a8a23802e42ca273aea934046e79ec75f8290ff6c1b7bf35d023c8dcb0bf956f56fdaec3633620f1c"
            signingKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEqw+1M+P+2SBcf6mTtGEQ2rbEIq0/eYbzYPtzu75DfC93Y6twu7yq7BEE3yqokSIpBGXI92m6EPkhH+kUx4+ZyQ=="
        }
    ) {
        status
    }
}
```

4. Finally the `status` field returned in the response is an enum with following options:

```
SUCCESS
INVALID_ADDRESS
INVALID_MESSAGE
INVALID_SIGNING_KEY
INVALID_SIGNATURE
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