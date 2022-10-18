---
id: create-a-profile
title: Create a Profile
slug: /how-to/build-content-app/create-a-profile
sidebar_label: Create a Profile
sidebar_position: 2
description: How to Build Content app - Create a Profile
---

In this section you will learn how to interact with a smart contract to create a profile. We sometimes refer to it as a _profile NFT_ and the reason behind it is that, once the profile is created, a NFT will automatically be minted and transferred to the user's wallet.

:::tip

The app you're building in this example is using the **Link3 Profile** smart contract for the **Goerli Testnet Network**. If, you want to build on a different newtwork (e.g. **BNB Testnet**), please refer to the [Cheat sheet](/cheat-sheet) to find the corresponding address and update both the _contract_ and _chain id_ variables in your project.

:::

## Connect wallet

The very first step in building any web3 application is to allow the user to connect to the app using its wallet, in this case the MetaMask wallet.

Whether the user wants to create a profile or subscribe and so on, you nee to make sure that user first connects to the application.

```tsx title="components/ConnectBtn.tsx"
try {
    /* Function to detect most providers injected at window.ethereum */
    const detectedProvider =
        (await detectEthereumProvider()) as ExternalProvider;

    /* Check if the Ethereum provider exists */
    if (!detectedProvider) {
        throw new Error("Please install MetaMask!");
    }

    /* Ethers Web3Provider wraps the standard Web3 provider injected by MetaMask */
    const web3Provider = new ethers.providers.Web3Provider(detectedProvider);

    /* Connect to Ethereum. MetaMask will ask permission to connect user accounts */
    await web3Provider.send("eth_requestAccounts", []);

    /* Get the signer from the provider */
    const signer = web3Provider.getSigner();

    /* Get the address of the connected wallet */
    const address = await signer.getAddress();

    /* Set the providers in the state variables */
    setProvider(web3Provider);

    /* Set the address in the state variable */
    setAddress(address);

    /* Display success message */
    alert("Connected to MetaMask!");
} catch (error) {
    /* This error code indicates that the user rejected the connection */
    if (error.code === 4001) {
        /* Reset the state variables */
        setProvider(undefined);
        setAddress(undefined);
    } else {
        /* Display error message */
        alert(error.message);
    }
}
```

There is one more important thing to implement. Every time the user uses its wallet, you have to make sure its on the correct network so a check function to verify if the user is connected to the correct network will help with that.

```tsx title="context/auth.tsx"
try {
    /* Get the network from the provider */
    const network = await provider.getNetwork();

    /* Check if the network is the correct one */
    if (network.chainId !== CHAIN_ID) {
        /* Switch network if the chain id doesn't correspond to Goerli Testnet Network */
        await provider.send("wallet_switchEthereumChain", [
            { chainId: "0x" + CHAIN_ID.toString(16) },
        ]);

        /* Trigger a page reload */
        window.location.reload();
    }
} catch (error) {
    /* This error code indicates that the chain has not been added to MetaMask */
    if (error.code === 4902) {
        await provider.send("wallet_addEthereumChain", [
            {
                chainId: "0x" + CHAIN_ID.toString(16),
                rpcUrls: ["https://goerli.infura.io/v3/"],
            },
        ]);

        /* Trigger a page reload */
        window.location.reload();
    } else {
        /* Throw the error */
        throw error;
    }
}
```

Now that you've solved the main functionalities involving the MetaMask wallet you can move on to bigger things like interacting with the smart contract.

## Contract ABI

An ABI (Application Binary Interface) is a way to interact with a smart contract directly from the user's wallet. If you're unfamiliar with it take a couple of minutes to go over an [ABI's specification](https://docs.soliditylang.org/en/v0.8.17/abi-spec.html).

The ABI is simply a JSON file that needs to be imported into your project, and, the best part is that you only need to add the functions that you actually use in your app.

In this example you will be working with Link3 Profile NFT's ABI for the contract `0x57e12b7a5f38a7f9c23ebd0400e6e53f2a45f271`. Since you only need to create a profile and retrieve the profile id after the profile has been created, go ahead a mention in your .json file the `createProfile` and the `getProfileIdByHandle` functions.

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
    },
    {
        "inputs": [
            { "internalType": "string", "name": "handle", "type": "string" }
        ],
        "name": "getProfileIdByHandle",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
```

:::info

Users can create as many profiles as they wish. There is also a `setPrimaryProfile` function in the Profile NFT's contract ABI that can be implemented by following the same logic as the one described for `createProfile`.

:::

Let's take a closer look at the required params that the function is expecting:

-   `CreateProfileParams`;
-   `preData`;
-   `postData`.

First, there are the `CreateProfileParams` that contain all the necessary information about a profile.
The first 3 key-value pairs for this param are pretty self-explanatory:

-   `to` is the user's wallet address;
-   `handle` is the user's handle;
-   `avatar` is a URL link for the user's avatar.

Then, there is `metadata`, and here is where the Profile NFT starts to shine because it allows you to get creative. It all depends on how your app will look and the information it will display.

:::tip

`metadata` doesn't follow a specific schema so it allows developers to customize the structure.

:::

This is how the interface for `metadata` looks like for this application:

```tsx title="types.ts"
/* Metadata schema for Profile NFT */
interface IProfileMetadata {
    name: string;
    bio: string;
    handle: string;
    version: string;
}
```

Last but not least, there is `operator` which is telling the contract what address is allowed to make changes on behalf of the user's wallet address.

The next required params are `preData` and `postData` which are essentially middlewares that will dictate what the contract should process before and after a profile is created.

To keep things simple, you won't set any middleware in this example. More on this topic in the [Middleware](/concepts/middleware) section.

## Create a Profile

As mentioned previously, you will be working with the Link3 Profile NFT respectively the `0x57e12b7a5f38a7f9c23ebd0400e6e53f2a45f271` contract.

Everything will take place on the client side:

-   collecting user input and construct the metadata schema;
-   uploading metadata to IPFS to get the hash;
-   instantiating the `contract` object to call the `createProfile` and `getProfileIdByHandle` functions.

```tsx title="components/Buttons/SignupBtn.tsx"
try {
    /* Check if the user connected with wallet */
    if (!(provider && address)) {
        throw Error("Connect with MetaMask.");
    }

    /* Check if the network is the correct one */
    await checkNetwork(provider);

    /* Collect user input */
    const handle = prompt("Handle:") || randUserName();
    const avatar = prompt("Avatar URL:") || randAvatar({ size: 200 });
    const name = prompt("Name:") || randFullName();
    const bio = prompt("Bio:") || randPhrase();

    /* Construct metadata schema */
    const metadata: IProfileMetadata = {
        name: name,
        bio: bio,
        handle: handle,
        version: "1.0.0",
    };

    /* Upload metadata to IPFS */
    const ipfsHash = await pinJSONToIPFS(metadata);

    /* Get the signer from the provider */
    const signer = provider.getSigner();

    /* Get the contract instance */
    const contract = new ethers.Contract(
        PROFILE_NFT_CONTRACT,
        ProfileNFTABI,
        signer
    );

    /* Call the createProfile function to create the profile */
    const tx = await contract.createProfile(
        /* CreateProfileParams */
        {
            to: address,
            handle: handle,
            avatar: avatar,
            metadata: ipfsHash,
            operator: PROFILE_NFT_OPERATOR,
        },
        /* preData */
        0x0,
        /* postData */
        0x0
    );

    /* Wait for the transaction to be mined */
    await tx.wait();

    /* Log the transaction hash */
    console.log("~~ Tx hash ~~");
    console.log(tx.hash);

    /* Call the getProfileIdByHandle function to get the profile id */
    const profileID = await contract.getProfileIdByHandle(handle);

    /* Set the profileID in the state variables */
    setProfileID(Number(profileID));

    /* Set the handle in the state variables */
    setHandle(handle);

    /* Display success message */
    alert("Successfully created the profile!");
} catch (error) {
    /* Display error message */
    alert(error.message);
}
```

If the profile was successfully created, you can verify the logged transaction hash on [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-content-app-create-a-profile-tx.png)

You can also view the NFT for the profile on [testnets.opensea.io](https://testnets.opensea.io/). The Link3 Profile NFT contract is generating these beautiful SVGs for the NFTs, mints the profile NFT and then transfers it into the owner's wallet address.

![nft profile](/img/v2/build-content-app-create-a-profile-nft.png)

Great job! You've created your first profile! In the next section we will go over and implement the [Authentication](/how-to/build-content-app/authentication) process.
