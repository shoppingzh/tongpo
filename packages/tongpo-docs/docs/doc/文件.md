
# 获取文件类型

```
getType(contentType)
```

**参数**

`contentType` (String): 文件的content-type

**返回值**

({ top: String, sub: String }): 文件的类型

现支持类型：
- image
- video
- audio
- document
   - doc
   - xls
   - ppt
   - pdf
- text
   - code
- zip
- app

**例子**

```js
getType('image/png')
// => { top: 'image', sub: 'png' }
getPreviewType('application/pdf')
// => { top: 'document', sub: 'pdf' }
```