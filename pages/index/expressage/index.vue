<template>
	<view>
		<view class="cu-bar solid-bottom bg-white" v-for="(item,index) in notice" :key="index">
			<view class="action">
				<text class="icon-titles text-green"></text>
				<text>{{item}}</text>
			</view>
		</view>
		<form @submit="formSubmit">
			<view class="cu-bar bg-white margin-top">
				<view class="action sub-title">
					<text class="text-xl text-bold text-green">基础信息</text>
					<text class="bg-green" style="width:3rem"></text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">姓名:</view>
				<input :value="name" name="name" placeholder="请输入姓名"></input>
				<text class="icon-locationfill text-blue" @click='autoAddress'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号:</view>
				<input :value="phone" name="phone" placeholder="请输入手机号"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">宿舍号:</view>
				<input name="dorNo" placeholder="请按格式填写，例:8-322-1"></input>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action sub-title">
					<text class="text-xl text-bold text-green">快件信息</text>
					<text class="bg-green" style="width:3rem"></text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">取货码:</view>
				<input name="code" placeholder="请输入取货码"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">快递规格:</view>
				<picker @change="typeChange" name="type" :value="type[index]" :range="type">
					<view class="picker">
						{{type[index]}}
					</view>
				</picker>
			</view>
			<view class="bg-white solid-top padding-sm text-center text-xl">
				<text class="text-price"> 订单金额 {{price}} 元</text>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action sub-title">
					<text class="text-xl text-bold text-green">备注信息</text>
					<text class="bg-green" style="width:3rem"></text>
				</view>
			</view>
			<view class="cu-form-group">
				<textarea name="remark" placeholder="没有可留空" maxlength="200" auto-height></textarea>
			</view>
			<view class="padding flex flex-direction">
				<button form-type="submit" class="cu-btn bg-green lg shadow">提交订单</button>
			</view>
		</form>
	</view>
</template>

<script>
	var graceChecker = require("../../../graceUI/graceChecker.js");
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				notice: [
					"①早上8点开始下单，下午5点截止",
					"②每天下午5点准时派送",
					"③小件(2KG及以下)2元，大件(2KG以上)3元"
				],
				price: 2,
				name: "", //姓名
				phone: "", //手机号
				type: ['小件', '大件'], //类型(大件小件)
				index: 0,
			}
		},
		computed: mapState(['school', 'addressInfo']),
		onLoad() {
			if (this.school.id == 7514101812340717564) {
				uni.showModal({
					title: '本服务暂时不支持您的学校' + this.school.title,
					showCancel: false,
					complete: () => {
						uni.navigateBack();
					}
				})
			} else {

			}
		},
		methods: {
			autoAddress(){
				var _self = this;
				uni.showLoading({
					title: '加载地址中...',
					mask: false
				});
				setTimeout(function(){
					uni.hideLoading();
					if(_self.addressInfo.name !== null){
						_self.name = _self.addressInfo.name;
						_self.phone = _self.addressInfo.phone;
					}else{
						uni.showToast({
							title:'未查询到地址信息，请手动填写',
							icon:'none'
						});
					}
				},1000);
			},
			formSubmit(e) {
				console.log(JSON.stringify(e.detail.value));
				//定义表单规则
				var rule = [{
						name: "name",
						checkType: "string",
						checkRule: "1,3",
						errorMsg: "请输入正确的姓名！"
					},
					{
						name: "phone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "手机号输入错误！"
					},
					{
						name: "dorNo",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "宿舍号不能为空！"
					},
					{
						name: "code",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "取货码不能为空！"
					},
					{
						name: "type",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "快件规格选择错误！"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!"
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style>
	@import "../../../static/css/colorui.css";
</style>
