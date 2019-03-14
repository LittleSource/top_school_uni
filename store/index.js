import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user:{
			hasLogin:false,
			token:'',
			phone:'',
			password:'',
			userName:'',
			sex: 0
		},
		school:{
			id:'11853391869743621792',
			title:'',
			addr:''
		}
	},
	mutations: {
		regSetPhoneAndPass(state, payload) {
			state.user.phone = payload.phone;
			state.user.password = payload.password;
		},
		regSetSex(state, sex) {
			state.user.sex = sex;
		},
		regSetSchool(state, school) {
			state.user.school = school;
		},
		regSetUserName(state, userName){
			state.user.userName = userName;
		},
		regAfterLogin(state,user){
			state.user = user;
			state.user.password = '';//为了安全置空密码
			state.user.hasLogin = true;
		},
		login(state, payload) {
			state.user = payload.user;
			state.school = payload.school;
			state.user.hasLogin = true;
		},
		logout(state) {
			state.hasLogin = false;
		}
	}
})

export default store
