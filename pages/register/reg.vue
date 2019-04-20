<template>
	<view class="grace-padding">
		<view style="margin-top:40px;margin-bottom: 10px;" class="grace-center">
			<image class="ym-logo" src='../../static/logo.png'></image>
		</view>
		<view class="grace-form" style="width: 95%;margin:0 auto;">
			<form @submit="regNow">
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
				<view class="grace-space-between item-border" style="margin-top:28upx;max-height: 95upx;">
					<view class="grace-items" style="width:70%;">
						<view class="grace-label">
							<view class="iconfont icon-yanzhengma"></view>
						</view>
						<input type="number" class="input" name="yzm" placeholder="请输入验证码"></input>
					</view>
					<view style="width:28%;  margin-left:2%; paading:0;">
						<button type="primary" class="login-sendmsg-btn" @tap='getVCode'>{{vcodeBtnName}}</button>
					</view>
				</view>
				<button :loading="btnLoading" form-type='submit' type='primary' style='background:#fc4243; margin-top:30px;'>
					注册 <text class="grace-iconfont icon-arrow-right"></text>
				</button>
			</form>
		</view>
		<!-- 第三方登录 -->
		<view class="reg-footer" v-bind:style="{top: positionTop + 'px'}">
			<view class="item-border"></view>
			<view class="grace-title">
				<view class="grace-h5 grace-center" style="color:grey">Copyright © 源梦网络科技</view>
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
				positionTop: 500,
				vcodeBtnName: "获取验证码",
				countNum: 120,
				countDownTimer: null,
				phoneno: '',
				password: '',
				btnLoading: false,
				isThird: 0
			}
		},
		onLoad(parameter) {
			if (parseInt(parameter.is_third) === 1) {
				this.isThird = 1;
			}
			this.positionTop = uni.getSystemInfoSync().windowHeight - 40;
		},
		methods: {
			...mapMutations(['regSetPhoneAndPass']),
			loginWithWx: function() {
				uni.showToast({
					title: "微信登录功能开发中",
					icon: "none"
				})
			},
			regNow: function(e) {
				// 表单验证
				var rule = [{
					name: "phone",
					checkType: "phoneno",
					errorMsg: "请输入正确的手机号"
				}, {
					name: "yzm",
					checkType: "string",
					checkRule: "6,6",
					errorMsg: "短信验证码不正确"
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
					uni.request({ //为了安全由后端验证验证码
						url: this.GLOBAL.serverSrc + 'common/register/verifyVCode',
						method: 'POST',
						data: {
							'phone': e.detail.value.phone,
							'vCode': e.detail.value.yzm
						},
						success: res => {
							if (res.data.status === 200) {
								var payload = {
									phone: e.detail.value.phone,
									password: e.detail.value.password
								};
								this.regSetPhoneAndPass(payload);
								uni.navigateTo({
									url: './selectSex?is_third=' + this.isThird
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
			getVCode: function() {
				var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.phoneno)) {
					uni.showToast({
						title: '请填写正确的手机号码',
						icon: "none"
					});
					return false;
				}
				// 手机号码为 :  this.phoneno
				// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
				if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送') {
					return;
				}
				this.vcodeBtnName = "发送中...";
				// 与后端 api 交互，发送验证码
				uni.request({
					url: this.GLOBAL.serverSrc + 'common/register/sendVcode?phone=' + this.phoneno,
					method: 'GET',
					success: res => {
						if (res.data.status === 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
							// 倒计时
							this.countNum = 120;
							this.countDownTimer = setInterval(function() {
								this.countDown();
							}.bind(this), 1000);
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
							this.vcodeBtnName = "获取验证码";
						}
					},
					fail: (e) => {
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
						this.vcodeBtnName = "获取验证码";
					}
				});
			},
			countDown: function() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = "重新发送";
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + '秒重发';
			}
		}
	}
</script>
<style>
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

	.reg-footer {
		display: flex;
		position: absolute;
		flex-direction: column;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>
