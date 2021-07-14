/**
 * 日期/时间工具函数
 */

import moment from 'moment'

// Constants
const CHINESE_WEEK_NAME = ['日', '一', '二', '三', '四', '五', '六']

/**
 * 判断指定日期是否是一周的开始
 * @param {String|Date} date 日期
 * @param {Boolean} isSundayBegin 周是否以星期天开始
 */
function isWeekBegin(date, isSundayBegin) {
  const day = moment(date).day()
  return isSundayBegin ? day === 0 : day === 1
}


// ========================================= API =========================================

/**
 * 获取指定日期范围内的周列表
 * @param {String|Date} beginDate 开始日期
 * @param {String|Date} endDate 截止日期
 * @param {Boolean} isSundayBegin 是否以星期日作为一周的开始
 */
export function getWeeks(beginDate, endDate, isSundayBegin) {
  const begin = moment(beginDate)
  const end = moment(endDate)
  if (!begin.isBefore(end)) throw new Error('beginDate must be before endDate')
  const weeks = [[]]
  let date = begin
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
 * @param {String|Date} date 日期
 */
export function getChineseDayName(date) {
  return CHINESE_WEEK_NAME[moment(date).day()]
}

/**
 * 解析秒数
 * @param {String} time 时间，如：12:30:15
 */
export function getSeconds(time) {
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