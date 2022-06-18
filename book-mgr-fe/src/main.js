import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import SpaceBetween from '@/components/SpaceBetween'

createApp(App)
  .use(store)
  .use(Antd)
  .component('space-between', SpaceBetween)
  .use(router)
  .mount('#app')
