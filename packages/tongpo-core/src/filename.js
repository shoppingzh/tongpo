/**
 * 获取文件名后缀
 * @param {String} filename 文件名
 */
export function getSuffix(filename) {
  const index = filename.lastIndexOf('.')
  return index >= 0 ? filename.substring(index + 1, filename.length) : filename
}

/**
 * 获取文件名
 * @param {String} filename 文件名
 */
export function getBaseName(filename) {
  const index = filename.lastIndexOf('.')
  return index >= 0 ? filename.substring(0, index) : filename
}
