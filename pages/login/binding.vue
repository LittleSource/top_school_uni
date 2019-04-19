<template>
	<view>
		<view class="grace-padding" style="background-color: #fffcfa;">
			<view class="grace-form" style="width: 95%;margin:0 auto">
				<form @submit="bindNow">
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
						开始绑定 <text class="grace-iconfont icon-arrow-right"></text>
					</button>
				</form>
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
				margin: 0,
				openId:'',
				type:-1
			}
		},
		onLoad(parameter) {
			this.openId = parameter.open_id;
			this.type = parameter.type;
		},
		methods: {
			...mapMutations(['login']),
			bindNow(e) {
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
					var reqData = e.detail.value;
					reqData.openId = this.openId;
					reqData.type = this.type;
					uni.request({
						url: this.GLOBAL.serverSrc + 'common/login/binding',
						method: 'POST',
						data: reqData,
						success: res => {
							console.log(JSON.stringify(res));
							if (res.data.status === 200) {
								this.login(res.data);
								uni.showToast({
									title: '绑定成功'
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
			}
		}
	}
</script>

<style>
</style>
