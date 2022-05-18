---
id: avatar
title: Avatar
slug: /cyberconnect-api/rest-api/avatar/
sidebar_label: Avatar
sidebar_position: 2
description: Avatar API is used for querying the ENS avatar of an Ethereum address or ENS name.
---

Avatar API is used for querying the ENS avatar of an Ethereum address or ENS name.

## Structure

The endpoint URL for requesting the avatar:

```html
https://cyberprofile.vercel.app/api/avatar/{id}
```

The endpoint URL for requesting the avatar with a specific image size is:

```html
https://cyberprofile.vercel.app/api/avatar/{id}?s={s}
```

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | Get the ENS avatar of this Ethereum address or ENS name. |
| `s` | Integer | The number of pixels of the avatar in square: min is 1, max is 2048. |

With correct inputs, you can retrieve an image of the requested ENS avatar.

## Example

Here is an example of querying ENS avatar. Feel free to test it out in [Next Swagger Doc Demo App](https://cyberprofile.vercel.app/)!

```html
https://cyberprofile.vercel.app/api/avatar/pisofa.eth?s=400
```

Find below the example return result:

![Avatar](/img/v0.3.0/cyberconnect-api/avatar.png)
