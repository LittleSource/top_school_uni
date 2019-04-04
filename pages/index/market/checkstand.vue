<template>
	<view>
		<view class="cu-bar bg-white">
			<view class='action'>
				<text class='icon-titles text-orange'></text>
				<text class='text-xl text-bold'>订单详情</text>
			</view>
		</view>
		<view class="grace-list">
			<view class='items' v-for="(product,index) in itemList" :key="index">
				<view class="icons">
					<image :src="product.item_img" mode="scaleToFill"></image>
				</view>
				<view class="title">{{product.item_name}}<text style="color: #000;">{{product.item_price + ' × ' +product.item_count}}</text></view>
			</view>
		</view>
		<view class="bg-white text-right has-borderb">
			<view class=' text-xl padding'>
				<text class='text-black'>小计:￥{{realPrice}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class='action'>
				<text class='icon-titles text-orange'></text>
				<text class='text-xl text-bold'>订单留言</text>
			</view>
		</view>
		<view class="cu-form-group has-bordertb">
			<textarea placeholder="请输入订单留言" :value="remark" maxlength="-1" auto-height placeholder-class='placeholder'></textarea>
		</view>
		<view class="cu-bar bg-white">
			<view class='action'>
				<text class='icon-titles text-orange'></text>
				<text class='text-xl text-bold'>付款方式</text>
			</view>
		</view>
		<view class="cu-list menu menu-avatar">
			<view class="cu-item" @click="alipay">
				<view class="cu-avatar alipay round lg"></view>
				<view class='content'>
					<view class='text-black'>支付宝</view>
					<view class='text-gray text-sm'>推荐支付宝用户使用</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar round weixin lg"></view>
				<view class='content'>
					<view class='text-black'>微信支付</view>
					<view class='text-gray text-sm'>推荐微信用户使用</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				itemList: [],
				realPrice: 999,
				orderId: 0,
				remark: ''
			}
		},
		onLoad: function(parameter) {
			this.orderId = parameter.order_id;
			this.realPrice = parameter.real_price;
			uni.showLoading({
				title: '加载中'
			});
			uni.request({
				url: this.GLOBAL.serverSrc + 'pay/create_order/select',
				method: 'POST',
				data: {
					order_id: this.orderId
				},
				success: res => {
					uni.hideLoading();
					if (res.data.status === 200) {
						this.itemList = res.data.itemList;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
					}
				},
				fail: (e) => {
					uni.hideLoading();
					this.GLOBAL.requestFail(e);
				}
			});
		},
		methods: {
			alipay() {
				uni.request({
					url: this.GLOBAL.serverSrc + 'pay/alipay/payorder',
					method: 'POST',
					data: {
						order_id: this.orderId,
						remark: this.remark
					},
					success: res => {
						var alipaySdk = res.data.alipay_sdk;
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: alipaySdk, //微信、支付宝订单数据
							success: function(res) {
								if(res.errMsg === 'requestPayment:ok'){
									uni.showToast({
										title: '付款成功'
									});
								}
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	@import "../../../static/css/colorui.css";

	.alipay {
		background-image: url('../../../static/pay/alipay.png');
	}

	.weixin {
		background-image: url('../../../static/pay/weixin.png');
	}
</style>
