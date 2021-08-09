import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index'
// import '@/plugins/ui'
import '@/styles/index.less'

import Example from '@/components/Example/index.vue'

const app = createApp(App).use(router)
app.mount('#app')
app.component(Example.name, Example)

export default app

