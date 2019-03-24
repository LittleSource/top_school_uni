<template>
	<view>
		<view style="background:linear-gradient(to right,#ff8c55,#fc6666);width: 100%;height: 80px;">
			<image src='../../static/common/login/wave.gif' mode='scaleToFill' class='gif-wave'></image>
		</view>
		<view class="grace-padding" style="background-color: #fffcfa;">
			<view v-bind:style="{'margin-top': margin + 'px','margin-bottom': margin + 'px'}" class="grace-center">
				<image class="ym-logo" src='../../static/logo.png'></image>
			</view>
			<view class="grace-form" style="width: 95%;margin:0 auto">
				<form @submit="loginNow">
					<view class="grace-items  item-border">
						<view class="grace-label">
							<view class="iconfont icon-shouji"></view>
						</view>
						<input type="number" name="phone" class="input" v-model="phoneno" placeholder="请输入手机号" maxlength="11"></input>
					</view>
					<view class="grace-items  item-border">
						<view class="grace-label">
							<view class="iconfont icon-mima1"></view>
						</view>
						<input type="text" password name="password" class="input" v-model="password" placeholder="请输入密码" maxlength="20"></input>
					</view>
					<button :loading="btnLoading" form-type='submit' type='primary' style='background:linear-gradient(to right,#fc6666,#ff8c55); margin-top:30px;'>
						登录 <text class="grace-iconfont icon-arrow-right"></text>
					</button>
					<view class="grace-space-between grace-rows" style="margin-top:20upx;">
						<text>忘记密码</text>
						<text @tap="reg">还没有账号？点击注册</text>
					</view>
				</form>
			</view>
		</view>
		<!-- 第三方登录 -->
		<view class="login-footer grace-wrap" v-bind:style="{top: positionTop + 'px'}">
			<view class="item-border"></view>
			<view class="grace-title">
				<view class="grace-h5 grace-blod grace-center" style="color:grey">使用其他账号登录</view>
			</view>
			<view class="grace-login-three">
				<view class="grace-iconfont icon-weixin" style="color: #00c40b;" @tap="loginWithWx"></view>
				<view class="grace-iconfont icon-qq" style="color: #01a1e5;" @tap="loginWithQQ"></view>
				<view class="grace-iconfont icon-weibo" style="color: #fc4243;" @tap="loginWithWb"></view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapMutations
	} from 'vuex'
	var graceChecker = require("../../graceUI/graceChecker.js");
	export default {
		data() {
			return {
				positionTop: 500, //默认屏幕高度500
				countNum: 120,
				countDownTimer: null,
				phoneno: '',
				password: '',
				btnLoading: false
			}
		},
		computed: {
			margin() {
				return this.positionTop * 0.08;
			}
		},
		onReady() {
			this.positionTop = uni.getSystemInfoSync().windowHeight - 105;
		},
		methods: {
			...mapMutations(['login']),
			loginWithWx: function() {
				uni.showToast({
					title: "微信登录功能开发中",
					icon: "none"
				})
			},
			loginWithQQ: function() {
				uni.showToast({
					title: "QQ登录功能开发中",
					icon: "none"
				})
			},
			loginWithWb: function() {

			},
			loginNow: function(e) {
				// 表单验证
				var rule = [{
					name: "phone",
					checkType: "phoneno",
					errorMsg: "请输入正确的手机号"
				}, {
					name: "password",
					checkType: "string",
					checkRule: "8,20",
					errorMsg: "密码长度应为8-20个字符"
				}];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				// 验证通过
				if (checkRes) {
					this.btnLoading = true;
					uni.request({
						url: this.GLOBAL.serverSrc + 'common/login/login',
						method: 'POST',
						data: e.detail.value,
						success: res => {
							if (res.data.status === 200) {
								this.login(res.data);
								uni.reLaunch({
									url: '../index/index'
								});
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							}
						},
						fail: (e) => {
							this.GLOBAL.requestFail(e);
						},
						complete: () => {
							this.btnLoading = false;
						}
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			reg: function() {
				uni.navigateTo({
					url: '../register/reg',
				});
			}
		}
	}
</script>
<style>
	page {
		background-color: #fffcfa;
	}

	.gif-wave {
		position: absolute;
		width: 100%;
		top: 30px;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 50px;
	}

	.ym-logo {
		width: 68px;
		height: 68px;
		border-radius: 8px;
		webkit-box-shadow: 3px 3px 4px rgba(0, 0, 0, .15);
		box-shadow: 3px 3px 4px rgba(0, 0, 0, .15);
	}

	.item-border {
		border-bottom: 1px solid #E0E0E0 !important;
	}

	.grace-items {
		max-height: 85upx;
	}

	.login-sendmsg-btn {
		border: 1px solid #fc7677 !important;
		background: none !important;
		color: #fc7677 !important;
		width: 100%;
		height: 35px;
		line-height: 35px;
		margin-top: 6px;
		font-size: 14px !important;
	}

	.grace-login-three {
		display: flex;
		justify-content: center;
		flex-wrap: nowrap;
	}

	.grace-login-three view {
		width: 50px;
		height: 50px;
		line-height: 50px;
		font-size: 46px;
		text-align: center;
		margin: 8px 15px;
	}

	.login-footer {
		display: flex;
		position: absolute;
		flex-direction: column;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>
