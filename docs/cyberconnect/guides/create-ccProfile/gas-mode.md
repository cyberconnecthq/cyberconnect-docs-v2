---
id: create-ccProfile-gas-mode
title: Create ccProfile in Gas Mode
slug: /how-to/create-ccProfile/gas-mode
sidebar_label: Gas Mode
sidebar_position: 1
description: Create ccProfile - Gas Mode
---

In this section you will learn how to create ccProfile in gas mode. We sometimes refer to it as a _profile NFT_ and the reason behind it is that, once the profile is created, a NFT will automatically be minted and transferred to the user's wallet.

:::tip

The app you're building in this example is using the **ccProfile** smart contract for the **BSC Testnet Network**.

:::

## Connect wallet

The very first step in building any web3 application is to allow the user to connect to the app using its wallet, in this case the MetaMask wallet.

Whether the user wants to create a profile or subscribe and so on, you need to make sure that user first connects to the application and you can use a library like [wagmi](https://wagmi.sh/) for that.

As best practice, it would be helpful to consider implementing a check function to verify if the user is connected to the correct network every time the user uses its wallet.

## Gas Mode

## Contract ABI

An ABI (Application Binary Interface) is a way to interact with a smart contract directly from the user's wallet. If you're unfamiliar with it take a couple of minutes to go over an [ABI's specification](https://docs.soliditylang.org/en/v0.8.17/abi-spec.html).

The ABI is simply a JSON file that needs to be imported into your project, and, the best part is that you only need to add the functions that you actually use in your app.

In this example you will be working with ccProfile NFT's ABI for the contract `0x57e12b7a5f38a7f9c23ebd0400e6e53f2a45f271`.

```json title="abi/ProfileNFT.json"
[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "handle",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "avatar",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "metadata",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          }
        ],
        "internalType": "struct DataTypes.CreateProfileParams",
        "name": "params",
        "type": "tuple"
      },
      { "internalType": "bytes", "name": "preData", "type": "bytes" },
      { "internalType": "bytes", "name": "postData", "type": "bytes" }
    ],
    "name": "createProfile",
    "outputs": [
      { "internalType": "uint256", "name": "tokenID", "type": "uint256" }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
]
```

:::info

Users can create as many profiles as they wish. There is also a `setPrimaryProfile` function in the Profile NFT's contract ABI that can be implemented by following the same logic as the one described for `createProfile`.

:::

Let's take a closer look at the required params that the function is expecting:

- `CreateProfileParams`;
- `preData`;
- `postData`.

First, there are the `CreateProfileParams` that contain all the necessary information about a profile.
The first 3 key-value pairs for this param are pretty self-explanatory:

- `to` is the user's wallet address;
- `handle` is the user's handle;
- `avatar` is a URL link for the user's avatar.

Then, there is `metadata`, and here is where the Profile NFT starts to shine because it allows you to get creative. It all depends on how your app will look and the information it will display.

:::tip

`metadata` doesn't follow a specific schema so it allows developers to customize the structure.

Last but not least, there is `operator` which is telling the contract what address is allowed to make changes on behalf of the user's wallet address.

The next required params are `preData` and `postData` which are essentially middlewares that will dictate what the contract should process before and after a profile is created.

To keep things simple, you won't set any middleware in this example. More on this topic in the [Middleware](/core-concepts/middleware) section.

## Create a Profile

As mentioned previously, you will be working with the ccProfile NFT respectively the `0x57e12b7a5f38a7f9c23ebd0400e6e53f2a45f271` contract.

Everything will take place on the client side:

1. Collect user input and construct the metadata schema;
2. Instantiate the `contract` object and call the `createProfile` functions;

```tsx "
// wagmi contract write
const [gasModeHandle, setGasModeHandle] = React.useState<string>();

const { config, refetch } = usePrepareContractWrite({
  address: "0x57e12b7a5f38a7f9c23ebd0400e6e53f2a45f271",
  abi: ProfileNFT,
  functionName: "createProfile",
  args: [
    {
      to: address,
      handle: gasModeHandle,
      metadata: "",
      avatar: "",
      operator: "0x85AAc6211aC91E92594C01F8c9557026797493AE",
    },
    "0x",
    "0x",
  ],
  enabled: false,
});

const { write, data, isLoading, isSuccess } = useContractWrite(config);

const mint = async () => {
  await refetch();
  if (gasModeHandle) {
    write?.();
  }
};

return (
  <>
    ...
    <input
      className="h-[30px] p-4 rounded"
      value={gasModeHandle || ""}
      onChange={(e) => setGasModeHandle(e.target.value)}
    />
    <button onClick={() => mint()}>Mint</button>
    ...
  </button>
);
```

If the profile was successfully created, you can verify the logged transaction hash on [BscScan](https://testnet.bscscan.com/tx/0xb44a8b0a4d039bdb8ade3262bff88d829553fe4564669b46d207c147efa1a189).

You can also view the NFT for the profile on [OpenSea](https://testnets.opensea.io/assets/bsc-testnet/0x57e12b7a5f38a7f9c23ebd0400e6e53f2a45f271/99).

:::

Great job! You've created your first profile! In the next section we will go over the [Authentication](/how-to/build-content-app/authentication) process.
