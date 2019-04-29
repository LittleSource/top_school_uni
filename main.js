import Vue from 'vue'
import App from './App'
import global_ from './global'//引用全局变量文件
import store from './store'//引用vuex配置文件
import mimcMessage_ from './common/mimc-message'//引用全局变量文件

Vue.config.productionTip = false
Vue.prototype.mimcMessage = mimcMessage_
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