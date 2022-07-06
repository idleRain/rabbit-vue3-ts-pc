import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/common.less'
// 引入路由
import router from '@/router'
import { createPinia } from 'pinia'
// 引入自定义插件
import MyUI from '@/components'

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(MyUI).mount('#app')
