import { start } from './internal/timer'


/**
 * 选择文件
 */
export function chooseFile() {
  return new Promise((resolve, reject) => {
    const ele = document.createElement('input')
    ele.type = 'file'
    ele.addEventListener('change', function() {
      resolve(this.files)
    }, false)
    ele.click()
  })
}

/**
 * 将Number|String的像素值转换为带有单位的CSS像素值
 * 100 > 100px
 * '100' > 100px
 * 100px > 100px
 * 100vh > 100vh
 * @param {Any} height 像素值
 */
export function parseCssPixel(height) {
  if (typeof height === 'number') {
    return `${height}px`
  }
  if (typeof height === 'string') {
    if (/^\d+$/.test(height.trim())) {
      return `${parseInt(height)}px`
    }
    return height
  }
  return height
}

/**
 * 创建或更新指定的样式表
 * @param {String} id 样式表id
 * @param {String} cssText 样式文本
 */
export function createOrUpdateStylesheet(id, cssText) {
  let style = document.querySelector(`style#${id}`)
  if (!style) {
    const head = document.head || document.querySelector('head')
    style = document.createElement('style')
    style.id = id
    style.type = 'text/css'
    head.appendChild(style)
  }
  style.innerHTML = cssText
  return style
}

/**
 * 加载图片
 * @param {String} url 图片地址
 */
export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    if (img.complete) { // 图片已就绪（浏览器已缓存等各种原因导致图片无需再从网络加载）
      return resolve(img)
    }
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function(e) {
      reject(e)
    }
  })
}

/**
 * 设置页面标题
 * @param {String} title 标题
 */
export function setPageTitle(title) {
  const el = document.querySelector('title')
  const originalTitle = el.innerText
  if (originalTitle !== title) {
    el.innerText = title
  }
}

/**
 * 平滑滚动
 * @param {HTMLElement} el DOM元素
 * @param {Number} distance 距离
 * @param {Number} time 用时
 */
// FIXME 实现思路不好，待完善
export function smoothScroll(el, distance, time = 500) {
  if (!el || distance <= 0) return
  let current = 0
  const inc = distance / (time / 60)
  doScroll()

  function doScroll() {
    if (current >= distance) return
    current += inc
    if (current > distance) {
      current = distance
    }
    window.requestAnimationFrame(() => {
      el.scrollTop = current
      doScroll()
    })
  }
}

/**
 * 事件委托
 * @param {HTMLElement} el 被委托的元素
 * @param {String} eventName 事件名
 * @param {String} selector 目标元素选择器
 * @param {Function} fn 事件回调
 */
export function on(el, eventName, selector, fn) {
  if (!el) throw new Error('el is nil')
  el.addEventListener(eventName, function(e) { // 不能用箭头函数，因为下面用了arguments
    let target = e.target
    if (!target) return
    while(target !== el) {
      if (target.matches(selector)) {
        return fn.call(target, ...arguments)
      }
      target = target.parentNode
    }
  }, false)
}

/**
 * 设置样式
 * @param {HTMLElement} el 元素
 * @param {Object} styles 样式对象
 */
export function css(el, styles = {}) {
  Object.keys(styles).forEach(name => {
    el.style[name] = styles[name]
  })
}


/**
 * 
 * @param {Function} cb 回调函数
 * @returns {Function}取消事件绑定函数
 */
export function onVisibilityChange(cb) {
  const handler = () => {
    const state = document.visibilityState
    cb && cb(state === 'visible')
  }
  document.addEventListener('visibilitychange', handler)
  return () => {
    document.removeEventListener('visibilitychange', handler)
  }
}

export function detectAction(actionCallback, unactionCallback, delay) {
  if (delay <= 0) throw new Error('delay must great than 0!')
  let lastActionTime = +new Date()
  const delayTime = delay * 1000
  const stopTimer = start(() => {
    const currentTime = +new Date()
    // 如果当前时间与上次操作的时间差大于了最大值，则说明没有操作
    if (currentTime - lastActionTime >= delayTime) {
      unactionCallback && unactionCallback()
    }
  }, 1000)
  // 发生操作时将回调此函数
  const actionHandler = () => {
    lastActionTime = +new Date()
    actionCallback && actionCallback()
  }
  
  // 操作类型
  window.addEventListener('mousemove', actionHandler)
  window.addEventListener('keypress', actionHandler)
  window.addEventListener('click', actionHandler)
  return () => {
    window.removeEventListener('mouseleave', actionHandler)
    window.removeEventListener('keypress', actionHandler)
    window.removeEventListener('click', actionHandler)
    stopTimer()
  }
}
