import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {
			hasLogin: false,
			token: '',
			phone: '',
			avatar:'',
			password: '',
			userName: '',
			sex: 0
		},
		school: {
			id: '11853391869743621792',
			title: '',
			addr: ''
		},
		selectSchool:{
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
			state.school = school;
			state.selectSchool = school;
		},
		regSetAvatar(state, avatar) {
			state.user.avatar = avatar;
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
			state.user.userName = payload.user_name;
			state.user.avatar = payload.user.avatar;
			state.school = payload.school;
			state.selectSchool = state.school; //登陆后选择的学校默认是自己的学校
			state.user.hasLogin = true;
			this.commit('loginAfterSetStorage');
		},
		logOut(state) {
			state.hasLogin = false;
			uni.clearStorage();
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
			uni.setStorage({
				key: 'selectSchool',
				data: state.selectSchool
			});
		},
		checkSchool(state,payload){
			state.selectSchool = payload;
			uni.setStorage({
				key: 'selectSchool',
				data: payload,
				fail: function() {
					uni.showModal({
						title: '提示',
						content: '学校切换失败！',
						showCancel: false
					});
				}
			});
		},
		appOnLunch(state,payload){
			state.user = payload.user;
			state.school = payload.school;
			state.selectSchool = payload.selectSchool;
		}
	}
})

export default store
