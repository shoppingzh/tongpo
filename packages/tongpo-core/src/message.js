import SockJS from 'sockjs-client/dist/sockjs.min.js'
import { Stomp } from '@stomp/stompjs'
import { merge, remove } from 'lodash'
import Subscribe from './subscribe'

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
    this.channels = []
    this.connectSubscribe = new Subscribe()
    this.connect()
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (this.stomp && this.stomp.connected) {
        return resolve(this.stomp)
      }
      this.stomp = Stomp.over(() => new SockJS(this.url))
      this.stomp.configure({
        heartbeatIncoming: this.options.heartbeat.incoming,
        heartbeatOutgoing: this.options.heartbeat.outgoing,
        reconnectDelay: 1000
      })
      if (!this.options.debug) {
        this.stomp.debug = null
      }
      this.stomp.onConnect = (frame) => {
        this.connectSubscribe.dispatch(this.stomp)
        resolve()
      }
      this.stomp.onDisconnect = (frame) => {
        reject()
      }
      this.stomp.activate()
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

  onConnect(cb) {
    return this.connectSubscribe.on(cb)
  }
}

class Channel {
  constructor(client, url, headers) {
    this.client = client
    this.url = url
    this.headers = headers
    this.messageSubscribe = new Subscribe()
    this.channelSubscription = null

    const subscribe = (stomp) => {
      this.channelSubscription = stomp.subscribe(this.url, (frame) => {
        this.messageSubscribe.dispatch(frame)
      }, headers)
    }
    // 将在ws连接成功后订阅该频道
    this.offConnectNotify = this.client.onConnect(stomp => {
      subscribe(stomp)
    })

    // 如果已经连接，直接订阅
    if (this.client.stomp.connected) {
      subscribe(this.client.stomp)
    }
  }

  /**
   * 添加一个消息处理器，当频道接收到消息时，会通知该处理器
   * @param {Function} handler 消息处理器
   */
  onMessage(handler) {
    if (!handler || typeof handler !== 'function') throw new Error('消息处理器必须是一个函数!')
    this.messageSubscribe.on(handler)
  }

  addMessageHandler(handler) {
    return this.onMessage(handler)
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
   * 1. 取消频道订阅
   * 2. 移除频道
   * 3. 取消频道对于客户端连接的订阅
   */
  destroy() {
    this.messageSubscribe.destroy()
    if (this.channelSubscription) {
      this.channelSubscription.unsubscribe()
    }
    const channelIdx = this.client.channels.findIndex(o => o.url === this.url)
    channelIdx >= 0 && this.client.channels.splice(channelIdx, 1)

    this.offConnectNotify && this.offConnectNotify()
  }
}
