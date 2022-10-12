---
id: create-profile
title: Create Profile
slug: /how-to/build-content-app/create-profile
sidebar_label: Create Profile
sidebar_position: 2
description: How to Build Content app - Create Profile
---

In this section you will learn how to interact with a smart contract to create a profile. We sometimes refer to it as a _profile NFT_ and the reason behind it is that, once the profile is created, a NFT will automatically be minted and transferred to the user's wallet.

:::tip

The app you're building in this example is using the **Link3 Profile** smart contract for the **Goerli Testnet Network**. If, you want to build on a different newtwork (e.g. **BNB Testnet**), please refer to the [Cheat sheet](/cheat-sheet) to find the corresponding address and update both the _contract_ and _chain id_ variables in your project.

:::

## Connect wallet

The very first step in building any web3 application is to allow the user to connect to the app using its wallet, in this case the MetaMask wallet. Before interacting with a smart contract, the user must connect first to the application.

In this example you will be using [Ethers](https://docs.ethers.io/v5/) library since it will make things much easier when it comes to connecting with the wallet and interactiong with a smart contract.

The first function you need to write is the `connectWallet` function and to achieve that you have to install a couple of the packages:

```bash npm2yarn
npm install ethers @ethersproject/providers @metamask/detect-provider
```

Throughout the application you will be using the `provider` and `address` variables, so go ahead and declare them.

```tsx title="src/App.tsx"
/* State variable to store the provider */
const [provider, setProvider] = useState<Web3Provider | undefined>(undefined);

/* State variable to store the address */
const [address, setAddress] = useState<string | undefined>(undefined);
```

When writing the logic for the `connectWallet` function there are a couple of things to keep in mind:

-   detect the Ethereum provider injected by MetaMask;
-   wrap that injected provider into a `Web3Provider`;
-   trigger MetaMask wallet to pop up and ask for the permission to connect user accounts;
-   update the state of the variables;
-   a bit of error handling (e.g. when user rejects the connection);

```tsx title="src/App.tsx"
const connectWallet = async () => {
    try {
        /* Function to detect most providers injected at window.ethereum */
        const detectedProvider =
            (await detectEthereumProvider()) as ExternalProvider;

        /* Check if the Ethereum provider exists */
        if (!detectedProvider) {
            throw new Error("Please install MetaMask!");
        }

        /* Ethers Web3Provider wraps the standard Web3 provider injected by MetaMask */
        const web3Provider = new ethers.providers.Web3Provider(
            detectedProvider
        );

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
    } catch (error) {
        /* This error code indicates that the user rejected the connection */
        if (error.code === 4001) {
            /* Reset the state variables */
            setProvider(undefined);
            setAddress(undefined);
        } else {
            /* Display error message */
            alert(error.message);
            console.error(error);
        }
    }
};
```

There is one more important thing to implement. You also have to write the logic for a `checkNetwork` function. This is a function that will also be used throughout the application. Every single time the user uses its wallet, you have to make sure its on the correct network.

This application will be on top of **Goerli Testnet Network** so it's best to declare its chain id as a constant in the `helpers` directory and then imported it.

```tsx title="src/helpers/constants.ts"
const CHAIN_ID = 5; // Goerli Testnet Network chain id
```

When checking if the user is connected to the correct network, you mainly have to focus on what should be done if the user is not on the correct chain. The way to handle this is to help the user switch to the correct network and cover the case for when that network isn't in the wallet because you'll have to add it to MetaMask.

```tsx title="src/App.tsx"
const checkNetwork = async (provider: Web3Provider) => {
    try {
        /* Get the network from the provider */
        const network = await provider.getNetwork();

        /* Check if the network is the correct one */
        if (network.chainId !== CHAIN_ID) {
            /* Switch network if the chain id doesn't correspond to Goerli Testnet Network */
            await provider.send("wallet_switchEthereumChain", [
                { chainId: "0x" + CHAIN_ID.toString(16) },
            ]);
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
        } else {
            /* Throw the error */
            throw error;
        }
    }
};
```

Now that you have your function to check whether or not the user is on the correct network, you can put it in a `useEffect` and add `provider` and `address` as dependecies and the function will be called only after the user connected with its wallet.

```tsx title="src/App.tsx"
useEffect(() => {
    /* Check if the user connected with wallet */
    if (!(provider && address)) return;

    try {
        /* Function to check if the network is the correct one */
        checkNetwork(provider);
    } catch (error) {
        /* Display error message */
        alert(error.message);
    }
}, [provider, address]);
```

For now, the `App` will just return a `button` to guide the user to connect with MetaMask and display the `address` once that connection is done. Further down the line you will update the app and add some style to make it beautiful.

```tsx title="src/App.tsx"
if (!address) {
    return <button onClick={connectWallet}>Connect with MetaMask</button>;
}

return (
    <div>
        <p>Connected with MetaMask</p>
        <p>Address: {address}</p>
    </div>
);
```

## Contract ABI

An ABI (Application Binary Interface) is a way to interact with a smart contract directly from the user's wallet. If you're unfamiliar with it take a couple of minutes to go over an [ABI's specification](https://docs.soliditylang.org/en/v0.8.17/abi-spec.html).

The ABI is simply a JSON file that needs to be imported into your project, and, the best part is that you only need to add the functions that you actually use in your app.

In this example you will be working with Link3 Profile NFT's ABI for the contract `0x57e12b7a5f38a7f9c23ebd0400e6e53f2a45f271`. Since you only need to create a profile and retrieve the profile id after the profile has been created, go ahead a create the .json file containing both the `createProfile` and the `getProfileIdByHandle` functions.

```json title="/src/abi/ProfileNFT.json"
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

Because `metadata` doesn't follow a specific schema, this allows developers to customize its structure as much as they want.

:::

This is how the interface for `metadata` looks like for this application:

```tsx title="src/types.ts"
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

## Create profile

As mentioned previously, you will be working with the Link3 Profile NFT which means that, for the profile creation, you'll need to have both the `contract` and the `operator` param, so add these constants and import them in your project.

```tsx title="src/helpers/constants.ts"
export const PROFILE_NFT_CONTRACT =
    "0x57e12b7a5f38a7f9c23ebd0400e6e53f2a45f271"; // Link3 ProfileNFT contract address

export const PROFILE_NFT_OPERATOR =
    "0x0000000000000000000000000000000000000000"; // Zero Address
```

Next up, you will create a `CreateProfileBtn` component that the user can click on to create its profile.

Before getting into the logic for the button, a couple of packages are needed: `@ngneat/falso` to generate fake data for the `metadata` object and `axios` for a function that will upload it to IPFS.

```bash npm2yarn
npm install axios @ngneat/falso
```

To construct the `metadata` object you will collect user input or make use of all the great functions that [False](https://ngneat.github.io/falso/) has to offer for generating fake data. Once the object is constructed, you will upload it to IPFS meaning that a function to do this is required.

```tsx title="src/helpers/functions.ts"
import axios from "axios";
import { IProfileMetadata } from "../types";

const apiKey = process.env.REACT_APP_PINATA_API_KEY;
const apiSecret = process.env.REACT_APP_PINATA_API_SECRET;

export const pinJSONToIPFS = async (json: IProfileMetadata) => {
    const data = JSON.stringify(json);
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

    return axios
        .post(url, data, {
            headers: {
                "Content-Type": "application/json",
                pinata_api_key: apiKey,
                pinata_secret_api_key: apiSecret,
            },
        })
        .then((response) => response.data.IpfsHash)
        .catch((error) => {
            throw error;
        });
};
```

Don't forget to create the `.env` file with your Pinata API key and API secret. If you don't have them, you can go to [Pinata docs](https://docs.pinata.cloud/master) to register and generate them for free. It will only take a couple of minutes.

```
REACT_APP_PINATA_API_KEY=
REACT_APP_PINATA_API_SECRET=
```

Declare state variables for `handle` and `profileID` because those will be neccessary later on after the profile is created.

```tsx title="src/App.tsx"
/* State variable to store the profile ID */
const [profileID, setProfileID] = useState<number | undefined>(undefined);

/* State variable to store the handle */
const [handle, setHandle] = useState<string | undefined>(undefined);
```

When writing the logic for the `CreateProfileBtn` button there are a couple of things to keep in mind:

-   collect user input and construct the metadata object;
-   upload the metadata to IPFS;
-   create the profile and get the profile id;
-   update the state of the variables;

```tsx title="src/components/CreateProfileBtn.tsx"
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import ProfileNFTABI from "../abi/ProfileNFT.json";
import {
    PROFILE_NFT_CONTRACT,
    PROFILE_NFT_OPERATOR,
} from "../helpers/constants";
import { pinJSONToIPFS } from "../helpers/functions";
import {
    randUserName,
    randAvatar,
    randPhrase,
    randFullName,
} from "@ngneat/falso";
import { IProfileMetadata } from "../types";

function CreateProfileBtn({
    provider,
    address,
    checkNetwork,
    setProfileID,
    setHandle,
    disabled,
}: {
    provider: Web3Provider | undefined;
    address: string | undefined;
    checkNetwork: (provider: Web3Provider) => Promise<void>;
    setProfileID: (profileID: number) => void;
    setHandle: (handle: string) => void;
    disabled: boolean;
}) {
    const handleOnClick = async () => {
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

            /* Set the handle in the state variable */
            setHandle(handle);

            /* Display success message */
            alert("Successfully created the profile!");
        } catch (error) {
            /* Display error message */
            alert(error.message);
        }
    };

    return (
        <button onClick={handleOnClick} disabled={disabled}>
            Create Profile
        </button>
    );
}

export default CreateProfileBtn;
```

Now you can import the `CreateProfileBtn` in the app and test it out.

```tsx title="src/App.tsx"
if (!address) {
    return <button onClick={connectWallet}>Connect with MetaMask</button>;
}

return (
    <div>
        <p>Connected with MetaMask</p>
        <p>Address: {address}</p>
        <CreateProfileBtn
            provider={provider}
            address={address}
            checkNetwork={checkNetwork}
            setProfileID={setProfileID}
            setHandle={setHandle}
            disabled={!provider}
        />
    </div>
);
```

If the profile was successfully created, you can verify the logged transaction hash on [goerli.etherscan.io](https://goerli.etherscan.io/).

![transaction hash](/img/v2/build-content-app-create-profile-tx.png)

You can also view the NFT for the profile on [testnets.opensea.io](https://testnets.opensea.io/). The Link3 Profile NFT contract is generating these beautiful SVGs for the NFTs, mints the profile NFT and then transfers it into the owner's wallet address.

![nft profile](/img/v2/build-content-app-create-profile-nft.png)

Great job! You've created your first profile! In the next section you will learn how to [Create an Essence NFT](/how-to/build-nft-sbt-platform/create-essence-nft).
