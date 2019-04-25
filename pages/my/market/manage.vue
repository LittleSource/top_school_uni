<template>
	<view>
		<view class="box_A">
			<view class="text_A">今日收入</view>
			<view class="text_B">{{todayAmount > 0.0 ? todayAmount:'暂无收入'}}</view>
			<view class="text_C">总余额 {{balance}}元</view>
			<view class="text_D">
				<view class="text_D1">
					<view>昨日收入</view>
					<view>{{yestodayAmount == 0 ? '0.00' : yestodayAmount}}</view>
				</view>
				<view class="text_D2">
					<view>本周收入</view>
					<view>{{weekAmount == 0 ? '0.00' : weekAmount}}</view>
				</view>
				<view class="text_D3">
					<view>本月收入</view>
					<view>{{monthAmount == 0 ? '0.00' : monthAmount}}</view>
				</view>
			</view>
		</view>
		<view class="grace-padding grace-bg-white grace-common-mt">
			<view class="grace-wrap">
				<navigator class="grace-boxes" url="./order/list">
					<view class="grace-boxes-img">
						<image src="../../../static/market/gongzi.png" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">订单管理</view>
				</navigator>
				<navigator class="grace-boxes" url="./goods/index">
					<view class="grace-boxes-img">
						<image src="../../../static/market/yaoqing.png" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">商品管理</view>
				</navigator>
				<navigator class="grace-boxes" url="./classify">
					<view class="grace-boxes-img">
						<image src="../../../static/market/huandai.png" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">分类管理</view>
				</navigator>
				<view class="grace-boxes">
					<view class="grace-boxes-img">
						<image src="../../../static/market/yue.png" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">资金明细</view>
				</view>
				<navigator class="grace-boxes" url="./order/orderdetail">
					<view class="grace-boxes-img">
						<image src="../../../static/market/xinyuan.png" mode="widthFix"></image>
					</view>
					<view class="grace-boxes-text">心愿储蓄</view>
				</navigator>
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
				marketId: 0,
				todayAmount: 0.00,
				yestodayAmount: 0.00,
				weekAmount: 0.00,
				monthAmount: 0.00,
				balance: 0.00
			}
		},
		computed: mapState(['user']),
		onLoad: function() {
			const market = uni.getStorageSync('market');
			if(market.isMarket){
				this.marketId = market.marketId;
				uni.startPullDownRefresh();
			}else{
				this.GLOBAL.tokenFail();
			}
		},
		onPullDownRefresh() {
			uni.request({
				url: this.GLOBAL.serverSrc + 'market/management/amount',
				method: 'GET',
				data: {
					market_id: this.marketId
				},
				success: res => {
					if (res.data.status === 200) {
						this.todayAmount = res.data.today_amount;
						this.yestodayAmount = res.data.yestoday_amount;
						this.weekAmount = res.data.week_amount;
						this.monthAmount = res.data.month_amount;
						this.balance = res.data.balance;
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
					uni.stopPullDownRefresh();
				}
			});
		}
	}
</script>

<style>
	.grace-boxes-img image {
		width: 80upx;
		height: 80upx;
		border-radius: 8rpx;
		overflow: hidden;
	}

	.box_A {
		width: 100%;
		height: 380upx;
		background: #ff4500;
		text-align: center;
		color: white;
	}

	.text_A {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		color: #F3F4F5;
		font-size: small;
	}

	.text_B {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		font-size: xx-large;
	}

	.text_C {
		width: 100%;
		height: 100upx;
	}

	.text_D {
		width: 100%;
		height: 130upx;
	}

	.text_D1 {
		width: 250upx;
		height: 130upx;
		float: left;
	}

	.text_D2 {
		width: 250upx;
		height: 130upx;
		float: left;
	}

	.text_D3 {
		width: 250upx;
		height: 130upx;
		float: left;
	}
</style>
