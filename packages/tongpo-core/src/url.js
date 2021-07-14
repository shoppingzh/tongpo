/**
 * 将对象解析为查询参数
 * { name: 'Jack', age: 23 } => name=Jacck&age=23
 * @param {Object} object 对象
 */
export function parseQueryParams(object) {
  if (typeof object !== 'object' || !object) {
    throw new Error('必须传入一个对象')
  }
  const params = Object.keys(object).reduce((arr, key, index) => {
    let value = object[key]
    if (typeof value === 'undefined' || value === null) {
      return arr
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    arr.push(`${key}=${value}`)
    return arr
  }, [])
  return params.join('&')
}

/**
 * 路径拼接
 */
export function join() {
  return [...arguments].join('/').replace(/\/{2,}/g, '/')
}
