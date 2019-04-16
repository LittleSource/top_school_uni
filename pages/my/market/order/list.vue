<template>
	<view class="grace-padding">
		<view class="grace-news-list">
			<navigator>
				<view class="grace-news-list-items">
					<image src="../../../../static/logo.png" class="grace-news-list-img grace-list-imgs-l" mode="widthFix"></image>
					<view class="grace-news-list-title">
						<view class="grace-news-list-title-main">可乐等10件商品</view>
						<text class="grace-news-list-title-desc grace-text-overflow">订单号201904031131365696212</text>
						<text class="grace-news-list-title-desc grace-text-overflow">留言要买什么东西</text>
						<text class="grace-news-list-title-desc grace-text-overflow">2018-02-25</text>
					</view>
				</view>
			</navigator>
			<navigator>
				<view class="grace-news-list-items">
					<image src="../../../../static/logo.png" class="grace-news-list-img grace-list-imgs-l" mode="widthFix"></image>
					<view class="grace-news-list-title">
						<view class="grace-news-list-title-main">一个项目经理不搞砸几个项目</view>
						<text class="grace-news-list-title-desc grace-text-overflow">搞砸了就是有前途</text>
						<text class="grace-news-list-title-desc grace-text-overflow">搞砸了就是有前途</text>
						<text class="grace-news-list-title-desc grace-text-overflow">搞砸了就是有前途</text>
					</view>
				</view>
			</navigator>
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
				orderList: []
			}
		},
		computed: mapState(['user']),
		onLoad() {
			const market = uni.getStorageSync('market');
			if (market.isMarket) {
				this.marketId = market.marketId;
			}
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			uni.request({
				url: this.GLOBAL.serverSrc + 'market/management/order',
				method: 'POST',
				data: {
					phone: this.user.phone,
					token: this.user.token,
					market_id: this.marketId
				},
				success: res => {
					if (res.data.status === 200) {
						this.orderList = res.data.orderList;
						console.log(JSON.stringify(this.orderList));
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
					uni.hideLoading();
				}
			});
		}
	}
</script>

<style>
	.order-card {
		padding: 1%;
		margin: 18upx auto;
		background: #FFFFFF;
		border-radius: 8upx;
		webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .10), 0 3px 5px 0 rgba(0, 0, 0, .12);
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .10), 0 3px 5px 0 rgba(0, 0, 0, .12);
	}
	.grace-news-list{
		padding: 0upx 12upx 12upx 12upx;
	}
	.grace-news-list-title-desc{
		margin-top: 5upx;
	}
</style>
