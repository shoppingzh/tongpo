import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { merge, remove } from 'lodash'

const DEFAULT_BEAT_FREQUENCY = 60000 // 默认心跳节奏

const DEFAULT_OPTIONS = {
  heartbeat: {
    outgoing: DEFAULT_BEAT_FREQUENCY,
    incoming: DEFAULT_BEAT_FREQUENCY
  },
  debug: false
}

export default class Client {
  constructor(url, options) {
    this.url = url
    this.options = merge({}, DEFAULT_OPTIONS, options)
    this.init()
  }

  init() {
    this.channels = []
    this.sock = new SockJS(this.url)
    this.stomp = Stomp.over(this.sock)
    this.stomp.heartbeat = this.options.heartbeat
    if (!this.options.debug) {
      this.stomp.debug = null
    }
    this.connect()
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (this.stomp.connected) {
        return resolve(this.stomp)
      }
      const _this = this
      this.stomp.connect({}, function() {
        resolve(_this.stomp)
      }, function(err) {
        reject(err)
      })
    })
  }

  /**
   * 打开一个频道，如果已经有打开的频道，则复用该频道
   * @param {String} url 频道URL
   * @param {Object} headers 头信息
   */
  openChannel(url, headers) {
    let channel = this.channels.find(o => o.url === url)
    if (!channel) {
      channel = new Channel(this, url, headers)
      this.channels.push(channel)
    }
    return channel
  }
}

class Channel {
  constructor(client, url, headers) {
    this.client = client
    this.url = url
    this.headers = headers
    this.handlers = []

    this.client.connect().then((stomp) => {
      const _this = this
      this.entity = stomp.subscribe(url, function(frame) {
        _this.handlers.forEach((handler) => {
          handler.call(_this, frame)
        })
      }, headers)
    })
  }

  /**
   * 添加一个消息处理器，当频道接收到消息时，会通知该处理器
   * @param {Function} handler 消息处理器
   */
  addMessageHandler(handler) {
    if (!handler || typeof handler !== 'function') {
      throw new Error('消息处理器必须是一个函数!')
    }
    this.handlers.push(handler)
  }

  /**
   * 移除指定的消息处理器
   * @param {Function} handler 消息处理器
   */
  removeMessageHandler(handler) {
    remove(this.handlers, o => o === handler)
  }

  /**
   * 往频道发送消息
   * @param {Any} content 消息内容
   * @param {Object}} headers 头信息
   */
  sendMessage(content, headers) {
    this.client.stomp.send(this.url, headers, content)
  }

  /**
   * 销毁频道
   */
  destroy() {
    while (this.handlers.shift());
    if (this.entity) {
      this.entity.unsubscribe()
    }
    remove(this.client.channels, o => o.url === this.url)
  }
}
