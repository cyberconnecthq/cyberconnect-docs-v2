Data stored offchain are all signed with a signing key belonging to each user. Users will need to create a ECDSA P256 (also known as`secp256r1` and `ES256`) key pair to operate on CyberConnect’s decentralized data store with sovereignty.

Here is the reference doc [**Proof of Connection**](https://www.notion.so/Proof-of-Connection-c5334def58e14f9b86375e57dd64413e).

To create a key pair, you could use the following `openssl` command.

1. Generate public and private keys.

```
openssl ecparam -genkey -name prime256v1 -noout -out private.pem
openssl ec -in private.pem -pubout -out public.pem
```

```
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIBsl8YngX7uLkp8yWQcdHjceD4FKYpUi6zsnaLrMOsU3oAoGCCqGSM49
AwEHoUQDQgAEnea0iASyPC2cp/fcuPLnu+xHKkSeo9St2B8gvrhwW3GxcoGELL4a
/vUHUopa8U7HEDD1MiNFyYuspYfZgRkc7A==
-----END EC PRIVATE KEY-----

-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEnea0iASyPC2cp/fcuPLnu+xHKkSe
o9St2B8gvrhwW3GxcoGELL4a/vUHUopa8U7HEDD1MiNFyYuspYfZgRkc7A==
-----END PUBLIC KEY-----
```

1. Send `registerSigningKey` request.

[Run in Postman](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/request/20133006-792f3ffa-f177-4a2a-9096-2342a93a56c2) [Example](https://www.postman.com/cyberconnect-v2/workspace/cyberconnect-v2/example/20133006-79261131-093e-441f-b6c9-ac53269c8d2a)

## Next Step

Keep your private key for later use (Sign `follow` and `unfollow` messages).
