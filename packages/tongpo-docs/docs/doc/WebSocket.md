---
title: WebSocket(message)
author: xpzheng
---

通过`Client`与`Channel`对象可以很方便地管理web socket的连接与订阅，其中：

`Client`对象表示一个web socket连接，一般对于一个ws连接地址而言，只需要一个`Client`对象（对于大多数应用来说，`Client`对象全局只有一个）；

`Channel`对象表示一个订阅的频道，通过`Client`对象可以打开频道，一个频道可以有多个消息监听器，你可以随时添加、移除新的监听器。

## 第一步：创建连接客户端

```js
const client = new Client('/endpoint', {
  debug: true,
  heartbeat: {
    outgoing: 60000,
    incoming: 60000
  }
})
```

## 第二步：连接(订阅)频道并监听消息

```js
const channel = client.openChannel('/topic/user')
channel.addMessageHandler(frame => {
  const { body } = frame
  const msg = JSON.parse(body)
  // ...
})
```

## 第三步：回收资源：取消订阅

```js
channel.destroy()
```

