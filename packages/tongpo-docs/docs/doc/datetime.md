## 获取星期日期列表

```js
getWeeks(beginDate, endDate, isSundayBegin)
```

获取从开始日期到结束日期的天列表，按照星期拆分

**参数**

1. beginDate(String): 开始日期
2. endDate(String): 结束日期
3. isSundayBegin(Boolean): 是否已星期天为一周的开始，默认为`false`

**返回值**

(Array): 返回一个二维数组，第一层为周列表，第二层为天列表

**例子**

```js
getWeeks('2021-07-09', '2021-08-09')
```

