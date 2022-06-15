interface Size {
  width: number,
  height: number
}

function getRealSize(video: HTMLVideoElement): Size {
  if (!video) throw new Error('video is null')
  return {
    width: video.videoWidth,
    height: video.videoHeight
  }
}

/**
 * 视频截图
 * @param video 视频
 * @param type 图片类型
 * @param quality 图片质量(0 ~ 1)
 * @param width 图片宽度，大于视频宽度时取视频宽度
 * @param height 图片高度，大于视频高度时取视频高度，已设置width时，该参数不生效
 * @returns 
 */
export function takeScreenshot(video: HTMLVideoElement, type: string, quality: number, width: number, height: number): Promise<Blob> {
  return new Promise(async(resolve, reject) => {
    if (!video) return reject('video is null')
    const canvas = document.createElement('canvas')
    const realSize = getRealSize(video)
    const realRatio = realSize.width / realSize.height
    let w: number, h: number
    if (width > 0 || height > 0) {
      if (width > 0) {
        w = Math.min(width, realSize.width)
        h = w / realRatio
      } else {
        h = Math.min(height, realSize.height)
        w = h * realRatio
      }
    } else {
      const size = { width: video.clientWidth, height: video.clientHeight }
      const ratio = size.width / size.height
      if (realRatio > ratio) { // 横向对齐
        w = size.width
        h = size.width / realRatio
      } else { // 纵向对齐
        h = size.height
        w = size.height * realRatio
      }
    }
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    try {
      canvas.toBlob(blob => {
        resolve(blob)
      }, type, quality)
    } catch (err) {
      reject(err)
    }
  })
}
