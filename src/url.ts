interface URLParts {
  protocol: string,
  host: string,
  port: string,
  pathname: string,
  query: string,
  hash: string
}

const URL_RE = /^((\w+):\/\/)([\w.-]*)?:?(\d+)?([^?]*)?\??(([^#])*)?#?(.*)?$/

/**
 * 将对象解析为查询参数
 * 
 * { name: 'Jack', age: 23 } => name=Jacck&age=23
 * @param object 参数对象
 * @returns 
 */
export function parseQueryParams(object: object): string {
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
export function join(...args: string[]) {
  return [...args].join('/').replace(/\/{2,}/g, '/')
}

/**
 * 解析URL
 * protocol 协议
 * host 主机
 * pathname 路径
 * query 查询条件
 * hash hash
 * @param {Sring} url URL
 */
export function parse(url: string): URLParts {
  if (!url) return null
  const result = URL_RE.exec(url)
  if (!result) return null
  return {
    protocol: result[1],
    host: result[3],
    port: result[4],
    pathname: result[5],
    query: result[6],
    hash: result[8]
  }
}

