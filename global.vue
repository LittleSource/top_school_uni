<template>
	<div></div>
</template>

<script>
	//全局配置文件
	const serverSrc = 'http://221.238.111.140/';
	const token = '';
	export default {
		token, //用户token身份
		serverSrc, //服务器地址
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
		}
	}
</script>

<style>
</style>
