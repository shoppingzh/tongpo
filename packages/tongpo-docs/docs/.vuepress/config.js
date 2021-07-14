const { readFiles } = require('./util')

function renderSidebar(dir) {
  const files = readFiles(dir)
  return files.map(file => {
    const fileName = file.name
    const name = fileName.substring(0, fileName.lastIndexOf('.'))
    return [fileName, name]
  })
}

module.exports = {
  title: '乐天工具库',
  theme: 'reco',
  themeConfig: {
    displayAllHeaders: true,
    subSidebar: 'auto', // 主题特有配置：二级以上的菜单放置在右侧
    sidebarDepth: 2,
    nav: [{
      text: '快速上手',
      link: '/guide/'
    }, {
      text: '文档',
      link: '/doc/file'
    }],
    sidebar: {
      '/doc/': [
        ['file', '文件'],
        ['url', 'URL'],
        ['map', '地图'],
        ['broadcast-channel', '窗口通信']
      ]
    }
  }
}
