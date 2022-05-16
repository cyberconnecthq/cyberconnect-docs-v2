---
id: connect-with-follow-button
title: Connect with Follow Button
slug: /cyberconnect-sdk/connect-with-follow-button/
sidebar_label: Connect with Follow Button
sidebar_position: 3
description: Embedding a follow button on your website is a quick and easy way to enable following/unfollowing in the given namespace.
---

Embedding a follow button on your website is a quick and easy way to enable following/unfollowing in the given namespace. Let's begin!

The CyberConnect Follow Button SDK for JavaScript doesn't have any standalone files that need to be downloaded or installed. You simply need to add a short piece of regular JavaScript into your HTML that will asynchronously load the SDK into your pages. Async loading means that it does not block loading other elements of your page.

The source code for the Follow Button can be found on [Github](https://github.com/cyberconnecthq/follow-button).

## Create a follow button

First you need to include the [cyberconnect-follow-button.min.js](https://connect.cybertino.io/js/cyberconnect-follow-button.min.js) script and call follow.init after the script is loaded.

```jsx
<script>
async function initCyberConnect() {
    await capi.follow.init({
        ethProvider: ethProvider, // ethProvider is an Ethereum provider
	    namespace: 'CyberConnect',
	    env: 'PRODUCTION' // env decides the endpoints: STAGING or PRODUCTION (default)
    });
</script>
<script src="https://connect.cybertino.io/js/cyberconnect-follow-button.min.js" defer onload="initCyberConnect"></script>
```

Then, to create a follow button, add an `div` element to contain a button `id` and call `follow.render` with the button `id` and the target wallet address:

```html
<body>
    <div id="follow-button"></div>
    <script>
        capi.follow.render("follow-button", {
            toAddr: 'xxx',
            onSuccess: (event) => {
                console.log(event);
            },
            onFailure: (event) => {
                console.log(event);
            },
        });
    </script>
</body>
```

When the button is triggered, the callbacks will be called with the following event object:

```json
onSuccess:
{
    code: EVENT_NAME,
    toAddr: "xxx"
}

onFailure:
{
    code: ERROR_CODE,
    message: "error message"
}
```

## Sandbox

You can test the button for yourself in the sandbox. Make sure you've connected with the wallet first:

<iframe src="https://codesandbox.io/embed/connect-with-follow-button-lujbw8?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split"
    title="connect-with-follow-button"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
