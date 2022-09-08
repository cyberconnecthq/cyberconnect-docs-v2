---
id: pagination
title: 分页
slug: /resources/terminology/pagination/
sidebar_label: 分页
sidebar_position: 2
description: Pagination is a feature in CyberConnect Indexer endpoints. Pagination refers to methods for programmatically requesting all of the pages, to retrieve the whole result data set.
---

分页是 CyberConnect 索引器端点的一项功能。分页指的是以编程方式请求所有页面的方法，以检索整个结果数据集。并非所有的 API 端点都支持分页，但当结果集很大时，它经常被使用。

用户可以通过使用 `first` 和 `after` 参数从 CyberConnect 索引器检索列表。`first` 请求参数使你能够配置每个响应页面返回的条目数量。`first` 参数的默认值为 20，最大值为 50。`after` 请求参数指向已经返回的数据页的末端。 `after` 参数是可选的。如果没有收到 `after` 或 `after` 为空值，索引器将从整个列表的第一个元素开始返回结果。

所有具有分页功能的 CyberConnect 索引器端点都会返回一个具有两个字段的 `BasicInfoConnection` 对象。

- `pageInfo`
- `list`

`list` 是这个单一查询的结果。

对于 `pageInfo`，有 4 个字段：

| Field             | Type    | Description                  |
| ----------------- | ------- | ---------------------------- |
| `startCursor`     | String  | 该查询的起始元素索引         |
| `endCursor`       | String  | 该查询的结束元素索引         |
| `hasNextPage`     | Boolean | 表明下一页数据是否存在       |
| `hasPreviousPage` | Boolean | 表明该查询是否为第一页的数据 |

对于你带分页的查询，你可以从 `first` 开始设置为 50，发出请求并从索引器中得到响应。然后你可以保留 `first`，并将 `after` 参数的值设置为最后一个响应的结束索引，再发送一个请求。重复这个过程，直到服务器返回的 `hasNextPage` 返回 `false` 。
