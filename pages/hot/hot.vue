<template>
	<view class="grace-padding">
		<view class="grace-news-list">
			<navigator class="has-borderb" v-for="(news,index) in newsList" :key="index"  :url="'./detail?aid='+news.aid">
				<view class="grace-news-list-items">
					<image :src="news.headpic" class="grace-news-list-img grace-list-imgs-l" mode="widthFix"></image>
					<view class="grace-news-list-title">
						<view class="grace-news-list-title-main">{{news.title}}</view>
						<text class="grace-news-list-title-desc grace-text-overflow">{{news.source}}</text>
					</view>
				</view>
			</navigator>
		</view>
		<graceLoading :loadingType="loading.type" :loadingText="loading.text" :show="loading.show"></graceLoading>
	</view>
</template>

<script>
	import graceLoading from "../../graceUI/components/graceLoading.vue"
	export default {
		components: {
			graceLoading
		},
		data() {
			return {
				newsList: [],
				loading: {
					show: true,
					nextPages: 2,
					totalPages:2,
					type: 0,
					text: ['加载更多', 'loading ......', '已加载全部']
				}
			}
		},
		onLoad() {
			this.newsList = uni.getStorageSync('newsList'); //获取本地缓存的数据
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			uni.request({
				url: 'http://api.dagoogle.cn/news/nlist',
				method: 'GET',
				data:{
					cid:9,
					page:1,
					psize:20
				},
				success: res => {
					this.newsList = res.data.data.list;
					this.loading.totalPages =res.data.data.total;
					//将请求的数据缓存到本地
					uni.setStorage({
						key: 'newsList',
						data: this.newsList
					});
				},
				fail: (e) => {
					this.GLOBAL.requestFail(e);
				},
				complete: () => {
					uni.stopPullDownRefresh();
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
			var prior = (this.loading.nextPages - 2) * 10;
			var nowNum = (this.loading.nextPages - 1) * 10;
			uni.request({
				url: 'http://api.dagoogle.cn/news/nlist',
				method: 'GET',
				data:{
					cid:9,
					page:this.loading.nextPages,
					psize:20
				},
				success: res => {
					this.newsList = this.newsList.concat(res.data.data.list);
				},
				fail: (e) => {
					this.GLOBAL.requestFail(e);
				},
				complete: () => {
					this.loading.type = 0;
					this.loading.nextPages++;
				}
			});
		},
		methods: {

		}
	}
</script>

<style>
	.grace-news-list {
		margin-top: -15px;
	}
</style>
