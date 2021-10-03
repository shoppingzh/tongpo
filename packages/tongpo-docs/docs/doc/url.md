---
title: URL(url)
author: xpzheng
---

## 解析查询参数

```js
parseQueryParams(params)
```

**参数**

1. params(Object): 被解析的查询参数对象，如`{ keyword: '123' }`

**返回值**

(String): 查询参数，如`"keyword=123"`

**例子**

```js
parseQueryParams({
  keyword: '123',
  from: '2021-10-03'
})
// => keyword=123&from=2021-10-03
```

## 拼接路径

```
join()
```

**参数**

任意路径片段

**返回值**

(String): 拼接后的路径

**例子**

```js
join('a', 'b', 'c')
// => a/b/c
join('/a/', '/b', '////c')
// => /a/b/c
join('/a/', null, '/b/', '/c/')
// => /a/b/c/
```