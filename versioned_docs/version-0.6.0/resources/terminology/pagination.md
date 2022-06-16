---
id: pagination
title: Pagination
slug: /resources/terminology/pagination/
sidebar_label: Pagination
sidebar_position: 2
description: Pagination is a feature in CyberConnect Indexer endpoints. Pagination refers to methods for programmatically requesting all of the pages, to retrieve the whole result data set.
---

Pagination is a feature in CyberConnect Indexer endpoints. Pagination refers to methods for programmatically requesting all of the pages, to retrieve the whole result data set. Not all API endpoints support pagination, but it is often used when result sets are large. 

Users can retrieve lists from CyberConnect Indexer by using `first` and `after` parameters. The `first` request parameter enables you to configure the number of entries returned per response page. The default value of `first` parameter is 20 and the maximum value is 50. The `after` request parameter points to the end of the page of data that has been returned. `After` parameter is optional. If no `After` or empty value of `After` is received, the indexer will return results starting from the first element of the whole list.

All CyberConnect Indexer endpoints with pagination return a `BasicInfoConnection` object with two fields:

* `pageInfo`
* `list`

`list` is the result for this single query. 

For `pageInfo`, there are 4 fields:

| Field             | Type    | Description                                             |
|-------------------|---------|---------------------------------------------------------|
| `startCursor`     | String  | Starting element index of this query                    |
| `endCursor`       | String  | Ending element index of this query                      |
| `hasNextPage`     | Boolean | Indicating whether the next page of data exists         |
| `hasPreviousPage` | Boolean | Indicating whether this query is the first page of data |

For your query with pagination, you can begin with the `first` as 50. Make a request and get a response from the indexer. Then you can keep the `first` and set the `after` parameter's value as the ending index of the last response, send another request. Repeat this process until `hasNextPage` returned by the server turns into false.
