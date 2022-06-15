const typeEnums = {
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
    zip: [
      'application/x-zip-compressed',
      'application/zip',
      'multipart/x-zip'
    ],
    rar: ['application/x-rar-compressed']
  },
  // 可执行文件
  app: {
    apk: ['application/vnd.android.package-archive']
  }
}

interface Type {
  top: string,
  sub: string
}

/**
 * 获取文件类型
 * @param contentType 文件原始类型
 * @returns 
 */
export function getType(contentType: string): Type {
  if (!contentType) return null
  if (['image', 'video', 'audio', 'text'].some(type => new RegExp(`^${type}\\/`).test(contentType))) {
    const parts = contentType.split('/')
    return { top: parts[0], sub: parts[1] }
  }
  let type = null
  const keys = Object.keys(typeEnums)
  for (let i = 0, len = keys.length; i < len; i++) {
    const top = keys[i]
    const sub = Object.keys(typeEnums[top]).find(key =>
      typeEnums[top][key].indexOf(contentType) >= 0)
    if (sub) {
      return { top, sub }
    }
  }
  return type
}