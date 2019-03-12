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
					<input type="number" name="phone" class="input" v-model="phoneno" placeholder="请输入手机号"></input>
				</view>
				<view class="grace-items  item-border">
					<view class="grace-label">
						<view class="iconfont icon-mima1"></view>
					</view>
					<input type="text" password name="password" class="input" v-model="password" placeholder="请输入密码"></input>
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
				<button form-type='submit' type='primary' style='background:#fc4243; margin-top:30px;'>
					注册 <text class="grace-iconfont icon-arrow-right"></text>
				</button>
			</form>
		</view>
		<!-- 第三方登录 -->
		<view class="reg-footer" v-bind:style="{top: positionTop + 'px'}">
			<view class="item-border"></view>
			<view class="grace-title">
				<view class="grace-h5 grace-blod grace-center" style="color:grey">使用其他账号登录</view>
			</view>
			<view class="grace-login-three">
				<view class="grace-iconfont icon-weixin" style="color: #00c40b;" @tap="loginWithWx"></view>
				<view class="grace-iconfont icon-qq" style="color: #01a1e5;"></view>
				<view class="grace-iconfont icon-weibo" style="color: #fc4243;"></view>
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
				yzm: ''
			}
		},
		onLoad() {
			this.positionTop = uni.getSystemInfoSync().windowHeight - 105;
		},
		methods: {
			...mapMutations(['regSetPhone']),
			loginWithWx: function() {
				uni.showToast({
					title: "微信登录功能开发中",
					icon: "none"
				})
			},
			changePre: function(e) {
				this.pnpre = this.pnpres[e.detail.value];
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
					errorMsg: "短信验证码输入错误"
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
					var data = e.detail.value;
					data.verificationCode = this.yzm;
					uni.request({
						url: this.GLOBAL.serverSrc + 'register',
						method: 'POST',
						data: data,
						success: res => {
							if (res.data.status === 200) {
								this.regSetPhone(this.phoneno);
								uni.navigateTo({
									url: './selectSex'
								});
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							}
						},
						fail: () => {},
						complete: () => {}
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
					url: this.GLOBAL.serverSrc + 'register/sendSms/' + this.phoneno,
					method: 'GET',
					success: res => {
						console.log(JSON.stringify(res));
						if (res.data.status === 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
							this.yzm = res.data.verificationCode;
							// 倒计时
							this.countNum = 120;
							this.countDownTimer = setInterval(function() {
								this.countDown();
							}.bind(this), 1000);
						} else if (res.data.status === 400) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
							this.vcodeBtnName = "获取验证码";
						}
					},
					fail: () => {
						console.log(JSON.stringify('123213'));
					},
					complete: () => {}
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
