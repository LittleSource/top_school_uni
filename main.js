import Vue from 'vue'
import App from './App'
import global_ from './global'//引用全局变量文件
Vue.config.productionTip = false
//全局变量文件挂载到Vue实例上面
Vue.prototype.GLOBAL = global_

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// 表白墙
// 找兼职
// 淘二手
// 逛超市