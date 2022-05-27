---
id: connect-with-ios-sdk
title: Connect with iOS SDK
slug: /cyberconnect-sdk/connect-with-ios-sdk/
sidebar_label: Connect with iOS SDK
sidebar_position: 3
description: The CyberConnect SDK provides two primary functions, connect and disconnect, which in social graph are follow and unfollow.
---

The CyberConnect SDK provides two primary functions, **connect** and **disconnect**, which in [social graphs](/concepts/social-graph/) are **follow** and **unfollow**.

The library encapsulates the complex authentication logic (authenticate to Ceramic Network) into easy-to-use functions. Find [here](https://github.com/cyberconnecthq/cyberconnect-swift-example) an example repo.

## Installation

The [Swift Package Manager](https://swift.org/package-manager/) is a tool integrated into the `swift` compiler for developers to automate the distribution of Swift code.
Once you have your Swift package set up, add CyberConnect as a dependency:

```jsx
dependencies: [
    .package(url: "<https://github.com/cyberconnecthq/cyberconnect-swift-lib>", .upToNextMajor(from: "1.0.12"))
]
```

## Basic Usage

### Init CyberConnect

```jsx
let cyberConnectInstance = CyberConnect(address: YOURWALLETADDRESS)
```

### Authenticate

Get authentication from CyberConnect before building your own social functionalities:

```jsx
cyberConnectInstance.registerKey(signature: YOURSIGNATURE, network: YOURNETWORKTYPE) { data in
    let dataString = String(decoding: data, as: UTF8.self)
    self.show(UIAlertController(title: "Signature", message: dataString, preferredStyle: .alert))
}
```

- `signature` - signature of a particular message. You can sign the message with your wallet:

```jsx
let publicKeyPem = cyberconnect.retriveCyberConnectSignKey(address: YOUADDRESS).publicKey.pemRepresentation.pemRepresentationContent()
let message = cyberconnect.getAuthorizeString(localPublicKeyPem: youPublicKeyPem)
```

- `network` - enum type for network. Now we support Ethereum and Solana.

### Connect

```jsx
cyberConnectInstance.connect(toAddress: SOMEONESADDRESS, alias: ALIAS, network: NETWORK) { data in
    let dataString = String(decoding: data, as: UTF8.self)
    self.show(UIAlertController(title: "Connect", message: dataString, preferredStyle: .alert))
}
```

- `toAddress` - target address to be connected.
- `alias` - (optional) alias for the target address.
- `network` - (optional) enum type for network. Now we support Ethereum and Solana.
- `connectionType` - (optional) type of connection. The default value is `Connection.FOLLOW`. See ConnectionType struct in code for more details.

### Disconnect

```jsx
cyberConnectInstance.disconnect(toAddress: TAEGETADDERSS, alias: ALIAS, network: NETWOEKTYPE) { data in
    print(data)
}
```

- `toAddress` - target address to be disconnected.
- `alias` - (optional) alias for the target address.
- `network` - (optional) enum type for network. Now we support Ethereum and Solana.

### GetBatchConnectStatus

```jsx
cyberConnectInstance.getBatchConnections(toAddresses: ADDRESSARRAY) { data in
    print(data)
}
```

- `toAddresses` - a list of target addresses to be connected.

### SetAlias

```jsx
cyberConnectInstance.alias(toAddress: TARGETADDRESS, alias: ALIAS, network: NETWORKTYPE) { data in
    print(data)
}
```

- `toAddress` - target address to be connected.
- `alias` - alias for the target address.
- `network` - (optional) enum type for network. Now we support Ethereum and Solana.
