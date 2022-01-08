const PREFIX = '__BROADCAST_CHANNEL_'

/**
 * 构造一个消息对象
 * @param {Any} data 消息体
 */
function newMessage(data) {
  return {
    timestamp: +new Date(),
    data
  }
}

export default class BroadcastChannel {

  constructor(name) {
    if (typeof name !== 'string' || !name.trim()) {
      throw new Error('name must be a string value')
    }
    this.name = name
    this._init()
  }

  _isMessage(key) {
    return key === this.key
  }

  _init() {
    this.key = `${PREFIX}${this.name}`
    this.messageHandlers = []
    this.storageHandler = e => {
      const key = e.key
      if (!this._isMessage(key)) return
      const newVal = e.newValue
      if (!newVal) return
      this._notify(JSON.parse(newVal))
      // remove storage item
      localStorage.removeItem(this.key)
    }
    window.addEventListener('storage', this.storageHandler)

    this.destroyed = false
  }

  _notify(message) {
    this.messageHandlers.forEach(handler => {
      handler.call(this, message)
    })
  }

  postMessage(data) {
    if (this.destroyed) {
      throw new Error('channel has been destroyed!')
    }
    const msg = newMessage(data)
    localStorage.setItem(this.key, JSON.stringify(msg))
    return msg
  }

  onMessage(cb) {
    if (!cb || typeof cb !== 'function') return
    this.messageHandlers.push(cb)
  }

  destroy() {
    window.removeEventListener('storage', this.storageHandler)
    this.destroyed = true
  }

}
