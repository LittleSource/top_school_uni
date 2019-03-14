<template>
	<div></div>
</template>

<script>
	//全局配置文件
	const serverSrc = 'http://123.151.2.202/';
	const token = '';
	function requestFail(){
		if(e.statusCode === 0){
			uni.showToast({
				title: '未知的网络错误, 请确保设备处在联网状态',
				icon: "none"
			});
		}else{
			uni.showToast({
				title: '发生网络错误，错误码为：' + e.statusCode,
				icon: "none"
			});
		}
	}
	export default {
		token, //用户token身份
		serverSrc //服务器地址
	}
</script>

<style>
</style>
