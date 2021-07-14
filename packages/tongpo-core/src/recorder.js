import { merge } from 'lodash/object'

function isTag(el, tagName = '') {
  return el && el.nodeType === 1 && el.tagName === tagName.toUpperCase()
}

/**
 * 加载User Media
 * @param {Object} constraints 
 */
export function loadUserMedia(constraints) {
  const mediaDevices = navigator.mediaDevices || {}
  if (mediaDevices.getUserMedia) return mediaDevices.getUserMedia(constraints)
  return new Promise((resolve, reject) => {
    const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
    if (!getUserMedia) return reject(new Error('getUserMedia api is not supported!'))
    return getUserMedia.call(navigator, constraints, resolve, reject)
  })
}

/**
 * 获取视频当前帧的blob对象
 * @param {HTMLVideoElement} video video元素
 * @returns Promise
 */
export function getVideoFrame(video) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      canvas.width = video.width || video.clientWidth
      canvas.height = video.height || video.clientHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
        resolve(blob)
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 配置：
 * audio(boolean) 是否开启声音录制
 * width(number) 录制宽度
 * height(number) 录制高度
 * onReady(function) 摄像头已打开回调
 * onError(function) 摄像头打开失败回调
 */

const DEFAULT_OPTIONS = {
  audio: true,
  width: 600,
  height: 400,
  onReady: null
}

export default class VideoRecorder {

  constructor(options) {
    this.options = merge({}, DEFAULT_OPTIONS, options)
    this.init()
  }

  async init() {
    try {
      this.stream = await loadUserMedia({
        video: {
          width: this.options.width,
          height: this.options.height
        },
        audio: this.options.audio
      })
      if (this.options.onReady) {
        this.options.onReady.call(this, this)
      }
    } catch (error) {
      if (this.options.onError) {
        this.options.onError.call(this, error)
      }
    }
  }

  render(el) {
    if (!isTag(el, 'video')) throw new Error('el must be a video element!')
    if ('srcObject' in el) {
      el.srcObject = this.stream
    } else {
      el.src = URL.createObjectURL(this.stream)
    }
  }

  destroy() {
    if (!this.stream) return
    const tracks = this.stream.getTracks() || []
    tracks.forEach(track  => {
      track.stop()
    })
  }

}
