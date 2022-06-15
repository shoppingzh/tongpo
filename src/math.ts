interface Range {
  from: number,
  to: number
}

function getRange(start: number, end: number): Range {
  if (start >= end) return null
  return { from: start, to: end - 1 }
}

/**
 * 获取指定数值范围内的可用范围段
 * @param min 最小值
 * @param max 最大值
 * @param usedRanges 已用范围
 * @returns 
 */
export function getUnuseRagnes(min: number, max: number, usedRanges: Range[] = []): Range[] {
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
  return ranges
}

/**
 * 获取指定范围内的随机值
 * @param min 最小值
 * @param max 最大值
 * @returns 
 */
export function getRandomInRange(min = 0, max = 0): number {
  const offset = Math.abs(max - min)
  return Math.random() * offset + min
}
