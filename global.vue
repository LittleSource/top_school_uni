<template>
	<div></div>
</template>

<script>
	//全局配置文件
	const serverChat = 'ws://123.151.4.184:8282';
	const serverSrc = 'http://www.hckj99.cn/';
	const token = '';
	export default {
		token, //用户token身份
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
			uni.redirectTo({
				url: '/pages/common/login'
			});
		},
		checkUpdater: function(currentId, updaterPage) {
			uni.request({
				url: 'https://www.easy-mock.com/mock/5c95e1ac8e241c358386bc16/pure-updater/version/id',
				method: 'GET',
				data: {
					search: 'latestId'
				},
				success: res => {
					if (res.statusCode === 200) {
						const response = res.data
						const latestId = response.latest.id
						if (currentId != latestId) { //检测到更新
							uni.showModal({
								title: '发现新版本',
								content: '有新版本可用，请问您是否更新？',
								success: (res) => {
									if (res.confirm) {
										uni.navigateTo({
											url: updaterPage
										})
									} else if (res.cancel) {
										console.log('取消')
									}
								}
							})
						}
					}
				}
			});
		}
	}
</script>

<style>
</style>
