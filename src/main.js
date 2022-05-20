import { createApp } from 'vue'
import App from './App.vue'
// 引入全局可用阿里图标样式文件
import './assets/iconfont/iconfont.css'
// 引入全局可用阿里图标js文件
import './assets/iconfont/iconfont.js'
// 引入自己设置的全局icon基础样式，一般用于规定基础的svg宽高和图标大小
import './assets/css/iconfont.css'

createApp(App).mount('#app')
