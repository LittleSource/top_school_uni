<template>
	<view class="ymkj-gradient-bg">
		<view class="card-box grace-padding">
			<navigator class="confession-card" v-for="(item, index) in confessionList" :key="index" :url="'./detail?id='+item.article_id">
				<view class="confession-card-head grace-rows">
					<image class="confession-card-avatar" :src="item.avatar" mode="scaleToFill"></image>
					<view class="confession-card-head-info">
						<view style="font-size: 14px;">{{item.user_name}}</view>
						<view style="font-size: 11px;color: grey !important;">{{item.release_time}}</view>
					</view>
				</view>
				<view class="grace-news-list-img-news">
					<view class="grace-news-list-title-main" style="padding: 1%;width: 96%">{{item.content}}</view>
					<view class="grace-wrap">
						<image v-for="(imgUrl, imgIndex) in item.images_list" :key="imgIndex" mode="aspectFill" :src="imgUrl" style="height: 100px;width: 48%;margin: 2px 1%;"></image>
					</view>
				</view>
				<view class="grace-news-list-info" style="width: 96%;padding-left: 2%;">
					<view>
						<text class="iconfont icon-heart1"></text>{{item.thumbs_up}}
						<text class="iconfont icon-fire" style="margin-left:18upx;"></text>{{item.reading_volume}}
					</view>
				</view>
			</navigator>
		</view>
		<graceLoading :loadingType="loading.type" :loadingText="loading.text" :show="loading.show"></graceLoading>
		<graceAlert :show="alert.show" :msg="alert.msg" :msgtype="alert.msgtype"></graceAlert>
	</view>
</template>

<script>
	var alertTimer = null;
	import graceLoading from "../../../graceUI/components/graceLoading.vue"
	import graceAlert from '../../../graceUI/components/graceAlert.vue';
	export default {
		components: {
			graceAlert,
			graceLoading
		},
		data() {
			return {
				confessionList: [],
				alert: {
					show: false,
					msg: '',
					msgtype: ''
				},
				loading: {
					show: true,
					nextPages: 2,
					totalPages: 2,
					type: 0,
					text: ['加载更多', 'loading ......', '已加载全部']
				}
			}
		},
		methods: {
			showMsg: function(type, msg) {
				this.alert.show = true;
				this.alert.msgtype = type;
				this.alert.msg = msg;
				//延迟关闭
				var _self = this;
				if (alertTimer != null) {
					clearTimeout(alertTimer);
				}
				alertTimer = setTimeout(function() {
					_self.alert.show = false;
					_self.alert.msg = '';
				}, 2000);
			}
		},
		onLoad: function() {
			this.confessionList = uni.getStorageSync('confessionList'); //获取本地缓存的数据
			uni.startPullDownRefresh(); //自动开始刷新
		},
		onNavigationBarButtonTap() {
			uni.redirectTo({
				url: './publish'
			});
		},
		//监听下拉刷新
		onPullDownRefresh: function() {
			uni.request({
				url: this.GLOBAL.serverSrc + 'confession/card/index',
				method: 'GET',
				data:{
					page:1
				},
				success: res => {
					this.confessionList = res.data.cardsList;
					this.loading.totalPages = res.data.totalPages; //设置总页数
					this.showMsg('right', '表白墙动态已更新');
					//将请求的数据缓存到本地
					uni.setStorage({
						key: 'confessionList',
						data: this.confessionList
					});
				},
				fail: () => {
					this.showMsg('error', '服务器异常，请稍后再试！');
				},
				complete: () => {
					uni.stopPullDownRefresh(); //关闭刷新动画
				}
			});
		},
		//监听触底加载事件
		onReachBottom: function() {
			//判断当前是否正在加载
			if (this.loading.type === 1) {
				return;
			}
			//判断是否是最后一页
			if (this.loading.nextPages > this.loading.totalPages) {
				this.loading.type = 2; //显示已加载全部
				return;
			}
			this.loading.type = 1; //显示加载中
			uni.request({
				url: this.GLOBAL.serverSrc + 'confession/card/index',
				method: 'GET',
				data:{
					page:this.loading.nextPages
				},
				success: res => {
					this.confessionList = this.confessionList.concat(res.data.cardsList);
				},
				fail: () => {
					this.showMsg('error', '服务器异常，请稍后再试！');
				},
				complete: () => {
					this.loading.type = 0;
					this.loading.nextPages++;
				}
			});
		}
	}
</script>

<style>
	.card-box {
		margin-top: -8px;
	}

	.confession-card {
		padding: 1%;
		margin: 18upx auto;
		background: #FFFFFF;
		border-radius: 8upx;
		webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .10), 0 3px 5px 0 rgba(0, 0, 0, .12);
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .10), 0 3px 5px 0 rgba(0, 0, 0, .12);
	}

	.confession-card-head {
		height: 38px;
		width: 100%;
	}

	.confession-card-avatar {
		border-radius: 15px;
		height: 30px;
		width: 30px;
		margin-top: 4px;
		margin-left: 5px;
	}

	.confession-card-head-info {
		margin-left: 5px;
		margin-top: 5px;
	}
</style>
