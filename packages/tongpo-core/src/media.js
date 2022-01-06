export function getUserMediaFn() {
  let fn = null
  const mediaDevices = navigator.mediaDevices || {}
  if (mediaDevices.getUserMedia) {
    fn = mediaDevices.getUserMedia
  } else {
    const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
    if (getUserMedia) {
      fn = (constraints) => {
        return new Promise((resolve, reject) => {
          getUserMedia(constraints, resolve, reject)
        })
      }
    }
  }
  return fn
}

export function getUserMedia(constraints) {
  const fn = getUserMediaFn()
  if (!fn) return Promise.reject('浏览器不支持此API')
  return fn(constraints)
}
