<template>
	<view>
		<!-- 消息展示区 -->
		<graceIMMsg :msgs="msgs" :userid="user.id" :scrollTop="graceIMScTOP" :historyLodginText="historyLodginText"
		 v-on:getHistoryMsg="getHistoryMsg"></graceIMMsg>
		<!-- 消息提交区 -->
		<graceIMFooter v-on:sendTextMsg="sendTextMsg" v-on:sendImgMsg="sendImgMsg" v-on:sendVoiceMsg="sendVoiceMsg">
		</graceIMFooter>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	var chat;
	var msgPage = 1,
		_self;
	import graceIMFooter from "../../graceUI/components/graceIMFooter.vue";
	import graceIMMsg from "../../graceUI/components/graceIMMsg.vue";
	export default {
		// 使用组件
		components: {
			graceIMFooter,
			graceIMMsg
		},
		data() {
			return {
				toId: 0,
				msgs: [], // 消息数组
				graceIMScTOP: 99999, // 滚动条变量
				historyLodginText: "点击加载历史消息"
			};
		},
		computed: mapState(['user']),
		onLoad: function(options) {
			_self = this;
			_self.toId = options.toId;
			uni.onSocketMessage(function(res) {
				_self.receiveMsg(JSON.parse(res.data));
			});
		},
		onBackPress: function() {
			msgPage = 1;
		},
		methods: {
			// 加载历史消息函数
			getHistoryMsg: function() {
				if (this.historyLodginText == '加载中' || this.historyLodginText == '已经加载全部历史消息') {
					return false;
				}
				this.historyLodginText = '加载中...';
				// 模拟网络加载
				setTimeout(function() {
					// 假设已经加载全部
					if (msgPage > 1) {
						_self.historyLodginText = "已经加载全部历史消息";
						return false;
					}
					var historyMsg = [{
						id: 100,
						name: "历史",
						face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png",
						ctype: 1,
						msg: "历史消息演示文本内容...",
						date: _self.getNowDate()
					}, {
						id: 100,
						name: "历史",
						face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png",
						ctype: 2,
						msg: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=645650495,1612690171&fm=170&s=7F1106C68E15024D189269B303007019&w=536&h=385&img.JPEG",
						date: _self.getNowDate()
					}];
					for (var i = 0; i < historyMsg.length; i++) {
						_self.msgs.unshift(historyMsg[i]);
					}
					_self.historyLodginText = "点击加载历史消息";
					msgPage++;
				}, 500);
			},
			//接收消息函数
			receiveMsg: function(msg) {
				this.msgs.push(msg);
				// 滚动条处理
				setTimeout(function() {
					_self.graceIMScTOP = 99000 + Math.random();
				}, 1000);
			},
			//发送消息处理函数
			sendMessage:function(msg){
				
				this.receiveMsg(msg);
				uni.sendSocketMessage({
					data: JSON.stringify(msg)
				});
				uni.request({
					url: this.GLOBAL.serverSrc+'message/top_chat/record',
					method: 'POST',
					data: msg
				});
			},
			// 发送文本消息
			sendTextMsg: function(e) {
				var content = e;
				// 此处已经获取到提交的文本，向 socket 服务器发送消息即可
				// 服务器会回复一个消息到当前链接
				// 模拟接收到一个消息
				var msg = {
					to_id: this.toId, //对方id
					id: this.user.id, //用户id
					name: this.user.userName, // 昵称
					face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png", // 用户头像
					msg: content, // 消息内容
					ctype: 1, // 消息类型 [ 1. 文本类型 2. 图片类型 3. 语音类型 4. 系统通知 ]
					date: this.getNowDate()
				}
				this.sendMessage(msg);
			},
			// 发送图片消息
			sendImgMsg: function(e) {
				var imgUrl = e;
				var msg = {
					to_id: this.toId, //对方id
					id: this.user.id, //用户id
					name: this.user.userName, // 昵称
					face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png", // 用户头像
					msg: '', // 图片文件路径
					ctype: 2, // 消息类型 [ 1. 文本类型 2. 图片类型 3. 语音类型 4. 系统通知 ]
					date: this.getNowDate()
				};
				uni.uploadFile({
					url: this.GLOBAL.serverSrc + 'messsage/top_chat/recordimg',
					filePath: imgUrl,
					name: 'file',
					success: (uploadFileRes) => {
						var resObj = JSON.parse(uploadFileRes.data);
						if(resObj.status===200){
							msg.msg = resObj.imagePath;
							_self.sendMessage(msg);
						}else{
							console.log(JSON.stringify(uploadFileRes));///
						}
					},fail: (e) => {
						_self.GLOBAL.requestFail(e);
					}
				});
			},
			// 发送语音消息
			sendVoiceMsg: function(e) {
				var voiceurl = e;
				var msg = {
					to_id: this.toId, //对方id
					id: this.user.id, //用户id
					name: this.user.userName, // 昵称
					face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png", // 用户头像
					msg: voiceurl, // 语音文件路径
					ctype: 3, // 消息类型 [ 1. 文本类型 2. 图片类型 3. 语音类型 4. 系统通知 ]
					date: this.getNowDate() // 消息时间
				}
				 // 数值格式 [音频文件临时路径 , 录音长度]
				// 此处已经获取到录音文件临时地址，上传音频[ 与服务器交互完成 ]
				// 服务器会回复一个消息到当前链接
				// 模拟接收到一个消息
				console.log(JSON.stringify(e));
				uni.uploadFile({
					url: this.GLOBAL.serverSrc + 'message/top_chat/recordvoice',
					filePath: voiceurl,
					name: 'file',
					success: (uploadFileRes) => {
						var resObj = JSON.parse(uploadFileRes.data);
						if(resObj.status===200){
							msg.msg = resObj.voicePath;
							_self.sendMessage(msg);
						}else{
							console.log(JSON.stringify(uploadFileRes));///
						}
					},fail: (e) => {
						this.GLOBAL.requestFail(e);
					}
				});
			},
			// 获取当前日期
			getNowDate: function() {
				var date = new Date();
				var sign1 = "-";
				var sign2 = ":";
				var year = date.getFullYear() // 年
				var month = date.getMonth() + 1; // 月
				var day = date.getDate(); // 日
				var hour = date.getHours(); // 时
				var minutes = date.getMinutes(); // 分
				var seconds = date.getSeconds() //秒
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (day >= 0 && day <= 9) {
					day = "0" + day;
				}
				if (hour >= 0 && hour <= 9) {
					hour = "0" + hour;
				}
				if (minutes >= 0 && minutes <= 9) {
					minutes = "0" + minutes;
				}
				if (seconds >= 0 && seconds <= 9) {
					seconds = "0" + seconds;
				}
				var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
				return currentdate;
			}
		}
	}
</script>
<style>
	page {
		background: #F4F5F6;
	}
</style>
