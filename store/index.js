import Vue from 'vue'
import Vuex from 'vuex'
import global from '../global' //引用全局变量文件
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {
			hasLogin: false,
			id: 0,
			token: '',
			phone: '',
			avatar: '',
			password: '',
			userName: '',
			sex: 0
		},
		school: {
			id: '11853391869743621792',
			title: '',
			addr: ''
		},
		selectSchool: {
			id: '11853391869743621792',
			title: '',
			addr: ''
		},
		msgList: [{
				id: 111,
				toId: 69,
				avatar: '../../../static/logo.png',
				name: "to蛇皮",
				msg: '在干啥？',
				status: "未读",
				unread: 1
			},
			{
				id: 111,
				toId: 85,
				avatar: '../../../static/logo.png',
				name: "狸猫",
				msg: '怎么说呢',
				status: "未读",
				unread: 1
			}
		],
		historyMsg: {
			69: [{
				id: 100,
				name: "历史",
				face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png",
				ctype: 1,
				msg: "历史消息演示文本内容...",
				date: '2018 01-01 00:00'
			}, {
				id: 100,
				name: "历史",
				face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png",
				ctype: 2,
				msg: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=645650495,1612690171&fm=170&s=7F1106C68E15024D189269B303007019&w=536&h=385&img.JPEG",
				date: '2018 01-01 00:00'
			}],
			85:[{
				id: 100,
				name: "85",
				face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png",
				ctype: 1,
				msg: "历史消息演示文本内容...",
				date: '2018 01-01 00:00'
			}, {
				id: 100,
				name: "85",
				face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png",
				ctype: 2,
				msg: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=645650495,1612690171&fm=170&s=7F1106C68E15024D189269B303007019&w=536&h=385&img.JPEG",
				date: '2018 01-01 00:00'
			}]
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
		regAfterLogin(state, payload) {
			state.user.id = payload.user.user_id;
			state.user.phone = payload.user.phone;
			state.user.sex = payload.user.sex;
			state.user.userName = payload.user.user_name;
			state.user.avatar = payload.user.avatar;

			state.user.token = payload.token;
			state.user.password = ''; //为了安全置空密码
			state.user.hasLogin = true;
			this.commit('loginAfterSetStorage');
		},
		login(state, payload) {
			state.user.id = payload.user.user_id;
			state.user.phone = payload.user.phone;
			state.user.sex = payload.user.sex;
			state.user.userName = payload.user.user_name;
			state.user.avatar = payload.user.avatar;

			state.user.token = payload.token;

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
		checkSchool(state, payload) {
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
		appOnLunch(state, payload) {
			state.user = payload.user;
			state.school = payload.school;
			state.selectSchool = payload.selectSchool;
		},
		onMessage(state) {
			var _self = this;
			uni.onSocketOpen(function(res) {
				console.log('WebSocket连接已打开！');
				var initDate = {
					ctype: 'init',
					id: state.user.id
				};
				uni.sendSocketMessage({
					data: JSON.stringify(initDate)
				});
				uni.onSocketMessage(function(res) {
					global.playMessage();
					var newMsg = JSON.parse(res.data);
					console.log(JSON.stringify(newMsg));
					var payload = new Object();
					payload.newMsg = newMsg;
					payload.msgObj = {
						id: state.user.id,
						toId: newMsg.id,
						avatar: newMsg.face,
						name: newMsg.name,
						msg: newMsg.msg,
						status: "未读",
						unread: 1
					};
					_self.commit('addMsg', payload);
				});
			});
		},
		addMsg(state, payload) {
			var hasMsg = false; //消息列表是否有相同的人
			for (var i = 0; i < state.msgList.length; i++) {
				if (state.msgList[i].toId === payload.msgObj.toId) {
					hasMsg = true;
					break;
				}
			}
			if (hasMsg) {
				state.msgList[i].msg = payload.msgObj.msg;
				state.msgList[i].unread += 1;
			} else {
				eval('state.historyMsg.' + newMsg.toId + '=' + payload.newMsg);
				state.msgList.unshift(payload.msgObj);
			}
		},
		changeMsg(state, index) {
			state.msgList[index].unread = 0;
			state.msgList[index].status = "已读";
		},
		delMsg(state, index) {
			state.msgList.splice(index, 1);
		}
	}
})

export default store
