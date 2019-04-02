<template>
	<view class="grace-padding grace-bg-white grace-common-border">
		<view class="grace-form">
			<form @submit="formSubmit">
				<view class="grace-items">
					<view class="grace-label">所在学校(不可更改)</view>
					<input type="text" disabled class="input" name="market_school" :placeholder="school.title"></input>
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
					<button formType="submit" type="primary" style="background:#fc6666;">提交</button>
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
		computed: mapState(['school']),
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
						name: "gender",
						checkType: "in",
						checkRule: "男,女",
						errorMsg: "请选择性别"
					},
					{
						name: "dorm_tower",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "宿舍楼名不能为空"
					},
					{
						name: "dorm_num",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "dorm_tower"
					},
					
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				console.log(JSON.stringify(e.detail.value));
			}
		}
	}
</script>
