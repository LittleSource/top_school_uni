<template>
	<view class="grace-padding">
		<view style="text-align: center;margin: 50upx auto 10upx auto;">
			<image v-if="result == 'success'" src="../../../static/error/ok.png" mode="widthFix" style="width: 300upx;height: 300upx;"></image>
			<image v-else src="../../../static/error/plaint.png" mode="widthFix" style="width: 300upx;height: 300upx;"></image>
		</view>
		<view class="text_success"><text>{{text}}</text></view>
		<view v-if="result == 'success'" class="text_order"><text>订单金额：</text><text style="color:#EE0000;font-size: 32;">&yen; {{price}}</text></view>
		<view class="grace-rows">
			<button type="warn" @click="btnClick">{{btnText}}</button>
			<button type="default" @click="goHome" style="margin-left: -50upx;">返回首页</button>
		</view>
		<view class="text_end">
			<text>注意：TOP校园不会以订单异常、系统升级为由，要求您点击任何链接进行退款操作，请勿上当受骗。</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				result: '',
				price: 0.00,
				orderId: 0,
				text:'您已取消付款',
				btnText:'继续支付'
			}
		},
		onLoad(parameter) {
			this.result = parameter.result;
			if (this.result == 'success') {
				this.text = '订单付款成功!';
				this.price = parameter.price;
				this.btnText = '查看订单';
			}
			this.orderId = parameter.orderId;
		},
		methods:{
			btnClick(){
				if (this.result == 'success') {
					uni.showToast({
						title: '跳转到个人订单详情页面 暂未实现...',
						icon:"none"
					});
				}else{
					uni.navigateBack();
				}
			},
			goHome(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>
<style>
	.text_success {
		text-align: center;
		font-size: 42upx;
		color: black;
		margin: 15upx;
		font-weight: bold;
	}

	.text_order {
		text-align: center;
		font-size: 36upx;

	}

	.grace-rows {
		padding: 10px;
	}

	.text_end {
		margin-top: 50upx;
		text-align: center;
		color: #8B8682;
		font-size: 26upx;
	}
</style>
