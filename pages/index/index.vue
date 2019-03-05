<template>
	<view class="body">
		<view class="header">
			<view class="status-bar"></view><!-- 状态栏占位 -->
			<view class="info">
				<image class="title school-img" src='../../static/school/tjdzxxjsxy.png' @click="skip('../common/checkSchool')"></image>
				<view class="title serach" @click="skip('../common/search')">
					<view class="grace-iconfont icon-search serach-icon"></view>
					<view class="serach-text">搜索内容</view>
				</view>
				<view class="iconfont icon-jiahao title" id="btn" @click="showPopupMenu()"></view>
			</view>
		</view>
		<view class="index grace-padding" style="position:relative;">
			<swiper class="grace-swiper" autoplay="true" indicator-dots indicator-color="rgba(255, 255, 255, 0.5)" indicator-active-color="#fc4243" style="height :290upx;" interval="3000">
				<swiper-item v-for="(img, index) in swiperimgs" :key="index">
					<navigator :url='img.path' :open-type="img.openType">
						<image :src='img.imgUrl' mode='widthFix'></image>
					</navigator>
				</swiper-item>
			</swiper>
			<view class="grace-wrap">
				<view class="grace-boxes" @click="skip('./confession/index')">
					<view class="grace-boxes-img">
						<image src="../../static/index/love.png" mode="widthFix"></image>
						<view class="grace-boxes-text">表白墙</view>
					</view>
				</view>
				<view class="grace-boxes" @click="skip('./confession/detail')">
					<view class="grace-boxes-img">
						<image src="../../static/index/job.png" mode="widthFix"></image>
						<view class="grace-boxes-text">找兼职</view>
					</view>
				</view>
				<view class="grace-boxes">
					<view class="grace-boxes-img">
						<image src="../../static/index/shop.png" mode="widthFix"></image>
						<view class="grace-boxes-text">逛超市</view>
					</view>
				</view>
				<view class="grace-boxes">
					<view class="grace-boxes-img">
						<image src="../../static/index/secondhand.png" mode="widthFix"></image>
						<view class="grace-boxes-text">淘二手</view>
					</view>
				</view>
			</view>
			<view class="grace-common-mt grace-common-border">
				<view class="grace-title grace-nowrap grace-space-between">
					<view class="grace-h5 grace-blod">标题</view>
					<navigator class="grace-more-r">更多<text class="grace-iconfont icon-arrow-right"></text></navigator>
				</view>
				<view class="grace-imgitems">
					<view class="grace-items">
						<image :src="swiperimgs[0].imgUrl" mode="widthFix"></image>
						<view class="grace-imgitems-tips">标签</view>
						<view class="grace-imgitems-more">我想做自己披星戴月闯荡的盖世英雄星戴月闯荡的盖世英雄</view>
					</view>
					<view class="grace-items">
						<image :src="swiperimgs[1].imgUrl" mode="widthFix"></image>
						<view class="grace-imgitems-tips grace-imgitems-tips-green grace-imgitems-tips-r">标签</view>
						<view class="grace-imgitems-more">我想做自己披星戴月闯荡的盖世英雄</view>
					</view>
					<view class="grace-items">
						<image :src="swiperimgs[0].imgUrl" mode="widthFix"></image>
						<view class="grace-imgitems-tips">标签</view>
						<view class="grace-imgitems-more">我想做自己披星戴月闯荡的盖世英雄</view>
					</view>
					<view class="grace-items">
						<image :src="swiperimgs[1].imgUrl" mode="widthFix"></image>
						<view class="grace-imgitems-tips grace-imgitems-tips-green grace-imgitems-tips-r">标签</view>
						<view class="grace-imgitems-more">我想做自己披星戴月闯荡的盖世英雄</view>
					</view>
					<view class="grace-items">
						<image :src="swiperimgs[0].imgUrl" mode="widthFix"></image>
						<view class="grace-imgitems-tips">标签</view>
						<view class="grace-imgitems-more">我想做自己披星戴月闯荡的盖世英雄</view>
					</view>
					<view class="grace-items">
						<image :src="swiperimgs[1].imgUrl" mode="widthFix"></image>
						<view class="grace-imgitems-tips grace-imgitems-tips-green grace-imgitems-tips-r">标签</view>
						<view class="grace-imgitems-more">我想做自己披星戴月闯荡的盖世英雄</view>
					</view>
					<view class="grace-items">
						<image :src="swiperimgs[0].imgUrl" mode="widthFix"></image>
						<view class="grace-imgitems-tips">标签</view>
						<view class="grace-imgitems-more">我想做自己披星戴月闯荡的盖世英雄</view>
					</view>
					<view class="grace-items">
						<image :src="swiperimgs[1].imgUrl" mode="widthFix"></image>
						<view class="grace-imgitems-tips grace-imgitems-tips-green grace-imgitems-tips-r">标签</view>
						<view class="grace-imgitems-more">我想做自己披星戴月闯荡的盖世英雄</view>
					</view>
					<view class="grace-items">
						<image :src="swiperimgs[0].imgUrl" mode="widthFix"></image>
						<view class="grace-imgitems-tips">标签</view>
						<view class="grace-imgitems-more">我想做自己披星戴月闯荡的盖世英雄</view>
					</view>
					<view class="grace-items">
						<image :src="swiperimgs[1].imgUrl" mode="widthFix"></image>
						<view class="grace-imgitems-tips grace-imgitems-tips-green grace-imgitems-tips-r">标签</view>
						<view class="grace-imgitems-more">我想做自己披星戴月闯荡的盖世英雄</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				popupMenu: {
					show: false,
					top: 30
				},
				swiperimgs: [{
						"imgUrl": "https://img.alicdn.com/tps/i4/TB16pkzxFzqK1RjSZSgSuwpAVXa.jpg_1080x1800Q90s50.jpg",
						"path": "../alert/alert",
						"openType": "navigate"
					},
					{
						"imgUrl": "https://aecpm.alicdn.com/simba/img/TB1W4nPJFXXXXbSXpXXSutbFXXX.jpg",
						"path": "../index/index",
						"openType": "switchTab"
					},
					{
						"imgUrl": "https://aecpm.alicdn.com/simba/img/TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg",
						"path": "../gy/gy",
						"openType": "switchTab"
					}
				]
			}
		},
		onLoad: function() {

		},
		methods: {
			skip(url){
				uni.navigateTo({
					url: url
				});
			},
			showPopupMenu() {
				uni.showActionSheet({
					itemList: ['A', 'B', 'C'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					}
				});
			}
		}
	}
</script>
<style>
	.body {
		justify-content: center;
		align-items: center;
	}

	.header {
		background: #fc4243;
		width: 100%;
		position: fixed;
		top: 0;
		font-size: 25px !important;
		z-index: 999;
	}

	.header>.status-bar {
		height: var(--status-bar-height);
	}

	.header>.info {
		color: #FFFFFF;
		height: 44px;
		justify-content: center;
		align-items: center;
	}

	.header>.info>.title {
		float: left;
		margin-left: 15upx;
		margin-top: 10upx;
		font-size: 24px;
	}
	.header>.info>.school-img{
		height: 58upx;width: 58upx;
	}

	.header>.info>.serach {
		height: 30px;
		width: 590upx;
		border-radius: 15px;
		overflow: hidden;
		background-color: #FFFFFF !important;
	}

	.header>.info>.serach>.serach-icon {
		float: left;
		color: grey;
		margin-top: 8px;
		margin-left: 6px;
		font-size: 14px !important;
	}

	.header>.info>.serach>.serach-text {
		float: left;
		color: grey;
		margin-top: 5px;
		margin-left: 3px;
		font-size: 14px !important;
	}

	.index {
		background: linear-gradient(#fc4243 0%,#fc4243 9%,#fff 9%,#fff 100%);
		margin-top: calc(var(--status-bar-height) + 44px);
	}

	.grace-swiper {
		overflow: hidden;
		border-radius: 10px;
	}


	.grace-boxes-img {
		width: 48px;
		height: 48px;
	}

	.grace-boxes-text {
		color: #7F7F7F;
	}
</style>
