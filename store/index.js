import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user:{
			hasLogin:false,
			phone:'',
			userName:'',
			sex: 0,
			school:{
				id:'11853391869743621792',
				name:'',
				addr:''
			}
		}
	},
	mutations: {
		regSetPhone(state, phone) {
			state.user.phone = phone;
		},
		regSetSex(state, sex) {
			state.user.sex = sex;
		},
		regSetSchoolId(state, schoolId) {
			state.user.schoolId = schoolId;
		},
		regSetUserName(state, userName){
			state.user.userName = userName;
		},
		regAfterLogin(state){
			state.user.hasLogin = true;
		},
		login(state, user) {
			state.user.name = userName || '新用户';
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		}
	}
})

export default store
