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
    query: `mutation loginGetMessage($domain:String!,$address:AddressEVM!) {
      loginGetMessage(input:{
        domain: $domain,
        address: $address
      }) {
        message
      }
    }`,
    variables: {
      domain: "cyberconnect.me",
      address: "0x803F69aE5f5D839071fcD712e25BF3c8c35B2664",
    },
    headers: {},
  },
  loginVerify: {
    query: `mutation loginVerify ($domain:String!,$address:AddressEVM!,$signature:String!) 
    {
      loginVerify(input:{
        domain:$domain,
        address:$address,
        signature:$signature
      }){
        accessToken
      }
    }`,
    variables: {
      domain: "cyberconnect.me",
      address: "0x927f355117721e0E8A7b5eA20002b65B8a551890",
      signature:
        "0x94f97dc981130aa6b7df130e08f660ddb4996f74118585eae14429e019b499043a42c8826850d50be197dffc0c7b51a5e20f90fe68067b72deb83e59fe25959c1b",
    },
    headers: {
      "X-API-KEY": "oK6TuroglIWefsTjnpT2D2Du7qeyGAe5",
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoiY3liZXJjb25uZWN0Lm1lIiwiYWRkcmVzcyI6IjB4OTI3ZjM1NTExNzcyMWUwRThBN2I1ZUEyMDAwMmI2NUI4YTU1MTg5MCIsImlzcyI6IkN5YmVyQ29ubmVjdCIsImV4cCI6MTY2NTA4NDU2MywiaWF0IjoxNjYyNDkyNTYzfQ.X3Y-gTTnsmpNRqkZ3vAAv3UOnHBb5WH5EZ2sOcJRPnw",
    },
  },
  registerSigningKey: {
    query: `mutation registerSigningKey($address:String!,$message:String!, $signature:String!) {
  registerSigningKey(input:{
    address:$address,
    message:$message,
    signature:$signature,
  }) {
    status
  }
}`,
    variables: {
      address: "0x927f355117721e0E8A7b5eA20002b65B8a551890",
      message: "",
      signature:
        "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEzOFJXfxXMzNYQ2OXqe/HA8R3Xd5TiT3ltZO5Hi3WQjxvkUBtXn7ZUPj5Qm6+lZoIVh8SWBxUVVt+S04q06PJlw==",
    },
    headers: {
      "X-API-KEY": "oK6TuroglIWefsTjnpT2D2Du7qeyGAe5",
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoiY3liZXJjb25uZWN0Lm1lIiwiYWRkcmVzcyI6IjB4OTI3ZjM1NTExNzcyMWUwRThBN2I1ZUEyMDAwMmI2NUI4YTU1MTg5MCIsImlzcyI6IkN5YmVyQ29ubmVjdCIsImV4cCI6MTY2NTA4NDU2MywiaWF0IjoxNjYyNDkyNTYzfQ.X3Y-gTTnsmpNRqkZ3vAAv3UOnHBb5WH5EZ2sOcJRPnw",
    },
  },
  getAddressByEVMWallet: {
    query: `query address($address: AddressEVM!){
      address(address: $address) {
        address
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
      address: "0x5fd9b0B7e15B4d106624ea9CF96602996c9c344D",
    },
    headers: {},
  },
  batchGetAddressByEVMWallet: {
    query: `query batchGetAddressByEVMWallet($addresses: [AddressEVM!]!) {
      batchGetAddresses (addresses: $addresses) {
        address
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
        "0x5fd9b0B7e15B4d106624ea9CF96602996c9c344D",
        "0xb54B03CFca57624d360C2182d4e053b3fdE14392",
      ],
    },
    headers: {},
  },
  listProfilesOwnedByAddress: {
    query: `query getProfilesbyOwner($address: AddressEVM!) {
      address(address: $address) {
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
                }
              }
            }
          }
        }
      }
    }`,
    variables: {
      address: "0x5fd9b0B7e15B4d106624ea9CF96602996c9c344D",
    },
    headers: {},
  },
  getProfileByHandle: {
    query: `query getProfileByHandle($handle: String!){
      profileByHandle(handle: $handle) {
        metadataInfo {
          avatar
          bio
        }
        owner {
          address
        }
        isPrimary
      }
    }`,
    variables: {
      handle: "ryan",
    },
    headers: {},
  },
  getAddressIdentity: {
    query: `query getAddressIdentity($address: AddressEVM!
 ){
  address(address: $address) {
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
    },
    headers: {},
  },
  getFollowersByAddressEVM: {
    query: `query getFollowersByAddressEVM($address: AddressEVM!){
  address(address: $address) {
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
    },
    headers: {},
  },
  getFollowersByHandle: {
    query: `query getFollowersByHandle($handle: String!, $me: AddressEVM!) {
      profileByHandle(handle: $handle) {
        followerCount
        isFollowedByMe(me: $me)
        followers {
          totalCount
          pageInfo {
            hasPreviousPage
            startCursor
            hasNextPage
          }
        }
      }
    }`,
    variables: {
      handle: "shiyu",
      me: "0xD790D1711A9dCb3970F47fd775f2f9A2f0bCc348",
    },
    headers: {},
  },
  getFollowingsByAddressEVM: {
    query: `query getFollowingsByAddressEVM($address: AddressEVM!, ) {
      address(address: $address) {
        followingCount
        followings {
          totalCount
          edges {
            node {
              address {
                address
              }
            }
          }
          pageInfo {
            hasPreviousPage
            startCursor
            hasNextPage
          }
        }
      }
    }`,
    variables: {
      address: "0x148D59faF10b52063071eDdf4Aaf63A395f2d41c",
    },
    headers: {},
  },
  verifyEssenceMetadata: {
    query: `query verifyEssenceMetadata($version: String!,
      $name: String!, $app_id: String!, $metadata_id: String!, $lang: String) {
       verifyEssenceMetadata(input: {
         version: $version
         name: $name
         app_id: $app_id
         lang: $lang
         metadata_id: $metadata_id
       }) {
         verified
       }
     }`,
    variables: {
      version: "1.0.0",
      name: "Link3 event token",
      app_id: "Link3",
      lang: "EN",
      metadata_id: "uuid",
    },
    headers: {},
  },
  getSubscribingByAddressEVM: {
    query: `query getSubscribingByAddressEVM($address: AddressEVM!){
      address(address: $address) {
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
      address: "0xb54B03CFca57624d360C2182d4e053b3fdE14392",
    },
    headers: {},
  },
  getSubscribersByProfile: {
    query: `query getSubscribersByProfile($address: AddressEVM!){
      address(address: $address) {
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
      address: "0x3C858197112C0db082cf4F4e63C587FC258bc805",
    },
    headers: {},
  },
  getCollectedEssencesByAddressEVM: {
    query: `query getCollectedEssencesByAddressEVM($address: AddressEVM!){
      address(address: $address) {
        wallet {
          collectedEssences(first: 4){
            edges{
              node{
                tokenID
                wallet{
                  address
                  
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
      address: "0x5fd9b0B7e15B4d106624ea9CF96602996c9c344D",
    },
    headers: {},
  },
  relay: {
    query: `mutation callRelay($input: RelayInput!) {
	  relay(input: $input) {
		  relayActionId
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
      "X-API-KEY": "oK6TuroglIWefsTjnpT2D2Du7qeyGAe5",
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  relayActionStatus: {
    query: `query getRelayActionStatus($relayActionId: ID!) {
      relayActionStatus(relayActionId: $relayActionId) {
        ... on RelayActionStatusResult {
          txHash
          txStatus
        }
        ... on RelayActionQueued {
          queuedAt
          reason
        }
        ... on RelayActionError {
          reason
          lastKnownTxHash
        }
      }
    }`,
    variables: {
      relayActionId: "167503724722",
    },
    headers: {
      "X-API-KEY": "oK6TuroglIWefsTjnpT2D2Du7qeyGAe5",
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  createSubscribeTypedData: {
    query: `mutation createSubscribeTypedData($input: CreateSubscribeTypedDataInput!) {
    createSubscribeTypedData(input: $input) {
        typedData {
            id
            sender
            data
            nonce
        }
    }
}`,
    variables: {
      input: {
        profileIDs: [26],
      },
    },
    headers: {
      "X-API-KEY": "oK6TuroglIWefsTjnpT2D2Du7qeyGAe5",
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  createRegisterEssenceTypedData: {
    query: `mutation createRegisterEssenceTypedData($input: CreateRegisterEssenceTypedDataInput!) {
    createRegisterEssenceTypedData(input: $input) {
        typedData {
            id
            sender
            data
            nonce
        }
    }
}`,
    variables: {
      input: {
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
      "X-API-KEY": "oK6TuroglIWefsTjnpT2D2Du7qeyGAe5",
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  CreateCollectEssenceTypedData: {
    query: `mutation CreateCollectEssenceTypedData($input: CreateCollectEssenceTypedDataInput!) {
    createCollectEssenceTypedData(input: $input) {
        typedData {
            id
            sender
            data
            nonce
        }
    }
}`,
    variables: {
      input: {
        collector: "0x3C858197112C0db082cf4F4e63C587FC258bc805",
        profileID: 2,
        essenceID: 1,
      },
    },
    headers: {
      "X-API-KEY": "oK6TuroglIWefsTjnpT2D2Du7qeyGAe5",
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  createSetSubscribeDataTypedData: {
    query: `mutation createSetSubscribeDataTypedData($input: CreateSetSubscribeDataTypedDataInput!) {
      createSetSubscribeDataTypedData(input: $input) {
          typedData {
              id
              sender
              data
              nonce
          }
      }
  }`,
    variables: {
      input: {
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
      "X-API-KEY": "oK6TuroglIWefsTjnpT2D2Du7qeyGAe5",
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  createSetEssenceDataTypedData: {
    query: `mutation createSetEssenceDataTypedData($input: CreateSetEssenceDataTypedDataInput!) {
      createSetEssenceDataTypedData(input: $input) {
          typedData {
              id
              sender
              data
              nonce
          }
      }
  }`,
    variables: {
      input: {
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
      "X-API-KEY": "oK6TuroglIWefsTjnpT2D2Du7qeyGAe5",
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getLink3ProfileData: {
    query: `query getLink3ProfileData($handle: String!) {
  profileByHandle(handle: $handle) {
    externalMetadataInfo {
      type
      verifiedTwitterID
      organization {
        cmcTokenId
        sector
        networks
      }
      personal {
        verifiedDiscordID
        title
        organization {
          id
          handle
          name
          avatar
        }
      }
      section {
        type
        name
      }
    }
  }
}
`,
    variables: {
      handle: "ryan",
    },
    headers: {},
  },
  getCCLabelsDetailed: {
    query: `query getCCLabelsDetailed($address: AddressEVM!, $chainID: ChainID!)
    {
      address(address:$address) {
        wallet {
          metadata(chainID:$chainID) {
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
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
      chainID: 1,
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getCCLabels: {
    query: `query getCCLabels($address:AddressEVM!,$chainID:ChainID!)
    {
      address(address:$address) {
        address
        wallet {
          metadata(chainID:$chainID) {
            labels
          }
          
        }
      }
    }
    
`,
    variables: {
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
      chainID: 1,
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getTokenBalanceInfo: {
    query: `query getTokenBalanceInfo($address:AddressEVM!, $chainId: ChainID!)
    {
    address(address: $address) {
        wallet {
          recommendation(chainID: $chainId) {
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
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
      chainId: 1,
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getUserRecommendation: {
    query: `query getUserRecommendation($address: AddressEVM!, $chainId: ChainID!) {
      address(address: $address) {
        wallet   
         {
          recommendation(chainID: $chainId) {
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
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
      chainId: 1,
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getTokenRecommendation: {
    query: `query GetTokenRecommendation($address:AddressEVM!, $chainId: ChainID!)
    {
    address(address: $address) {
      wallet {    
          recommendation(chainID: $chainId) {
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
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
      chainId: 1,
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getUserFeed: {
    query: `query getUserFeed($address: AddressEVM!) {
      address(address: $address) {
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
      address: "0x7C04786F04c522ca664Bb8b6804E0d182eec505F",
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getPostById: {
    query: `query getPost($id: String!) {
      post(id: $id){
        id
        author
        title
        body
        createdAt
        updatedAt
        arweaveTxHash
      }
    }
    `,
    variables: {
      id: "b39cc6650e8697ff304af06135a785f6687dbee3ffd25e7d55c5e45cf04c9b1d",
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getPostByAddress: {
    query: ` query getPostByAddress(
      $address: AddressEVM!
    ) {
      address(address: $address) {
      posts(first: 10) {
        totalCount
        edges {
          node {
            id
            author
            title
            body
            digest
            arweaveTxHash
            createdAt
            updatedAt
          }
        }
      }
      }
    }
      `,
    variables: {
      address: "0x370CA01D7314e3EEa59d57E343323bB7e9De24C6",
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getLikeByAddress: {
    query: `  query PrimaryProfileEssences(
      $address: AddressEVM!
    ) {
      address(address: $address) {
        likes {
          totalCount
          edges {
            node {
              id
              author
              handle
              title
              body
              digest
              arweaveTxHash
              createdAt
              updatedAt
              likeCount
              dislikeCount
              likedStatus(me: $address) {
              liked
              disliked
              proof {
                content
                digest
                signature
                signingKey
                signingKeyAuth {
                  address
                  message
                  signature
                  }
                arweaveTxHash
              }
            }
            }
          }
        }
         }
      }`,
    variables: {
      address: "0x370CA01D7314e3EEa59d57E343323bB7e9De24C6",
    },
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFpbl9pZCI6MSwiZG9tYWluIjoidGVzdC5jb20iLCJhZGRyZXNzIjoiMHgzQzg1ODE5NzExMkMwZGIwODJjZjRGNGU2M0M1ODdGQzI1OGJjODA1IiwiaXNzIjoiQ3liZXJDb25uZWN0IiwiZXhwIjoxNjY2NTQyNjYwLCJpYXQiOjE2NjM5NTA2NjB9.xDWQ0IpM6iuMTnjSm1JbXOFxplAa5IKitadnkPqxQqM",
    },
  },
  getLikeStatusFromPost: {
    query: `query GetPostByPostId($id: String!, $address: AddressEVM!) {
      post(id: $id){
        id
        author
        handle
        title
        body
        digest
        arweaveTxHash
        createdAt
        updatedAt
        likeCount
        dislikeCount
        likedStatus(me: $address) {
          liked
          disliked
          proof {
            content
            digest
            signature
            signingKey
            signingKeyAuth {
              address
              message
              signature
            }
            arweaveTxHash
          }
        }
      }
    }`,
    variables: {
      id: "18f25e0839762a1dc8cf4e74dc1099ba9accf9b2e805dd9898e3a8c545abe29a",
      address: "0x370CA01D7314e3EEa59d57E343323bB7e9De24C6",
    },
    headers: {
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

export function ApolloCardProduction({
  queryName,
}: {
  queryName: string;
}): JSX.Element {
  return (
    <ApolloExplorer
      graphRef="Cyberconnect-Gaia-Prd-1fhjvq@current"
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
