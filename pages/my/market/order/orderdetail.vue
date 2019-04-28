<template>
	<view class="main">
		<view class="box-top"><!--上层订单的整体框架-->
			<view class="arrive">{{orderStatus}} &gt;</view>
			<view class="service">
				<view class="service-thanks">如未处理订单请尽快处理，1小时内未处理会对您的店铺会产生信用影响</view>
				<view><text class="service-time">准时达服务：</text><text class="service-special">当前特殊情况暂不享受超时赔付</text></view>
			</view>
		</view>
		<view class="menu"><!--中间层框架-->
			<view class="shop grace-rows">
				<view style="font-weight: 700;font-size: 36upx;">
					<text>{{orderInfo.market_name}}</text>
				</view>
				<text style="font-weight: bold;">&gt;</text>
			</view>
			<view class="shop grace-rows grace-space-between" v-for="(shop,index) in orderInfo.item" :key="index">
				<text>{{shop.item_name}}  x  {{shop.item_count}}</text>
				<text class="price">&yen;{{shop.item_price}}</text>
			</view>
			<view class="shop" style="border-bottom: none;">
				<text class="space count">小计 &yen;{{orderInfo.real_price}}</text>
			</view>
		</view>
		<view class="send"><!--配送信息-->
			<view class="send-way">
				<view><text style="font-size: 36upx;">配送信息</text></view>
			</view>
			<view class="send-way grace-rows grace-space-between">
				<text>处理时间</text>
				<text>{{orderInfo.dispose == 0?'您还未处理此订单！':'未设置数据库字段'}}</text>
			</view>
			<view class="send-way grace-rows grace-space-between">
				<text>收货地址</text>
				<text style="font-size: 20upx;">{{orderInfo.address}}</text>
			</view>
			<view class="send-way grace-rows grace-space-between" style="border-bottom: none;">
				<text>配送方式</text>
				<text>商家配送</text>
			</view>
		</view>
		<view class="send"><!--订单信息-->
			<view class="send-way">
				<text style="font-size: 36upx;">订单信息</text>
			</view>
			<view class="send-way grace-rows grace-space-between">
				<view><text>订单号</text></view>
				<view><text style="font-size: 30upx; ">{{orderInfo.out_trade_no}}</text></view>
			</view>
			<view class="send-way grace-rows grace-space-between">
				<text>支付方式</text>
				<text>{{orderInfo.pay_type == 1?'支付宝在线支付':'微信在线支付'}}</text>
			</view>
			<view class="send-way grace-rows grace-space-between" style="border-bottom: none;">
				<text>下单时间</text>
				<text>{{orderInfo.create_time}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	export default{
		data() {
			return {
				orderStatus:'',
				marketId:0,
				orderInfo: []
			}
		},
		computed: mapState(['user']),
		onLoad(parameter) {
			const market = uni.getStorageSync('market');
			if (market.isMarket) {
				this.marketId = market.marketId;
			} else {
				uni.showToast({
					title: '系统错误',
					mask: false,
					duration: 1500
				});
				uni.navigateBack();
			}
			uni.showLoading({
				title: '加载中...',
				mask: false
			});
			uni.request({
				url: this.GLOBAL.serverSrc+'market/management/orderitem',
				method: 'POST',
				data: {
					phone:this.user.phone,
					token:this.user.token,
					market_id:this.marketId,
					order_id:parameter.order_id
				},
				success: res => {
					if(res.data.status === 200){
						this.orderInfo = res.data.order;
						if(this.orderInfo.pay_status == 1){//支付了判断处理状态
							if(this.orderInfo.dispose == 1){
								this.orderStatus = '订单已处理';
							}else if(this.orderInfo.dispose == 2){
								this.orderStatus = '订单已退款';
							}else{
								this.orderStatus = '您还未处理此订单！';
							}
						}else{
							this.orderStatus = '待付款';
						}
					}else{
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
					uni.hideLoading();
				}
			});
		},
		methods:{
			god(){
				
			}
		}
	}
</script>
<style>
	page{
		background-color: #f5f5f5;
	}
	.grace-rows{
		font-size: 28upx !important;
	}
	.count{
		float: right; font-size: 35upx;font-weight: 600;
	}
	.box-top{/*最上面的大框架*/
		width: 85%;
		padding: 40upx 30upx;
		box-shadow: 1upx 1upx 1px #f5f5f5;
		margin: 20upx auto;
		margin-top: 10px;
		background: white;
	}
	.arrive{
		height: 90upx;
		border-bottom: 1upx solid #f5f5f5;
		color: black;
		font-size: 46upx;
		margin-bottom: 15upx;
	}
	.service{
		margin-top: 20upx;
		font-size: 35upx;
	}
	.service-thanks{
		font-size: 35upx;
		margin: 20upx 0;
	}
	.service-time{
		font-size: 30upx;
		color: #ff4243;
		font-weight: bold;
	}
	.service-special{
		font-size: 28upx;
		color: #969696;
	}
	.button{
		display: inline-block;
		margin-top: 30upx;
		width: 190upx;
		height: 75upx;
		line-height: 75upx;
		font-size: 32upx;
	}/*-----------------以下是menu-----------------*/
	.menu{
		width: 85%;
		padding: 20upx 30upx;
		box-shadow: 1upx 1upx 1px #f5f5f5;
		margin: 0 auto;
		margin-bottom: 10upx;
		background: white;
	}
	.shop{
		height: 100upx;
		line-height: 100upx;
		border-bottom: 1upx solid #f5f5f5;
		font-size: 33upx;
		color: black;
	}
	.price{
		margin-right: 60upx;
	}
	/*-----------------以下是配送信息-----------------*/
	.send{
		width: 85%;
		padding: 20upx 30upx;
		box-shadow: 1upx 1upx 1px #f5f5f5;
		margin: 0 auto;
		margin: 20upx auto;
		background: white;
	}
	.send-way{
		height: 100upx;
		line-height: 100upx;
		border-bottom: 1upx solid #f5f5f5;
		font-size: 33upx;
		color: black;
	}
	.space{
		margin-right: 30upx;
	}
</style>