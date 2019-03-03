<template>
	<view class="body">
		<view class="header">
			<view class="status-bar"></view><!-- 状态栏占位 -->
			<view class="info">
				<view class="grace-iconfont icon-safe title"></view>
				<view class="title serach" @click="goSearch()">
					<view class="grace-iconfont icon-search serach-icon"></view>
					<view class="serach-text">搜索内容</view>
				</view>
				<view class="iconfont icon-jiahao title"></view>
			</view>
		</view>
		<view class="index">
			<swiper class="grace-swiper" autoplay="true" indicator-dots indicator-color="rgba(255, 255, 255, 0.5)"
			 indicator-active-color="#fc4243" style="height :290upx;" interval="3000">
				<swiper-item v-for="(img, index) in swiperimgs" :key="index">
					<navigator :url='img.path' :open-type="img.openType">
						<image :src='img.imgUrl' mode='widthFix'></image>
					</navigator>
				</swiper-item>
			</swiper>
			<view class="grace-wrap">
				<view class="grace-boxes" @click="goConfession()">
					<view class="grace-boxes-img">
						<image src="../../static/index/love.png" mode="widthFix"  style="width: 48px;"></image>
						<view class="grace-boxes-text" style="margin-left: 5px;">表白墙</view>
					</view>
				</view>
				<view class="grace-boxes">
					<view class="grace-boxes-img">
						<image src="../../static/icon/my.png" mode="widthFix"></image>
						<view class="grace-boxes-text">找兼职</view>
					</view>
				</view>
				<view class="grace-boxes">
					<view class="grace-boxes-img">
						<image src="../../static/icon/my.png" mode="widthFix"></image>
						<view class="grace-boxes-text">逛超市</view>
					</view>
				</view>
				<view class="grace-boxes">
					<view class="grace-boxes-img">
						<image src="../../static/icon/my.png" mode="widthFix"></image>
						<view class="grace-boxes-text">淘二手</view>
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
				statusBarHeight: '',
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
			goConfession() {
				uni.navigateTo({
					url: './confession/index'
				});
			},
			goSearch() {
				uni.navigateTo({
					url: '../common/search'
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

	.header>.info>.serach {
		height: 30px;
		width: 610upx;
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
		background: #fc4243;
		height: 150upx;
		padding: 15upx;
		margin-top: calc(var(--status-bar-height) + 44px);
		/* border-bottom-left-radius: 50px;
		border-bottom-right-radius: 50px; */
	}

	.grace-swiper {
		overflow: hidden;
		border-radius: 10px;
	}

	.grace-wrap {
		margin-top: 20upx;
	}

	.grace-boxes-img {
		width: 38px;
		height: 38px;
	}

	.grace-boxes-text {
		color: #7F7F7F;
	}
</style>
