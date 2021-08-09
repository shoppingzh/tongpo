import { getCurrentInstance } from 'vue'
import Example from '@/components/Example/index.vue'

const { appContext: app } = getCurrentInstance()

app.components(Example.name, Example)
