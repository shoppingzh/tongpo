const { generateNav, generateSidebar } = require('vuepress-util')
const { navs } = require('../../config.js')

module.exports = {
  title: '乐天工具库',
  description: '竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。',

  // 性能相关
  cache: false,

  // 浏览器兼容
  evergreen: true, // 只适配现代浏览器

  // 插件
  plugins: {
    '@vuepress/medium-zoom': {}
  },

  // 主题
  theme: 'reco',
  themeConfig: {
    logo: '/logo.png',
    lastUpdated: '最后更新时间',
    // reco
    mode: 'dark',
    modePicker: false,
    subSidebar: 'auto',
    // 导航栏
    nav: generateNav(navs),
    sidebar: generateSidebar()
  }
}
