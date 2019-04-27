<template>
	<view>
		<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
			<view v-for="(cate, index) in categories" :key="index" :data-cateid="cate.cateid" :data-index="index" :class="[cateCurrentIndex == index ? 'grace-tab-current' : '']"
			 @tap="tabChange">{{cate.name}}</view>
		</scroll-view>
		<view class="content">
			<navigator class="parttime-card" v-for="(job,index) in jobList" :key="index" :url="'./details?id='+job.id">
				<view class="parttime-card-img">
					<image class="parttime-card-imge" :src="job.img" mode="scaleToFill"></image>
				</view>
				<view class="text-one grace-ellipsis">{{job.jobtitle}}</view>
				<view class="text-two">{{job.treatment}}</view>
				<view class="text-three">{{job.site}}</view>
				<view class="text-four"><text style="margin: 5upx;">{{job.type}}</text></view>
				<view class="text-four"><text style="margin: 5upx;">{{job.validtime}}</text></view>
			</navigator>
		</view>
		<graceLoading :loadingType="loading.type" :loadingText="loading.text" :show="loading.show"></graceLoading>
	</view>
</template>
<script>
	import graceLoading from "../../../graceUI/components/graceLoading.vue"
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			graceLoading
		},
		data() {
			return {
				//分类信息
				categories: [{
						cateid: 0,
						name: "全部"
					},
					{
						cateid: 1,
						name: "日结"
					},
					{
						cateid: 2,
						name: "短期"
					},
					{
						cateid: 3,
						name: "长期"
					}
				],
				// 当前选择的分类
				cateCurrentIndex: 0,
				jobList: [],
				loading: {
					show: true,
					nextPages: 2,
					totalPages: 2,
					type: 0,
					text: ['加载更多', 'loading ......', '已加载全部']
				}
			}
		},
		computed: mapState(['selectSchool']),
		onLoad() {
			this.jobList = uni.getStorageSync('jobList'); //获取本地缓存的数据
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			uni.request({
				url: this.GLOBAL.serverSrc + 'job/job/getjoblist',
				method: 'POST',
				data: {
					page: 1,
					type: this.categories[this.cateCurrentIndex].name,
					id: this.selectSchool.id
				},
				success: res => {
					if (res.data.status === 200) {
						this.loading.totalPages = res.data.totalPages;
						this.jobList = res.data.jobList;
						//将请求的数据缓存到本地
						if(this.cateCurrentIndex === 0){
							uni.setStorage({
								key: 'jobList',
								data: this.jobList
							});
						}
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
					}
				},
				fail: (e) => {
					this.GLOBAL.requestFail(e);
				},complete: () => {
					this.loading.nextPages = 2;
					uni.stopPullDownRefresh();
				}
			});
		},
		onReachBottom() {
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
				url: this.GLOBAL.serverSrc + 'job/job/getjoblist',
				method: 'POST',
				data: {
					page: this.loading.nextPages,
					type: this.categories[this.cateCurrentIndex].name,
					id: this.selectSchool.id
				},
				success: res => {
					if (res.data.status === 200) {
						this.jobList = this.jobList.concat(res.data.jobList);
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
					this.loading.type = 0;
					this.loading.nextPages++;
				}
			});
		},
		methods: {
			tabChange: function(e) {
				var index = e.currentTarget.dataset.index; // 选中的索引
				this.cateCurrentIndex = index; // 动态替换索引
				uni.startPullDownRefresh();
			}
		},
	}
</script>
<style>
	page {
		background-color: #F6F6F6;
	}

	.grace-tab-title {
		background-color: #FC4243;
		color: #F6F6F6;
		position: fixed;
		z-index: 999;
		top: 0;
	}

	.grace-tab-title view {
		border-bottom: 2px solid #FC4243;
	}

	.grace-tab-current {
		border-bottom: 4upx solid #FFFFFF !important;
		color: #FFFFFF;
	}

	.content {
		margin-top: 50px;
	}

	.parttime-card {
		background-color: #FFFFFF;
		width: 690upx;
		height: 150upx;
		padding: 30upx;
		border-bottom: 1upx solid #ccc;
	}

	.parttime-card-img {
		width: 60upx;
		/*图片框架*/
		height: 200upx;
		float: left;
	}

	.parttime-card-imge {
		width: 60upx;
		height: 60upx;
	}

	.text-one {
		width: 385upx;
		height: 50upx;
		float: left;
		padding-left: 15upx;
		line-height: 50upx;
		font-size: 35upx;
	}

	.text-two {
		width: 228upx;
		height: 50upx;
		float: left;
		font-size: 39upx;
		text-align: right;
		line-height: 50upx;
		color: red;
	}

	.text-three {
		width: 600upx;
		height: 50upx;
		line-height: 50upx;
		text-align: left;
		float: left;
		font-size: 27upx;
		color: #ADADAD;
		padding-left: 15upx;
	}

	.text-four {
		float: left;
		width: auto;
		height: 40upx;
		line-height: 40upx;
		margin-left: 15upx;
		font-size: 21upx;
		text-align: center;
		color: #ADADAD;
		background: #FAEBD7;
	}
</style>
