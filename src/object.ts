import { isObject, isArray, isNil, mergeWith } from 'lodash'

/**
 * 按照undefined/null合并对象(扩展Lodash的mergeWith函数)
 * @param {Object} object 被合并的目标对象
 * @param {Array} sources 合并源对象
 */
export function mergeWithNil(object: object, ...sources: object[]) {
  const merge = (value: any, srcValue: any) => isNil(value) ? srcValue : value
  const mergeDeep = (value: any, srcValue: any) => (isObject(value) && !isArray(value))
    ? mergeWith(value, srcValue, mergeDeep)
    : merge(value, srcValue)
  return mergeWith(object, sources, mergeDeep)
}
