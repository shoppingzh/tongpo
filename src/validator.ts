
/**
 * 判断某个路径是否为外部链接
 * @param path 路径
 * @returns 
 */
export function isExternalLink(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断字符串是否不为空
 * @param str 字符串
 * @returns 
 */
export function isNotBlank(str: string): boolean {
  return !!(str && str.trim())
}

/**
 * 判断字符串是否为空
 * @param str 字符串
 * @returns 
 */
export function isBlank(str: string): boolean {
  return !isNotBlank(str)
}
