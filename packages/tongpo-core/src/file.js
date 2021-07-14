const typeRules = {
  // 图片
  image: {
    png: [
      'image/png',
      'application/x-png'
    ],
    gif: ['image/gif'],
    tif: ['image/tiff'],
    jpeg: ['image/jpeg']
  },
  // 文档
  document: {
    doc: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
      'application/vnd.ms-word.document.macroEnabled.12',
      'application/vnd.ms-word.template.macroEnabled.12'
    ],
    ppt: [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.presentationml.template',
      'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
      'application/vnd.ms-powerpoint.addin.macroEnabled.12',
      'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
      'application/vnd.ms-powerpoint.template.macroEnabled.12',
      'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
    ],
    xls: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
      'application/vnd.ms-excel.sheet.macroEnabled.12',
      'application/vnd.ms-excel.template.macroEnabled.12',
      'application/vnd.ms-excel.addin.macroEnabled.12',
      'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
    ],
    pdf: [
      'application/pdf'
    ]
  },
  // 压缩包
  zip: {
    zip: ['application/x-zip-compressed'],
    rar: ['application/octet-stream']
  },
  // 文本
  text: {
    txt: ['text/plain'],
    html: ['text/html'],
    xml: ['text/xml']
  },
  // 可执行文件
  app: {
    apk: ['application/vnd.android.package-archive']
  }
}

/**
 * 获取文件类型
 * @param {String} contentType 
 * @returns {Object}
 */
export function getType(contentType) {
  if (!contentType) return null
  if (['image', 'video', 'audio'].some(type => new RegExp(`^${type}\\/`).test(contentType))) {
    const parts = contentType.split('/')
    return {
      top: parts[0],
      sub: parts[1]
    }
  }
  let type = null
  Object.keys(typeRules).forEach(top => {
    const sub = Object.keys(typeRules[top]).find(key =>
      typeRules[top][key].indexOf(contentType) >= 0)
    if (sub) {
      type = {
        top,
        sub
      }
    }
  })
  return type
}