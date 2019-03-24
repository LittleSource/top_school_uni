<template>
	<view>
		<!-- 消息展示区 -->
		<graceIMMsg :msgs="msgs" :userid="imuserid" :scrollTop="graceIMScTOP" :historyLodginText="historyLodginText"
		 v-on:getHistoryMsg="getHistoryMsg"></graceIMMsg>
		<!-- 消息提交区 -->
		<graceIMFooter v-on:sendTextMsg="sendTextMsg" v-on:sendImgMsg="sendImgMsg" v-on:sendVoiceMsg="sendVoiceMsg">
		</graceIMFooter>
	</view>
</template>
<script>
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
				msgs: [], // 消息数组
				imuserid: 1002, // 用户 id
				graceIMScTOP: 99999, // 滚动条变量
				historyLodginText: "点击加载历史消息"
			};
		},
		onLoad: function(options) {
			_self = this;
			uni.connectSocket({
				url: this.GLOBAL.serverChat
			});
			uni.onSocketOpen(function(res) {
				console.log('WebSocket连接已打开！');
			});
			uni.onSocketMessage(function(res) {
				_self.receiveMsg(res.data);
				console.log('收到服务器内容：' + JSON.stringify(res.data));
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
			// 发送文本消息
			sendTextMsg: function(e) {
				var content = e;
				// 此处已经获取到提交的文本，向 socket 服务器发送消息即可
				// 服务器会回复一个消息到当前链接
				// 模拟接收到一个消息
				var msg = {
					id: 1002, //用户id
					name: "graceUI 网友", // 昵称
					face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png", // 用户头像
					msg: content, // 消息内容
					ctype: 1, // 消息类型 [ 1. 文本类型 2. 图片类型 3. 语音类型 4. 系统通知 ]
					date: this.getNowDate()
				}
				uni.sendSocketMessage({
					data: msg
				});
				// 调用接收消息函数 展示消息
				this.receiveMsg(msg);
			},
			// 发送图片消息
			sendImgMsg: function(e) {
				var imgUrl = e;
				// 此处已经获取到选择的临时图片，上传图片[ 与服务器交互完成 ]
				// 服务器会回复一个消息到当前链接
				// 模拟接收到一个消息
				var msg = {
					id: 1000, //用户id
					name: "graceUI 网友", // 昵称
					face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png", // 用户头像
					msg: imgUrl, // 图片文件路径
					ctype: 2, // 消息类型 [ 1. 文本类型 2. 图片类型 3. 语音类型 4. 系统通知 ]
					date: this.getNowDate()
				}
				// 调用接收消息函数 展示消息
				this.receiveMsg(msg);
			},
			// 发送语音消息
			sendVoiceMsg: function(e) {
				var voiceurl = e; // 数值格式 [音频文件临时路径 , 录音长度]
				// 此处已经获取到录音文件临时地址，上传音频[ 与服务器交互完成 ]
				// 服务器会回复一个消息到当前链接
				// 模拟接收到一个消息
				var msg = {
					id: 1002, //用户id
					name: "graceUI 网友", // 昵称
					face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png", // 用户头像
					msg: voiceurl, // 语音文件路径
					ctype: 3, // 消息类型 [ 1. 文本类型 2. 图片类型 3. 语音类型 4. 系统通知 ]
					date: this.getNowDate() // 消息时间
				}
				// 调用接收消息函数 展示消息
				this.receiveMsg(msg);
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
