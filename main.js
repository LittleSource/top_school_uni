import Vue from 'vue'
import App from './App'
import global_ from './global'//引用全局变量文件
import store from './store'//引用vuex配置文件

Vue.config.productionTip = false
//全局变量文件挂载到Vue实例上面
Vue.prototype.GLOBAL = global_
//vuex挂载到Vue实例上面
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()