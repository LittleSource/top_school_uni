<template>
	<view class="grace-padding grace-bg-white grace-common-border">
		<view class="grace-form">
			<form @submit="formSubmit">
				<view class="grace-items">
					<view class="grace-label">所在学校</view>
					<input type="text" disabled class="input" name="market_school" :placeholder="school.title+'(不可更改)'"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">超市名称</view>
					<input type="text" class="input" name="market_name" placeholder="请输入超市名称" maxlength="8"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">宿舍楼</view>
					<input type="text" class="input" name="dorm_tower" placeholder="请输入您所在宿舍楼"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">宿舍号</view>
					<input type="text" class="input" name="dorm_num" placeholder="请精确到床号"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">店铺类型</view>
					<view class="grace-label-y">
						<radio-group name="type">
							<label>
								<radio value="超市" checked></radio>超市
							</label>
							<label>
								<radio value="外卖"></radio>外卖
							</label>
							<label>
								<radio value="水果"></radio>水果
							</label>
							<label>
								<radio value="其他"></radio>其他
							</label>
						</radio-group>
					</view>
				</view>
				<view style="padding:22upx 0;">
					<button formType="submit" type="primary" style="background:#fc6666;">下一步</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	var graceChecker = require("../../../graceUI/graceChecker.js");
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		computed: mapState(['school', 'user']),
		methods: {
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
						name: "market_name",
						checkType: "string",
						checkRule: "1,8",
						errorMsg: "超市名称应为1-8个字符"
					},
					{
						name: "dorm_tower",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "宿舍楼不能为空"
					},
					{
						name: "dorm_num",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "宿舍号不能为空"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					formData.user_id = this.user.id;
					formData.phone = this.user.phone;
					formData.token = this.user.token;
					formData.market_school = this.school.title;
					uni.request({
						url: this.GLOBAL.serverSrc + 'market/index/regmarket',
						method: 'POST',
						data: formData,
						success: res => {
							if (res.data.status === 200) {
								uni.navigateTo({
									url: './verifyIdCard'
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
	.grace-checked {
		background: #fc4243 !important;
		color: #FFFFFF;
	}
</style>
