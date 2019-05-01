<template>
	<view class="body">
		<view class="header">
			<view class="status-bar"></view><!-- 状态栏占位 -->
			<view class="info grace-rows">
				<view class="grace-iconfont icon-position grace-ellipsis" @click="skip('../common/checkSchool?index=true')">
					<text class="is-bold" style="margin-left: 5upx;">{{selectSchool.title}}</text>
				</view>
				<view class="grace-rows">
					<view class="serach" @click="skip('../common/search')">
						<view class="grace-iconfont icon-search serach-icon"></view>
						<view class="serach-text">搜索内容</view>
					</view>
					<view class="iconfont icon-scan scan" @click="showPopupMenu()"></view>
				</view>
			</view>
		</view>
		<view class="index grace-padding" style="position:relative;">
			<swiper class="grace-swiper" autoplay="true" indicator-dots indicator-color="rgba(255, 255, 255, 0.5)"
			 indicator-active-color="#fc4243" style="height :290upx;" interval="3000">
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
				<view class="grace-boxes">
					<view class="grace-boxes-img" @click="skip('./parttime/index')">
						<image src="../../static/index/job.png" mode="widthFix"></image>
						<view class="grace-boxes-text">找兼职</view>
					</view>
				</view>
				<view class="grace-boxes" @click="skip('./market/index')">
					<view class="grace-boxes-img">
						<image src="../../static/index/shop.png" mode="widthFix"></image>
						<view class="grace-boxes-text">逛超市</view>
					</view>
				</view>
				<view class="grace-boxes" @click="skip('./expressage/index')">
					<view class="grace-boxes-img">
						<image src="../../static/index/daiban.png" mode="widthFix"></image>
						<view class="grace-boxes-text">取快递</view>
					</view>
				</view>
			</view>
			<view class="grace-common-mt grace-common-border">
				<view class="grace-title grace-nowrap grace-space-between">
					<view class="grace-h5 grace-blod">热门表白</view>
					<navigator url="./confession/index" class="grace-more-r">更多<text class="grace-iconfont icon-arrow-right"></text></navigator>
				</view>
				<view class="grace-imgitems">
					<view class="grace-items" v-for="(item,index) in indexConfessionList" :key="index" @click="goConfession(item.article_id)">
						<image :src="item.image_path" style="height: 220upx;" mode="aspectFill"></image>
						<view class="grace-imgitems-tips">表白墙</view>
						<view class="grace-imgitems-more grace-ellipsis">{{item.content}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				popupMenu: {
					show: false,
					top: 30
				},
				indexConfessionList: [],
				swiperimgs: [{
						"imgUrl": "https://icloud.9ykm.cn/app/banner/mmexport1.jpg",
						"path": "../alert/alert",
						"openType": "navigate"
					},
					{
						"imgUrl": "https://icloud.9ykm.cn/app/banner/mmexport2.jpg",
						"path": "../index/index",
						"openType": "switchTab"
					},
					{
						"imgUrl": "https://icloud.9ykm.cn/app/banner/mmexport3.jpg",
						"path": "../gy/gy",
						"openType": "switchTab"
					}
				]
			}
		},
		computed: mapState(['user', 'selectSchool']), // 拿到vuex的user对象,
		onLoad: function() {
			if (!this.user.hasLogin) {
				uni.redirectTo({
					url: '../login/login'
				});
			}
			this.indexConfessionList = uni.getStorageSync('indexConfessionList'); //获取本地缓存的数据
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.getList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getList() {
				uni.request({ //请求热点表白墙
					url: this.GLOBAL.serverSrc + '/common/index/confession',
					method: 'GET',
					data: {
						id: this.selectSchool.id
					},
					success: res => {
						if (res.data.status === 200) {
							this.indexConfessionList = res.data.confessionList;
							//将请求的数据缓存到本地
							uni.setStorage({
								key: 'indexConfessionList',
								data: this.indexConfessionList
							});
						}
					},
					fail: (e) => {
						this.GLOBAL.requestFail(e);
					}
				});
			},
			skip(url) {
				uni.navigateTo({
					url: url
				});
			},
			goConfession(id) {
				uni.navigateTo({
					url: './confession/detail?id=' + id
				});
			},
			showPopupMenu() {
				uni.scanCode({
					success: function(res) {
						console.log(JSON.stringify(res.result));
						var obj = {};
						var arr = url.split("?");
						var vars = arr[1].split("&");
						for (var i = 0; i < vars.length; i++) {
							var pair = vars[i].split("=");
							obj[pair[0]] = pair[1];
						}
						obj["url"] = arr[0].split("//")[1].split("/")[0];
						
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

	.header .status-bar {
		height: var(--status-bar-height);
	}

	.header .info {
		color: #FFFFFF;
		height: 44px;
		justify-content: space-between;
		align-items: center;
		margin: 0 15upx;
	}

	.header .info .scan {
		margin: 3px 0px 0px 8upx;
		font-size: 20px;
	}

	.icon-changeschool {
		font-size: 22px;
	}

	.header .info .serach {
		height: 30px;
		width: 276upx;
		border-radius: 8px;
		overflow: hidden;
		background-color: #F5F5F5 !important;
	}

	.header .info .serach .serach-icon {
		float: left;
		color: grey;
		margin-top: 8px;
		margin-left: 6px;
		font-size: 14px !important;
	}

	.header .info .serach .serach-text {
		float: left;
		color: grey;
		margin-top: 5px;
		margin-left: 3px;
		font-size: 14px !important;
	}

	.index {
		background: linear-gradient(#fc4243 0%, #fc4243 9%, #fff 9%, #fff 100%);
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

	.grace-wrap {
		margin: 10px 0;
	}
</style>
