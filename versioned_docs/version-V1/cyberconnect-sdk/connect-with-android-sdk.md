---
id: connect-with-android-sdk
title: Connect with Android SDK
slug: /cyberconnect-sdk/connect-with-android-sdk/
sidebar_label: Connect with Android SDK
sidebar_position: 4
description: cyberconnect-kotlin-lib is a lib support CyberConnect API, here is an example repo using it cyberconnect-kotlin-example
---

cyberconnect-kotlin-lib is a lib support CyberConnect API, here is an example repo using it [cyberconnect-kotlin-example](https://github.com/cyberconnecthq/cyberconnect-kotlin-example)

## Installation

Gradle

```jsx
implementation 'com.github.cyberconnecthq:cyberconnect-kotlin-lib:v1.0.1'
```

Or just add the files manully

## Basic Usage

### Init CyberConnect

```jsx
val cyberConnectInstance = CyberConnect(YOURWALLETADDRESS)
```

### Authenticate

Once you get authntication from CyberConnect, you can use CyberConnect to build your own social graphs

```jsx
cyberConnectInstance.registerKey(signature, network) { result in
  //handle the result
}
```

- `signature` - The signature of a particular message, you can get the message using, you can sign the message with your own wallet third party wallet:

```jsx
val publicKeyString = cyberConnectInstance.getPublicKeyString()
val message = cyberConnectInstance.getAuthorizeString(publicKeyString)
```

- `network` - enum type for network, now support ETH and Solana

### Connect

```jsx
cyberConnectInstance.connect(toAddress, alias, network) { result in
  //handle the result
}
```

- `toAddress` - The target wallet address to connect.
- `alias` - (optional) Alias for the target address.
- `network` - (optional) enum type for network, now support ETH and Solana.
- `connectionType` - (optional) type of connection. The default value is `Connection.FOLLOW`. See ConnectionType struct in code for more details.

### Disconnect

```jsx
cyberConnectInstance.disconnect(toAddress, alias, network) { result in
  //handle the result
}
```

- `toAddress` - The target wallet address to disconnect.
- `alias` - (optional) Alias for the target address.
- `network` - (optional) enum type for network, now support ETH and Solana.

### GetBatchConnectStatus

```jsx
cyberConnectInstance.getBatchConnections(toAddresses) { result in
  //handle the result
}
```

- `toAddresses` - A list of wallet addresses to connect.

### SetAlias

```jsx
cyberConnectInstance.alias(toAddress, alias, network) { result in
  //handle the result
}
```

- `toAddress` - The target wallet address to disconnect.
- `alias` - The alias for the target address.
- `network` - (optional) enum type for network, now support ETH and Solana.
