// 指定索引是否超出数组边界
function isOutOfBound(arr, index) {
  return index < 0 || index > arr.length - 1
}

/**
 * 根据偏移量移动数组的指定元素
 * @param {Array} arr 数组
 * @param {Number} index 待移动的元素索引
 * @param {Number} offset 移动偏移量(负值为向前移动，正值为向后移动)
 */
export function move(arr, index, offset) {
  if (!Array.isArray(arr)) return
  if (isOutOfBound(arr, index)) throw new Error(`index: ${index} bounds: [0, ${arr.length}]`)
  const dstIndex = index + offset
  if (isOutOfBound(arr, dstIndex)) throw new Error(`destination index: ${dstIndex} bounds:[0, ${arr.length}]`)
  const item = arr[index]
  arr.splice(index, 1)
  arr.splice(dstIndex, 0, item)
  return arr
}
