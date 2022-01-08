---
title: DOM操作(dom)
author: xpzheng
---


## 选择文件

```js
chooseFile()
```

**参数**

无

**返回值**

(Promise: (files: Array\<File\>) => {})

**例子**

```js
chooseFile().then(files => {
  console.log(files)
})
```

<example>
  <dom-chooseFile />
</example>


## 转换CSS像素

将诸如`100`、`'100px'`、`'100'`的值转换为CSS显示的像素值`'100px'`

```js
parseCssPixel('100px')
parseCssPixel(100)
```

**参数**

1. val(String|Number): 原始值

**返回值**

(String): CSS像素值

**例子**

```js
parseCssPixel(100)
// => 100px
parseCssPixel('100')
// => 100px
parseCssPixel('100vh')
// => 100vh
parseCssPixel('100px')
// => 100px
```

<example>
  <dom-parseCssPixel />
</example>

## 动态创建/更新样式表

```js
createOrUpdateStylesheet(id, cssText)
```

**参数**

1. id(String): 样式表ID
2. cssText(String): 样式表内容

**返回值**

(HtmlStyleElement): 样式表的DOM对象

**例子**

```js
const style = `
  body {
    font-size: 20px;
  }
`
createOrUpdateStylesheet('custom-style', style)
```

<example>
  <dom-createOrUpdateStylesheet />
</example>


## 动态加载图片

```js
loadImage(url)
```

**参数**

1. url(String): 图片地址

**返回值**

(Promise: (img: Image | HtmlImageElement) => {})

**例子**

```js
loadImage('./1.png').then(img => {
  const [w, h] = [img.width, img.height]
}).catch(err => {
  console.error(err)
})
```

## 设置页面标题

```js
setPageTitle(title)
```

**参数**

1. title(String): 标题

**返回值**

无

**例子**

```js
setPageTitle('乐天工具库')
```

## 事件委托

```js
on(el, eventName, selector, fn)
```

**参数**

1. el(HtmlElement): 被委托的元素
2. eventName(String): 事件名
3. selector(String): 目标元素选择器
4. fn(Function): 事件处理器

**返回值**

无

**例子**

```js
on(el, 'click', '.btn', e => {
  console.log('el下的.btn被点击了')
})
```

## 设置样式

```js
css(el, styles)
```

**参数**

1. el(HtmlElement): 元素
2. styles(Object): 样式对象

**返回值**

无

**例子**

```js
css(el, {
  display: 'inline-block',
  height: '300px',
  background-color: 'teal'
})
```

## 检测页面可见性

```js
onVisibilityChange(cb)
```

**参数**

1. cb((visible: boolean) => any): 回调函数

**返回值**

(destroy: () => any): 资源回收，销毁事件监听

**例子**

```js
const destroy = onVisibilityChange(visible => {
  if (visible) console.log('page visible')
  else console.log('page hidden')
})

// 适当的时机，回收资源
destroy()
```

## 检测页面操作

```js
detectAction(actionCallback, unactionCallback, delay)
```

**参数**

1. actionCallback(() => any): 在等待时间内发生操作时的回调
2. unactionCallback(() => any): 在等待时间内没有发生操作时的回调
3. delay(number): 等待时间，单位：秒

**返回值**

(destroy: () => any): 资源回收，销毁事件监听

**例子**

```js
const destroy = detectAction(() => {
  console.log('action')
}, () => {
  console.log('un action')
}, 3)

// 在适当时间回收资源
destroy()
```
