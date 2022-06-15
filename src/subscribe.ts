type Listener = (...args: any[]) => void

export default class {
  private readonly listeners: Listener[]
  private active: boolean

  constructor() {
    this.listeners = []
    this.active = true
  }

  on(cb: Listener) {
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

  dispatch(...args: any[]) {
    this.listeners.forEach(cb => {
      cb(...args)
    })
  }

  destroy() {
    this.active = false
    this.listeners.splice(0, this.listeners.length - 1)
  }
}
