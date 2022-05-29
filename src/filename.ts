/**
 * 获取文件名后缀
 * @param filename 文件名
 * @returns 
 */
export function getSuffix(filename: string): string {
  const index = filename.lastIndexOf('.')
  return index >= 0 ? filename.substring(index + 1, filename.length) : filename
}

/**
 * 获取文件名
 * @param filename 文件名
 * @returns 
 */
export function getBaseName(filename: string): string {
  const index = filename.lastIndexOf('.')
  return index >= 0 ? filename.substring(0, index) : filename
}
