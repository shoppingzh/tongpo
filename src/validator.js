/**
 * 判断某个路径是否为外部链接
 * @param {String} path 路径
 */
export function isExternalLink(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断字符串是否不为空
 * @param {String} str 字符串
 */
export function isNotBlank(str) {
  return str && str.trim()
}

/**
 * 判断字符串是否为空
 * @param {String} str 字符串
 */
export function isBlank(str) {
  return !isNotBlank(str)
}
