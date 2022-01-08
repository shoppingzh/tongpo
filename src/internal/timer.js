export function start(cb, delay) {
  let timer = null
  const doStart = () => {
    timer = setTimeout(function() {
      if (cb) {
        cb.call(this, ...arguments)
      }
      doStart()
    }, delay)
  }
  doStart()
  return () => {
    clearTimeout(timer)
  }
}