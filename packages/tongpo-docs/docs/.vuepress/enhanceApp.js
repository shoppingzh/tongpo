import VueCompositionAPI from '@vue/composition-api'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

export default ({
  Vue,
  isServer
}) => {
  Vue.use(VueCompositionAPI)
  Vue.use(Antd)
}
