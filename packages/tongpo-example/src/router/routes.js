import Layout from '@/layout/index.vue'

const modules = import.meta.glob('../views/**/*.vue')
function view(path) {
  return modules[`../views/${path}`]
}

export default [{
  path: '',
  component: Layout,
  children: [{
    path: '',
    component: view('index.vue')
  },{
    path: 'datetime',
    component: view('datetime.vue'),
    meta: { menu: true, title: '日期时间' }
  }, {
    path: 'url',
    component: view('url.vue'),
    meta: { menu: true, title: 'URL' }
  }, {
    path: 'dom',
    component: view('dom.vue'),
    meta: { menu: true, title: 'DOM' }
  }, {
    path: 'map',
    component: view('map.vue'),
    meta: { menu: true, title: '地图' }
  }, {
    path: 'ws',
    component: view('ws/index.vue'),
    meta: { menu: true, title: 'WebSocket' }
  }, {
    path: 'media',
    component: view('media/index.vue'),
    meta: { menu: true, title: '媒体' }
  }, {
    path: 'video',
    component: view('video/index.vue'),
    meta: { menu: true, title: '视频' }
  }]
}]
