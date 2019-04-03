<template>
	<div></div>
</template>

<script>
	//全局配置文件
	const serverChat = 'ws://39.96.188.46:8282';
	const serverSrc = 'http://apii.ym998.cn/';
	export default {
		serverSrc, //服务器地址
		serverChat,
		requestFail: function(e) {
			if (e.statusCode === 0) {
				uni.showToast({
					title: '未知的网络错误, 请确保设备处在联网状态',
					icon: "none"
				});
			} else {
				uni.showToast({
					title: '发生网络错误，错误码为：' + e.statusCode,
					icon: "none"
				});
			}
		},
		tokenFail: function() {
			uni.showToast({
				title: '身份验证失效，请重新登录！',
				icon: "none"
			});
			uni.removeStorage({
				key: 'user'
			});
			uni.redirectTo({
				url: '/pages/common/login'
			});
		},
		checkUpdater: function(currentId, updaterPage) {
			uni.request({
				url: serverSrc + 'common/check_update/update',
				method: 'GET',
				success: res => {
					if (res.statusCode === 200) {
						if (currentId != res.data.version) { //检测到更新
							uni.showModal({
								title: '发现新版本',
								content: '有新版本可用，请问您是否更新？',
								success: (res) => {
									if (res.confirm) {
										uni.navigateTo({
											url: updaterPage
										})
									}
								}
							})
						}
					}
				}
			});
		},
		playMessage: function() {
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = this.serverSrc + 'static/music/message.mp3';
			innerAudioContext.onPlay(() => {
				
			});
			innerAudioContext.onError((res) => {
				console.log(res.errMsg);
				console.log(res.errCode);
			});
		}
	}
</script>

<style>
</style>
