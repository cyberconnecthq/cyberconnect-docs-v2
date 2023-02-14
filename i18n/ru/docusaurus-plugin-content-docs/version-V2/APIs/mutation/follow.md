---
id: follow
title: Следовать (Follow)
slug: /guides/mutation/follow
sidebar_label: Следовать
sidebar_position: 1
description: Мутации - Следовать
---

## Рабочий процесс

1. Создайте строку json `operation`, как показано ниже. Замените поля `from` адрес, `to` адрес и текущий `timestamp` надлежащими данными.

```graphql
”{\"name\":\"follow\",\"from\":\"0x803F69aE5f5D839071fcD712e25BF3c8c35B2664\",\"to\":\"0xab7824a05ef372c95b9cfeb4a8be487a0d5d8ecb\",\"namespace\":\"Link3\",\"network\":\"ETH\",\"alias\":\"\",\"timestamp\":1662671067623}
```

1. Подпишите строку `operation` своим приватным ключом для подписания и получите подпись.
2. Отправьте следующий запрос с вашим `X-API-KEY` заголовком. (Смотрите для справки: [Создание API ключа приложения](/api/api-key))

```graphql
mutation follow {
  follow(
    input: {
      fromAddr: "0x803F69aE5f5D839071fcD712e25BF3c8c35B2664"
      toAddr: "0xab7824a0ef372c95b9cfeb4a8be487a0d5d8ecb"
      signature: "0xdcf2dae91b1372767d05f209c096dc35f65e1a91e9e7b0521a8a23802e42ca273aea934046e79ec75f8290ff6c1b7bf35d023c8dcb0bf956f56fdaec3633620f1c"
      signingKey: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEqw+1M+P+2SBcf6mTtGEQ2rbEIq0/eYbzYPtzu75DfC93Y6twu7yq7BEE3yqokSIpBGXI92m6EPkhH+kUx4+ZyQ=="
      namespace: "Link3"
      operation: "{\"name\":\"follow\",\"from\":\"0x803F69aE5f5D839071fcD712e25BF3c8c35B2664\",\"to\":\"0xab7824a05ef372c95b9cfeb4a8be487a0d5d8ecb\",\"namespace\":\"Link3\",\"network\":\"ETH\",\"alias\":\"\",\"timestamp\":1662672662623}"
    }
  ) {
    success
  }
}
```

## Эксперимент в песочнице

Мы создали пример, который включает в себя все шаги для Следования за адресом. Не стесняйтесь экспериментировать с нашим кодом в песочнице ниже. Это включает в себя несколько шагов:

1. Войдите в систему с помощью кошелька
2. Следуйте за адресом

<iframe src="https://codesandbox.io/embed/follow-unfollow-e6x6fh?codemirror=1&fontsize=14&hidenavigation=0&theme=dark&runonclick=1&view=split&module=/src/App.tsx"
    title="connect-with-follow-button"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
