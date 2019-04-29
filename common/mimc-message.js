import MIMCUser from './mimc-min_1_0_2.js';
module.exports = {
	mimc_appId: "2882303761517996493",
	mimc_appSecret: "+hiOSqWV3qHZzTAo1PAayw==",
	mimc_appKey: "5571799613493",
	mimc_appAccount: "67",
	ucurl: 'https://mimc.chat.xiaomi.net/api/uctopic',
	httpRequest: function(url, data) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url, false);
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.send(JSON.stringify(data));
		return JSON.parse(xhr.response);
	},
	fetchMIMCToken: function() {
		var sendData = {
			appId: this.mimc_appId,
			appKey: this.mimc_appKey,
			appSecret: this.mimc_appSecret,
			appAccount: this.mimc_appAccount
		};
		return this.httpRequest('https://mimc.chat.xiaomi.net/api/account/token', sendData);
	},
	statusChange: function(bindResult, errType, errReason, errDesc) {
		if (bindResult) {
			console.log("login succeed");
		} else {
			console.log("login failed.errReason=" + errReason + ",errDesc=" + errDesc + ",errType=" + errType);
		}
	},
	login: function(appAccount) {
		user = new MIMCUser(this.mimc_appId, appAccount);
		user.registerFetchToken(this.fetchMIMCToken()); //获取token回调
		user.registerStatusChange(this.statusChange()); //登录结果回调
		// user.registerServerAckHandler(serverAck); //发送消息后，服务器接收到消息ack的回调
		// user.registerP2PMsgHandler(receiveP2PMsg); //接收单聊消息回调
		// user.registerGroupMsgHandler(receiveP2TMsg); //接收群聊消息回调
		// user.registerDisconnHandler(disconnect); //连接断开回调
		user.login();
	}
}
