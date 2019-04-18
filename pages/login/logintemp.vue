<template>
	<view class="body" :style="{height:windowHeight+'px','background-image': 'url(../../static/common/login/loginbg.jpg)'}">
		<view style="padding-top: 60%;"></view>
		<view class="btn-area">
			<button plain type="warn" @click="register">注册新账号</button>
			<button plain type="default" style="margin-top: 20px;" @click="binding">绑定已有账号</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: 600,
				openId: '',
				type: -1
			}
		},
		onLoad(parameter) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
			this.openId = parameter.open_id;
			this.type = parameter.type;
		},
		methods: {
			binding() {
				uni.navigateTo({
					url: './binding?open_id=' + this.openId + '&type=' + this.type
				})
			},
			register() {
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(JSON.stringify(infoRes));
					}
				});
			}
		}
	}
</script>

<style>
	.body {
		width: 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.btn-area {
		padding: 20upx 80upx;
	}
</style>
