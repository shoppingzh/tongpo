const { readdirSync } = require('fs')
const { join, resolve } = require('path')

/**
 * 读取目录下的所有文件
 * @param {String} dir 目录路径
 */
function readFiles(dir) {
  const files = readdirSync(dir, { withFileTypes: true })
  return files.filter(file => file.isFile()).map(file => {
    return {
      name: file.name,
      path: join(dir, file.name)
    }
  })
}

module.exports = {
  readFiles
}

