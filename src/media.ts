/**
 * 获得获取用户媒体的调用函数（如为空表示不支持）
 */
function _getUserMediaFn() {
  let fn = null
  const mediaDevices = navigator.mediaDevices || {}
  if (mediaDevices.getUserMedia) {
    fn = mediaDevices.getUserMedia.bind(mediaDevices)
  } else {
    const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
    if (getUserMedia) {
      fn = function(constraints) {
        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject)
        })
      }
    }
  }
  return fn
}

/**
 * 是否支持
 */
export function isSupport() {
  return !!_getUserMediaFn()
}

/**
 * 获取用户媒体
 * @param {Object} constraints 
 */
export function getUserMedia(constraints) {
  const fn = _getUserMediaFn()
  if (!fn) return Promise.reject('浏览器不支持此API')
  return fn(constraints)
}

/**
 * 渲染媒体流
 * @param {HTMLMediaElement} media 媒体对象(video/audio)
 * @param {MediaStream} stream 媒体流
 */
export function render(media, stream) {
  if ('srcObject' in media) {
    media.srcObject = stream
  } else {
    media.src = URL.createObjectURL(stream)
  }
}
