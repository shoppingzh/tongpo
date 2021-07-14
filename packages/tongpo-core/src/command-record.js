function noop() {}

const defaults = {
  max: 30
}

export default class CommandRecord {

  constructor(params) {
    this.options = Object.assign({}, defaults, params)
    this.init()
  }

  _onChange() {
    if (!this.onchange) return
    this.onchange()
  }

  init() {
    this.onchange = noop
    this.clear()
  }

  /** 当前命名记录是否为空 */
  isEmpty() {
    return this.states.length <= 0
  }

  /** 是否可撤销 */
  canUndo() {
    return !this.isEmpty() && this.current > 0
  }

  /** 是否可重做 */
  canRedo() {
    return !this.isEmpty() && this.current < this.states.length - 1
  }

  /** 当前命令是否为记录里的最新命令 */
  isNewest() {
    return this.current >= this.states.length - 1
  }

  /** 添加一条新命令 */
  push(command) {
    // 检查是否溢出
    const over = this.states.length - this.options.max
    if (over > 0) {
      this.states.splice(0, over)
    }

    if (this.isNewest()) {
      this.states.push(command)
    } else {
      this.states.splice(this.current, this.states.length - this.current, command)
    }
    this.current = this.states.length - 1
    this._onChange()
  }

  /** 撤销，返回撤销后的命令 */
  undo() {
    if (!this.canUndo()) return null
    const command = this.states[--this.current]
    this._onChange()
    return command
  }

  /** 重做，返回重做后的命令 */
  redo() {
    if (!this.canRedo()) return null
    const command = this.states[++this.current]
    this._onChange()
    return command
  }

  /** 清空所有命令 */
  clear() {
    this.states = []
    this.current = this.states.length - 1
    this._onChange()
  }
}
