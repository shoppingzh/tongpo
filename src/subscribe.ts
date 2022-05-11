export default class {
  constructor() {
    this.listeners = []
    this.active = true
  }

  on(cb) {
    if (!cb || typeof cb !== 'function') throw new Error('cb is not a function')
    this.listeners.push(cb)
    const off = () => {
      const idx = this.listeners.findIndex(o => o === cb)
      if (idx >= 0) {
        this.listeners.splice(idx, 1)
      }
    }
    return off
  }

  dispatch() {
    this.listeners.forEach(cb => {
      cb(...arguments)
    })
  }

  destroy() {
    this.active = false
    this.listeners.splice(0, this.listeners.length - 1)
  }

}
