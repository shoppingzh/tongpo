/**
 * 日期/时间工具函数
 */

import moment from 'moment'

// Constants
const CHINESE_WEEK_NAME = ['日', '一', '二', '三', '四', '五', '六']

/**
 * 判断指定日期是否是一周的开始
 * @param date 日期
 * @param isSundayBegin 周是否以星期天开始
 * @returns 
 */
function isWeekBegin(date: moment.MomentInput, isSundayBegin: boolean): boolean {
  const day = moment(date).day()
  return isSundayBegin ? day === 0 : day === 1
}


// ========================================= API =========================================

/**
 * 获取指定日期范围内的周列表
 * @param beginDate 开始日期
 * @param endDate 截止日期
 * @param isSundayBegin 是否以星期日作为一周的开始
 * @returns 
 */
export function getWeeks(beginDate: moment.MomentInput, endDate: moment.MomentInput, isSundayBegin: boolean): Date[][] {
  const begin = moment(beginDate)
  const end = moment(endDate)
  if (!begin.isBefore(end)) throw new Error('beginDate must be before endDate')
  const weeks: Date[][] = [[]]
  let date: moment.Moment = begin
  let week = weeks[0]
  while (date.isBefore(end)) {
    if (isWeekBegin(date, isSundayBegin)) {
      week = []
      weeks.push(week)
    }
    week.push(date.toDate())
    date = date.add(1, 'd')
  }
  return weeks
}

/**
 * 获取中文的周几
 * @param date 日期
 * @returns 
 */
export function getChineseDayName(date: moment.MomentInput): string {
  return CHINESE_WEEK_NAME[moment(date).day()]
}

/**
 * 
 * @param time 时间，如：12:30:15
 * @returns 
 */
export function getSeconds(time: string): number {
  if (!time) throw new Error('time can not be null!')
  const parts = time.split(/:/g)
  const h = parseInt(parts[0])
  const m = parseInt(parts[1])
  const s = parseInt(parts[2])
  let seconds = 0
  if (h) {
    seconds += h * 3600
  }
  if (m) {
    seconds += m * 60
  }
  if (s) {
    seconds += s
  }
  return seconds
}