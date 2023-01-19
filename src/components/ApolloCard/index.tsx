import React from "react";
import { ApolloExplorer } from "@apollo/explorer/react";

const apolloData = {
  createAPIKey: {
    query: `mutation createAPIKey($email:String!, $origin:String!, $twitterid:String!) {
  createAPIKey(input:{
    email: $email ,
    twitterID: $twitterid,
    origin: $origin,
  }) {
    apiKey
  }
}`,
    variables: {
      email: "hi@cyberconnect.me",
      origin: "cyberconnect.me",
      twitterid: "@cyberconnecthq",
    },
    headers: {},
  },
  loginGetMessage: {
    query: `mutation loginGetMessage($domain:String!,$address:AddressEVM!,  $chainID:ChainID! ) {
  loginGetMessage(input:{
    domain: $domain ,
    address: $address,
    chainID: $chainID
  }) {
    message
  }
}`,
    variables: {
      domain: "cyberconnect.me",
      address: "0x803F69aE5f5D839071fcD712e25BF3c8c35B2664",
      chainID: 1,
    },
    headers: {},
  },
  loginVerify: {
    query: `mutation loginVerify($domain:String!,$address:AddressEVM!,  $chainID:ChainID!, $signature:String!) 
{
  loginVerify(input:{
    domain:$domain,
    address:$address,
    chainID:$chainID,
    signature:$signature
  }){
    accessToken
  }
}`,
    variables: {
      domain: "cyberconnect.me",
      address: "0x927f355117721e0E8A7b5eA20002b65B8a551890",
      chainID: 1,
      signature:
        "0x94f97dc981130aa6b7df130e08f660ddb4996f74118585eae14429e019b499043a42c8826850d50be197dffc0c7b51a5e20f90fe68067b72deb83e59fe25959c1b",
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoiY3liZXJjb25uZWN0Lm1lIiwiYWRkcmVzcyI6IjB4OTI3ZjM1NTExNzcyMWUwRThBN2I1ZUEyMDAwMmI2NUI4YTU1MTg5MCIsImlzcyI6IkN5YmVyQ29ubmVjdCIsImV4cCI6MTY2NTA4NDU2MywiaWF0IjoxNjYyNDkyNTYzfQ.X3Y-gTTnsmpNRqkZ3vAAv3UOnHBb5WH5EZ2sOcJRPnw",
    },
  },
  registerSigningKey: {
    query: `mutation registerSigningKey($address:String!, $pubKey:String!) {
  registerSigningKey(input:{
    address:$address,
    pubKey:$pubKey,
  }) {
    success
  }
}`,
    variables: {
      address: "0x927f355117721e0E8A7b5eA20002b65B8a551890",
      pubKey:
        "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEzOFJXfxXMzNYQ2OXqe/HA8R3Xd5TiT3ltZO5Hi3WQjxvkUBtXn7ZUPj5Qm6+lZoIVh8SWBxUVVt+S04q06PJlw==",
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoiY3liZXJjb25uZWN0Lm1lIiwiYWRkcmVzcyI6IjB4OTI3ZjM1NTExNzcyMWUwRThBN2I1ZUEyMDAwMmI2NUI4YTU1MTg5MCIsImlzcyI6IkN5YmVyQ29ubmVjdCIsImV4cCI6MTY2NTA4NDU2MywiaWF0IjoxNjYyNDkyNTYzfQ.X3Y-gTTnsmpNRqkZ3vAAv3UOnHBb5WH5EZ2sOcJRPnw",
    },
  },
  getAddressByEVMWallet: {
    query: `query address($address: AddressEVM!, $chainID: ChainID!){
  address(address: $address, chainID: $chainID) {
    address
    chainID
    wallet {
      profiles {
      edges {
        node {
          id
        }
      }
    }
    }
  }
}`,
    variables: {
      address: "0x7c04786f04c522ca664bb8b6804e0d182eec505f",
      chainID: 1,
    },
    headers: {},
  },
  batchGetAddressByEVMWallet: {
    query: `query batchGetAddressByEVMWallet($addresses: [AddressEVM!]!,
$chainID: ChainID!) {
  batchGetAddresses (addresses: $addresses, chainID: $chainID) {
    address
    chainID
    wallet {
      profiles {
      edges {
        node {
          id
        }
      }
    }
    }
  }
}`,
    variables: {
      addresses: [
        "0x7c04786f04c522ca664bb8b6804e0d182eec505f",
        "0x1C0E779f50B8A6443b6f8CCaE5ea07986d5588F5",
      ],
      chainID: 1,
    },
    headers: {},
  },
  listProfilesOwnedByAddress: {
    query: `query getProfilesbyOwner($address: AddressEVM!,
 $chainID: ChainID!) {
  address(address: $address,
   chainID: $chainID) {
    wallet {
      profiles(first:5) {
        edges {
          node {
            profileID
            isPrimary
            handle
            avatar
            owner {
              address
            }
            namespace{
                name
                contractAddress
                chainID
            }
          }
        }
      }
    }
  }
}`,
    variables: {
      address: "0x09937314c9dBd33c340f9735123A2c6586Fa1cdF",
      chainID: 5,
    },
    headers: {},
  },
  getProfileByHandle: {
    query: `query getProfileByHandle($chainID: ChainID, $handle: String!){
  profileByHandle(chainID: $chainID, handle: $handle) {
    avatar
    owner {
      address
    }
    isPrimary
  }
}`,
    variables: {
      chainID: 1,
      handle: "ryan",
    },
    headers: {},
  },
  getAddressIdentity: {
    query: `query getAddressIdentity($address: AddressEVM!,
 $chainID: ChainID!){
  address(address: $address, chainID: $chainID) {
    identity{
      socialInfo{
        github{
          username
        }
        twitter{
          handle
        }
      }
      ens{
        domain
      }
    }
  }
}`,
    variables: {
      address: "0x148D59faF10b52063071eDdf4Aaf63A395f2d41c",
      chainID: 1,
    },
    headers: {},
  },
  getFollowersByAddressEVM: {
    query: `query getFollowersByAddressEVM($address: AddressEVM!,
 $chainID: ChainID!){
  address(address: $address, chainID: $chainID) {
    followers(limit: 5) {
      totalCount
      edges{
        node{
          from {
            address
          }
          to {
            address
          }
        }
      }
    }
    followStats {
      followerCount
    }
  }
}`,
    variables: {
      address: "0x148D59faF10b52063071eDdf4Aaf63A395f2d41c",
      chainID: 1,
    },
    headers: {},
  },
  getFollowingsByAddressEVM: {
    query: `query getFollowingsByAddressEVM($address: AddressEVM!,
 $chainID: ChainID!){
  address(address: $address, chainID: $chainID) {
    followings(limit: 5) {
      totalCount
      edges{
        node{
          from {
            address
          }
          to {
            address
          }
        }
      }
    }
    followStats {
      followingCount
    }
  }
}`,
    variables: {
      address: "0x148D59faF10b52063071eDdf4Aaf63A395f2d41c",
      chainID: 1,
    },
    headers: {},
  },
  verifyEssenceMetadata: {
    query: `query verifyEssenceMetadata($version: String!,
 $name: String!, $app_id: String, $lang: String) {
  verifyEssenceMetadata(input: {
    version: $version
    name: $name
    app_id: $app_id
    lang: $lang
  }) {
    verified
  }
}`,
    variables: {
      version: "1.0.0",
      name: "Link3 event token",
      app_id: "Link3",
      lang: "EN",
    },
    headers: {},
  },
  getSubscribingByAddressEVM: {
    query: `query getSubscribingByAddressEVM($address: AddressEVM!,
 $chainID: ChainID!){
  address(address: $address, chainID: $chainID) {
    wallet {
      subscribings {
        totalCount
        edges {
          node {
            profile {
              id
              profileID
              handle
              owner {
                address
              }
              avatar
              isPrimary
            }
          }
        }
      }
    }
  }
}`,
    variables: {
      address: "0x09937314c9dBd33c340f9735123A2c6586Fa1cdF",
      chainID: 5,
    },
    headers: {},
  },
  getSubscribersByProfile: {
    query: `query getSubscribersByProfile($address: AddressEVM!,
 $chainID: ChainID!){
  address(address: $address, chainID: $chainID) {
    wallet {
      profiles(first:1) {
        edges {
          node {
            id
            profileID
            isPrimary
            handle
            avatar
            owner {
              address
            }
            subscribers(first:5) {
              totalCount
              edges {
                node {
                  profile {
                    handle
                    avatar
                  }
                  wallet {
                    address
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`,
    variables: {
      address: "0x09937314c9dBd33c340f9735123A2c6586Fa1cdF",
      chainID: 5,
    },
    headers: {},
  },
  getCollectedEssencesByAddressEVM: {
    query: `query getCollectedEssencesByAddressEVM($address: AddressEVM!,
 $chainID: ChainID!){
  address(address: $address, chainID: $chainID) {
    wallet {
			collectedEssences(first: 4){
        edges{
          node{
            tokenID
            wallet{
              address
              chainID
              
            }
            essence{
              essenceID
              name
              tokenURI
              createdBy{
                profileID
                handle
              }
            }
          }
        }
      }
    }
  }
}`,
    variables: {
      address: "0x09937314c9dBd33c340f9735123A2c6586Fa1cdF",
      chainID: 5,
    },
    headers: {},
  },
  relay: {
    query: `mutation callRelay($input: RelayInput!) {
	relay(input: $input) {
		relayTransaction {
			id
			txHash
			typedData {
				id
				chainID
				sender
				data
				nonce
			}
		}
	}
}`,
    variables: {
      input: {
        typedDataID: "167503724722",
        signature:
          "0x45693cd3bff6815d5f54b89537ff7a753f627f99c7a08253d9272b2ed0bf93a12be14c164ea9770060c94b487245da8de00893e3f6e615685ab5f4ef2d29916f1c",
      },
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  createSubscribeTypedData: {
    query: `mutation createSubscribeTypedData($input: CreateSubscribeTypedDataInput!) {
    createSubscribeTypedData(input: $input) {
        typedData {
            id
            chainID
            sender
            data
            nonce
        }
    }
}`,
    variables: {
      input: {
        options: {
          chainID: 5,
        },
        profileIDs: [26],
      },
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  createRegisterEssenceTypedData: {
    query: `mutation createRegisterEssenceTypedData($input: CreateRegisterEssenceTypedDataInput!) {
    createRegisterEssenceTypedData(input: $input) {
        typedData {
            id
            chainID
            sender
            data
            nonce
        }
    }
}`,
    variables: {
      input: {
        options: {
          chainID: 5,
        },
        profileID: 25,
        name: "Essence",
        symbol: "ESSENCE",
        tokenURI:
          "https://cyberconnect.mypinata.cloud/ipfs/QmWeusbdbY2SEry1GEiJpmzd3Frp29wMNS3ZbNN21hLbVw",
        middleware: {
          collectFree: true,
        },
        transferable: true,
      },
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  CreateCollectEssenceTypedData: {
    query: `mutation CreateCollectEssenceTypedData($input: CreateCollectEssenceTypedDataInput!) {
    createCollectEssenceTypedData(input: $input) {
        typedData {
            id
            chainID
            sender
            data
            nonce
        }
    }
}`,
    variables: {
      input: {
        options: {
          chainID: 5,
        },
        collector: "0x3C858197112C0db082cf4F4e63C587FC258bc805",
        profileID: 2,
        essenceID: 1,
      },
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  createSetSubscribeDataTypedData: {
    query: `mutation createSetSubscribeDataTypedData($input: CreateSetSubscribeDataTypedDataInput!) {
      createSetSubscribeDataTypedData(input: $input) {
          typedData {
              id
              chainID
              sender
              data
              nonce
          }
      }
  }`,
    variables: {
      input: {
        options: {
          chainID: 5,
        },
        profileId: 2,
        tokenURI:
          "https://cyberconnect.mypinata.cloud/ipfs/QmfLgghGBvB3nu2jJEkMf9zPsEMPdJdhhcKHz32NnF67C2",
        middleware: {
          subscribePaid: {
            amount: 10,
            recipient: "0x09937314c9dBd33c340f9735123A2c6586Fa1cdF",
            currency: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
            nftRequired: false,
            nftAddress: "0x0000000000000000000000000000000000000000",
          },
        },
      },
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  createSetEssenceDataTypedData: {
    query: `mutation createSetEssenceDataTypedData($input: CreateSetEssenceDataTypedDataInput!) {
      createSetEssenceDataTypedData(input: $input) {
          typedData {
              id
              chainID
              sender
              data
              nonce
          }
      }
  }`,
    variables: {
      input: {
        options: {
          chainID: 5,
        },
        profileId: 2,
        essenceId: 1,
        tokenURI:
          "https://cyberconnect.mypinata.cloud/ipfs/QmfLgghGBvB3nu2jJEkMf9zPsEMPdJdhhcKHz32NnF67C2",
        middleware: {
          collectPaid: {
            totalSupply: 10,
            amount: 10,
            recipient: "0x09937314c9dBd33c340f9735123A2c6586Fa1cdF",
            currency: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
            subscribeRequired: false,
          },
        },
      },
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getLink3ProfileData: {
    query: `query getLink3ProfileData($chainID: ChainID, $handle: String!) {
  profileByHandle(chainID: $chainID, handle: $handle) {
    externalMetadataInfo {
      type
      handle
      displayName {
        type
        value
      }
      avatar {
        type
        nfts {
          chainId
          contract
          tokenId
          type
          name
          image
          owner
        }
        image
      }
      background {
        type
        nfts {
          chainId
          contract
          tokenId
          type
          name
          image
          owner
        }
        image
      }
      bio
      organization {
        twitterId
        verified
        followersCount
        cmcTokenId
        sector
        networks
      }
      personal {
        headline {
          twitter {
            id
            handle
            name
            avatar
          }
          title
        }
      }
      section {
        type
        name
        links {
          title
          link
        }
        superLinks {
          type
          title
          link
          description
          image
        }
        mentions {
          twitter {
            id
            handle
            name
            avatar
          }
          title
          description
        }
        galaxyCredentials {
          id
          name
        }
        poaps {
          id
          image
        }
        nfts {
          chainId
          contract
          tokenId
          type
          name
          image
          owner
        }
        w3sts {
          tokenUri
        }
      }
    }
  }
}
`,
    variables: {
      chainID: 1,
      handle: "ryan",
    },
    headers: {},
  },
  getCCLabelsDetailed: {
    query: `query getCCLabelsDetailed($address: AddressEVM!, $chainID: ChainID!)
    {
      address(address:$address, chainID:$chainID) {
        wallet {
          metadata {
            projectInteractionStats {
              project
              txCount
              numSent
              numReceived
              firstInteraction
              lastInteraction
              sampleTxHashes
            }
          }
        }
      }
    } 
`,
    variables: {
      chainID: 1,
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
    },
    headers:{
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getCCLabels: {
    query: `query getCCLabels($address:AddressEVM!, $chainID:ChainID!)
    {
      address(address:$address, chainID:$chainID) {
        address
        wallet {
          metadata {
            labels
          }
          
        }
      }
    }
    
`,
    variables: {
      chainID: 1,
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
    },
    headers:{
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getCCLabels: {
    query: `query getCCLabels($address:AddressEVM!, $chainID:ChainID!)
    {
      address(address:$address, chainID:$chainID) {
        address
        wallet {
          metadata {
            labels
          }
          
        }
      }
    }
    
`,
    variables: {
      chainID: 1,
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
    },
    headers:{
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getTokenBalanceInfo: {
    query: `query getTokenBalanceInfo($address:AddressEVM!, $chainID:ChainID!)
    {
    address(address: $address, chainID:$chainID) {
        wallet {
          recommendation {
            tokenBalanceInfo {
              token {
                ... on ERC721 {
                  name
                  contractAddress
                  contract_creation_time
                  block_number
                }
                ... on ERC1155 {
                  name
                  contractAddress
                  contract_creation_time
                  block_number
                }
                ... on ERC20 {
                  name
                  contractAddress
                  contract_creation_time
                  block_number 
                }
              }
              tokenLogo
              twitter
              homepage
              etherscan_labels
              etherscan_token_contractnames
              etherscan_acccount_contractnames
              trustwallet_tags
              dune_category
              coingecko_categories
              blog
              medium
              github_organization
              github
              subreddit_url
              telegram_channel_url
              facebook_page
              discord
              total_supply
              description
              banner_image_url
              opensea_status
            }
           
          }
        }
      }
    }    
`,
    variables: {
      chainID: 1,
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
    },
    headers:{
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getUserRecommendation: {
    query: `query getUserRecommendation($address: AddressEVM!, $chainId: ChainID!) {
      address(address: $address, chainID: $chainId) {
        wallet   
         {
          recommendation {
            userRecommendation {
              userToFollow
              userToFollowRank
              userToFollowDistanceScore
              userToFollowReason
            }
          }
        }
      }
    }
    
`,
    variables: {
      chainID: 1,
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
    },
    headers:{
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getTokenRecommendation: {
    query: `query GetTokenRecommendation($address:AddressEVM!, $chainId: ChainID!)
    {
    address(address: $address, chainID: $chainId) {
      wallet {    
          recommendation {
            tokenRecommendation {
              rank
              tokenInfo {
                token {
                  ... on ERC721 {
                    name
                    symbol
                    contractAddress
                  }
                  }
                
                tokenLogo
                twitter
                homepage
                etherscan_labels
                etherscan_token_contractnames
              }
            }
           
          }
        }
      }
      }
`,
    variables: {
      chainID: 1,
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
    },
    headers:{
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getUserFeed: {
    query: `query getUserFeed($address: AddressEVM!, $chainID: ChainID!) {
      address(address: $address, chainID: $chainID) {
        wallet {
          feed {
            evt_type
            token_standard
            evt_block_time
            token_address
            tx_hash
            amount
            tokenId
            token {
              token {
                ... on ERC721 {
                  name
                  contractAddress
                  contract_creation_time
                  block_number
                }
                ... on ERC1155 {
                  name
                  contractAddress
                  contract_creation_time
                  block_number
                }
                ... on ERC20 {
                  name
                  contractAddress
                  contract_creation_time
                  block_number
                }
              }
              tokenLogo
              twitter
              homepage
              etherscan_labels
              etherscan_token_contractnames
              etherscan_acccount_contractnames
              trustwallet_tags
              dune_category
              coingecko_categories
              blog
              medium
              github_organization
              github
              subreddit_url
              telegram_channel_url
              facebook_page
              discord
              total_supply
              description
              banner_image_url
              opensea_status
            }
          }
        }
      }
    }
`,
    variables: {
      chainID: 1,
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
    },
    headers:{
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
};

export default function ApolloCard({
  queryName,
}: {
  queryName: string;
}): JSX.Element {
  return (
    <ApolloExplorer
      graphRef="Cyberconnect-Gaia-Stg-6ewjtr@current"
      persistExplorerState={false}
      initialState={{
        document: apolloData[queryName].query,
        variables: apolloData[queryName].variables,
        headers: apolloData[queryName].headers,
        displayOptions: {
          showHeadersAndEnvVars: true,
          docsPanelState: "closed",
          theme: "light",
        },
      }}
    />
  );
}
