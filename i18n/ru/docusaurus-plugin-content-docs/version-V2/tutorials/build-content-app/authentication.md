---
id: authentication
title: Аутентификация
slug: /how-to/build-content-app/authentication
sidebar_label: Аутентификация
sidebar_position: 3
description: Как создать контент приложение - Аутентификация
---

Для аутентификации вы фактически будете реализовывать поток [Входа пользователя](/guides/authentication/user-login) для получения `accessToken`, который позже будет использоваться для различных запросов и мутаций.

## Apollo Client

Сначала, вам нужно настроить `ApolloClient`, потому что всякий раз, когда вы делаете запрос, вам нужно передать `accessToken` в HTTP заголовке `Authorization`.

```tsx title="apollo/index.tsx"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "https://api.stg.cyberconnect.dev/",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("accessToken");

    return {
        headers: {
            ...headers,
            Authorization: token ? `bearer ${token}` : "",
        },
    };
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
```

## Мутации GraphQL

После настройки `ApolloClient`, вам нужно написать мутации GraphQL, необходимые для потока входа в систему:

1. Первая мутация заключается в запросе сообщения, которое пользователь подпишет с помощью своего кошелька MetaMask:

```tsx title="graphql/LoginGetMessage.ts"
import { gql } from "@apollo/client";

export const LOGIN_GET_MESSAGE = gql`
    mutation LoginGetMessage($input: LoginGetMessageInput!) {
        loginGetMessage(input: $input) {
            message
        }
    }
`;
```

2. Вторая мутация заключается в проверке подписанного сообщения:

```tsx title="graphql/LoginVerify.ts"
import { gql } from "@apollo/client";

export const LOGIN_VERIFY = gql`
    mutation LoginVerify($input: LoginVerifyInput!) {
        loginVerify(input: $input) {
            accessToken
        }
    }
`;
```

## Вход

Теперь, когда у вас есть необходимые мутации GraphQL, вам нужно только включить эти шаги в функцию, следуя пользовательскому потоку, описанному ранее.

```tsx title="components/SigninBtn.tsx"
/* Получите сообщение с сервера */
const messageResult = await loginGetMessage({
    variables: {
        input: {
            address: account,
            domain: DOMAIN,
            chainID: chainID,
        },
    },
});
const message = messageResult?.data?.loginGetMessage?.message;

/* Получите подпись для сообщения, подписанного кошельком */
const signature = await signer.signMessage(message);

/* Проверьте подпись на сервере и получите токен доступа */
const accessTokenResult = await loginVerify({
    variables: {
        input: {
            address: account,
            domain: DOMAIN,
            chainID: chainID,
            signature: signature,
        },
    },
});
const accessToken = accessTokenResult?.data?.loginVerify?.accessToken;
```

Теперь, когда у вас есть токен доступа, вы сможете выполнять запросы и мутации, которые позволят вам добавить множество функций в ваше приложение.

Далее мы рассмотрим реализацию функции [Подписки на профиль](/how-to/build-content-app/subscribe-to-profile).