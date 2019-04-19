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
	var _self;
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				windowHeight: 600,
				type: -1
			}
		},
		onLoad(parameter) {
			_self = this;
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
			this.type = parseInt(parameter.type);
		},
		methods: {
			...mapMutations(['regSetUserName', 'regSetAvatar']),
			binding() {
				uni.navigateTo({
					url: './binding'
				});
			},
			register() {
				var provider = ''; //服务商
				switch (this.type) {
					case 0:
						provider = 'weixin';
						break;
					case 1:
						provider = 'qq';
						break;
					case 2:
						provider = 'sinaweibo';
						break;
				}
				uni.getUserInfo({
					provider: provider,
					success: function(infoRes) {
						switch (_self.type) {
							case 0:
								_self.regSetUserName(infoRes.userInfo.nickName);
								_self.regSetAvatar(infoRes.userInfo.avatarUrl);
								console.log(infoRes.userInfo.avatarUrl);
								break;
							case 1:
								_self.regSetUserName(infoRes.userInfo.nickname);
								_self.regSetAvatar(infoRes.userInfo.figureurl_qq);
								break;
							case 2:
								provider = 'sinaweibo';
								break;
						}
						console.log(JSON.stringify(infoRes.userInfo));
					}
				});
				uni.navigateTo({
					url: '/pages/register/reg?is_third=1'
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
