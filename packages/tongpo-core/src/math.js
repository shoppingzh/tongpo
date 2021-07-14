/**
 * 获取指定数值范围内的可用范围段
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {Array} usedRanges 已用范围
 */
export function getUnuseRagnes(min, max, usedRanges = []) {
  if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
    throw new Error('参数错误')
  }
  const ranges = []
  let start = min
  usedRanges.sort((a, b) => a.from - b.from).forEach(range => {
    const unuseRange = getRange(start, range.from)
    if (unuseRange) {
      ranges.push(unuseRange)
    }
    start = range.to + 1
  })

  if (ranges.length > 0) {
    const lastRange = getRange(ranges[ranges.length - 1].to, max)
    lastRange && ranges.push(lastRange)
  }

  function getRange(start, end) {
    if (start >= end) return null
    return { from: start, to: end - 1 }
  }

  return ranges
}

/**
 * 获取范围内的随机值
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export function getRandomInRange(min = 0, max = 0) {
  const offset = Math.abs(max - min)
  return Math.random() * offset + min
}
