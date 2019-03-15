import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {
			hasLogin: false,
			token: '',
			phone: '',
			password: '',
			userName: '',
			sex: 0
		},
		school: {
			id: '11853391869743621792',
			title: '',
			addr: ''
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
		regSetUserName(state, userName) {
			state.user.userName = userName;
		},
		regAfterLogin(state, user) {
			state.user = user;
			state.user.password = ''; //为了安全置空密码
			state.user.hasLogin = true;
			this.commit('loginAfterSetStorage');
		},
		login(state, payload) {
			state.user.token = payload.token;
			state.user.phone = payload.phone;
			state.user.sex = payload.sex;
			state.user.userName = payload.userName;
			state.school = payload.school;
			state.user.hasLogin = true;
			this.commit('loginAfterSetStorage');
		},
		logOut(state) {
			state.hasLogin = false;
			uni.clearStorage();
			uni.reLaunch({
				url:'/pages/common/login'
			})
		},
		loginAfterSetStorage(state) {
			uni.setStorage({
				key: 'user',
				data: state.user
			});
			uni.setStorage({
				key: 'school',
				data: state.school
			});
		},
		appOnLunch(state,payload){
			state.user = payload.user;
			state.school = payload.school;
		}
	}
})

export default store
