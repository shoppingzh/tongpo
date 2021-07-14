export default class ExecuteQueue {

  constructor() {
    this.tasks = []
    this.executeTask = null
    this.allListeners = []
  }

  _check() {
    if (this.executeTask) return
    if (!this.tasks.length) {
      let listener = null
      while(listener = (this.allListeners.shift())) {
        listener()
      }
      return
    }
    this.executeTask = this.tasks.shift()
    this.executeTask().finally(() => {
      this.executeTask = null
      this._check()
    })
  }


  push(task) {
    if (typeof task !== 'function') throw new Error('task is not a function!')
    this.tasks.push(task)
    this._check()
  }

  all() {
    return new Promise((resolve, reject) => {
      this.allListeners.push(resolve)
      this._check()
    })
  }

}
