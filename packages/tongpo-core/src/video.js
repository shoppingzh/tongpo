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
    canvas.width = video.clientWidth
    canvas.height = video.clientHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    canvas.toBlob(blob => {
      resolve(blob)
    }, null, quality)
  })
}
