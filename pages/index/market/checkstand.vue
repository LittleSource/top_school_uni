<template>
	<view>
		<view style="margin-bottom: 90upx;">
			<view class="cu-bar bg-white">
				<view class='action'>
					<text class='icon-titles text-orange'></text>
					<text class='text-xl text-bold'>收货地址</text>
				</view>
			</view>
			<navigator class="cu-list menu" url="/pages/my/address/address">
				<view v-if="addressInfo.city === null" class="cu-item arrow">
					<view class='content padding-tb-arrow'>
						<view class="iconfont icon-jiahao1"> 点击添加</view>
						<view class='text-gray text-sm'>您还没有设置收货地址</view>
					</view>
				</view>
				<view v-else class="cu-item arrow">
					<view class='content padding-tb-arrow'>
						<view>{{addressInfo.name + ' ' + addressInfo.phone}}</view>
						<view class='text-gray text-sm'>{{addressInfo.city + addressInfo.address}}</view>
					</view>
				</view>
			</navigator>
			<view class="cu-bar bg-white margin-top">
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
			<view class="cu-bar bg-white margin-top">
				<view class='action'>
					<text class='icon-titles text-orange'></text>
					<text class='text-xl text-bold'>订单留言</text>
				</view>
			</view>
			<view class="cu-form-group has-bordertb">
				<textarea placeholder="请输入订单留言" :value="remark" maxlength="-1" auto-height placeholder-class='placeholder'></textarea>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class='action'>
					<text class='icon-titles text-orange'></text>
					<text class='text-xl text-bold'>付款方式</text>
				</view>
			</view>
			<radio-group style="width: 100%;">
				<view class="cu-list menu menu-avatar">
					<view class="cu-item" @click="changeWxpay">
						<view class="cu-avatar round weixin lg"></view>
						<view class='content'>
							<view class='text-black'>微信支付
								<view class="cu-tag round bg-orange sm">推荐</view>
							</view>
							<view class='text-gray text-sm'>亿万用户的选择,更快更安全</view>
						</view>
						<view class='action'>
							<radio class='orange sm' value="wxpay" :checked="payWay==='wxpay'"></radio>
						</view>
					</view>
					<view class="cu-item" @click="changeAlipay">
						<view class="cu-avatar alipay round lg"></view>
						<view class='content'>
							<view class='text-black'>支付宝</view>
							<view class='text-gray text-sm'>推荐支付宝用户使用</view>
						</view>
						<view class='action'>
							<radio class='orange sm' value="alipay" :checked="payWay==='alipay'"></radio>
						</view>
					</view>
				</view>
			</radio-group>
		</view>
		<view class="grace-footer">
			<view style="width:50%;line-height: 90upx;font-size: 36upx;">
				<text style="margin-left: 10px;">{{realPrice}}元</text>
			</view>
			<view style="width:50%;">
				<button type="warn" @click="goPay">去支付</button>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				itemList: [],
				realPrice: 999,
				orderId: 0,
				remark: '',
				payWay: 'wxpay'
			}
		},
		computed: mapState(['user', 'addressInfo']),
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
			changeWxpay() {
				this.payWay = 'wxpay';
			},
			changeAlipay() {
				this.payWay = 'alipay';
			},
			goPay() {
				if (this.payWay === 'wxpay') {
					this.wxpay();
				} else if (this.payWay === 'alipay') {
					this.alipay();
				} else {
					uni.showToast({
						title: '请选择一个付款方式哦！',
						icon: 'none'
					})
				}
			},
			wxpay() {
				uni.request({
					url: this.GLOBAL.serverSrc + 'pay/wepay/payorder',
					method: 'POST',
					data: {
						order_id: this.orderId,
						remark: this.remark
					},
					success: res => {
						var _self = this;
						var wxpaySdk = res.data.wepay_sdk;
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: wxpaySdk, //微信订单数据
							success: function(res) {
								if (res.errMsg === 'requestPayment:ok') {
									_self.goResult(true);
								} else {
									console.log(JSON.stringify(res));
									uni.showToast({
										title: '微信支付未知错误',
										icon: 'none'
									});
								}
							},
							fail: function(err) {
								console.log(JSON.stringify(err.errMsg));
								_self.goResult(false);
							}
						});
					},
					fail: (e) => {
						this.GLOBAL.requestFail(e);
					}
				});
			},
			alipay() {
				uni.request({
					url: this.GLOBAL.serverSrc + 'pay/alipay/payorder',
					method: 'POST',
					data: {
						order_id: this.orderId,
						remark: this.remark
					},
					success: res => {
						var _self = this;
						var alipaySdk = res.data.alipay_sdk;
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: alipaySdk, //微信、支付宝订单数据
							success: function(res) {
								if (res.errMsg === 'requestPayment:ok') {
									_self.goResult(true);
								} else {
									console.log(JSON.stringify(res));
									uni.showToast({
										title: '支付宝未知错误',
										mask: false,
										icon: "none"
									});
								}
							},
							fail: function(err) {
								_self.goResult(false);
								console.log(JSON.stringify(err.errMsg));
							}
						});
					},
					fail: (e) => {
						this.GLOBAL.requestFail(e);
					}
				});
			},
			goResult(result) {
				if (result) {
					uni.showToast({
						title: '付款成功'
					});
					uni.redirectTo({
						url: './payresult?result=success&order_id=' + this.orderId + '&price=' + this.realPrice
					})
				} else {
					uni.navigateTo({
						url: './payresult?result=fail&order_id=' + this.orderId
					})
				}
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
		background-image: url('../../../static/pay/weixin2.png');
	}
</style>
