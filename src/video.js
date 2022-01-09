function getRealSize(video) {
  if (!video) throw new Error('video is null')
  return {
    width: video.videoWidth,
    height: video.videoHeight
  }
}

/**
 * 视频截图
 * @param {HTMLVideoElement} video 视频
 * @param {String} type 图片类型
 * @param {Number} quality 图片质量(0 ~ 1)
 */
export function takeScreenshot(video, type, quality) {
  return new Promise(async(resolve, reject) => {
    if (!video) return reject('video is null')
    const canvas = document.createElement('canvas')
    const size = { width: video.clientWidth, height: video.clientHeight }
    const realSize = getRealSize(video)
    const realRatio = realSize.width / realSize.height
    const ratio = size.width / size.height
    if (realRatio > ratio) { // 横向对齐
      canvas.width = size.width
      canvas.height = size.width / realRatio
    } else { // 纵向对齐
      canvas.height = size.height
      canvas.width = size.height * realRatio
    }
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    try {
      canvas.toBlob(blob => {
        resolve(blob)
      }, null, quality)
    } catch (err) {
      reject(err)
    }
  })
}
