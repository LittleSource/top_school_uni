<template>
	<view class="grace-padding">
		<view style="text-align: center;margin: 50upx auto 10upx auto;">
			<image :src="infoImg" mode="widthFix" style="width: 300upx;height: 300upx;"></image>
		</view>
		<view class="text_success"><text>订单支付成功</text></view>
		<view class="text_order"><text>订单金额：</text><text style="color:#EE0000;font-size: 32;">&yen; {{price}}</text></view>
		<view class="grace-rows">
			<button type="warn">查看订单</button>
			<button type="default" style="margin-left: -50upx;">返回首页</button>
		</view>
		<view class="text_end">                                                                                                                      
			<text>注意：TOP校园不会以订单异常、系统升级为由，要求您点击任何链接进行退款操作，请勿上当受骗。</text>
		</view>
	</view>
</template>
<script>
	export default{
		data() {
			return {
				infoImg: 'http://yuange666.oss-cn-beijing.aliyuncs.com/app/pageinfo/ok.png',
				price:0.00
			}
		},
		onLoad(parameter) {
			this.price = parameter.price;
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
	.grace-rows{
		padding: 10px;
	}
	.text_end {
		margin-top: 50upx;
		text-align: center;
		color: #8B8682;
		font-size: 26upx;
	}
</style>
