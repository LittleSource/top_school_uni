<template>
	<view>
		<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
			<view v-for="(cate, index) in categories" :key="index" :data-cateid="cate.cateid" :data-index="index" :class="[cateCurrentIndex == index ? 'grace-tab-current' : '']"
			 @tap="tabChange">{{cate.name}}</view>
		</scroll-view>
		<view class="content">
		<navigator url="./details" class="parttime-card" v-for="(job,index) in jobList" :key="index" @click="getimage">
			<view class="parttime-card-img">
				<image class="parttime-card-imge" :src="imagesList[1]" mode="scaleToFill"></image>
			</view>
			<view class="text-one">{{job.jobtitle}}</view>
			<view class="text-two">{{job.treatment}}</view>
			<view class="text-three">{{job.site}}</view>
			<view class="text-four">{{job.validtime}}</view>
		</navigator>
		</view>
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
				imagesList:[
					"https://yuange666.oss-cn-beijing.aliyuncs.com/app/parttime/catclaw.png",
					"https://yuange666.oss-cn-beijing.aliyuncs.com/app/parttime/orange.png",
					"https://yuange666.oss-cn-beijing.aliyuncs.com/app/parttime/square2.png"
				],
				loading: {
					show: false,
					nextPages: 2,
					totalPages: 2,
					type: 0,
					text: ['加载更多', 'loading ......', '已加载全部']
				}
			}
		},
		computed: mapState(['selectSchool']),
		onLoad() {
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.getList(1,this.categories[this.cateCurrentIndex]);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getList(page,type) {
				uni.request({
					url: this.GLOBAL.serverSrc + 'job/job/seljob',
					method: 'POST',
					data: {
						page: page,
						id: this.selectSchool.id
					},
					success: res => {
						if(res.data.status === 200){
							this.jobList = res.data.jobList;
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
						}
					},
					fail: (e) => {
						this.GLOBAL.requestFail(e);
					}
				});
			},
			tabChange: function(e) {
				// 选中的索引
				var index = e.currentTarget.dataset.index;
				this.cateCurrentIndex = index;
				// 动态替换内容
				this.loading.nextPages = 2;
				this.getList(1, this.categories[index].name);
			}
		},
	}
</script>
<style>
	page{
		background-color: #F6F6F6;
	}
	.grace-tab-title {
		background-color: #FC4243;
		color: #F6F6F6;
		position: fixed;
		z-index: 999;
		top: 0;
	}
	.grace-tab-title view{
		border-bottom:2px solid #FC4243;
	}
	.grace-tab-current {
		border-bottom: 4upx solid #FFFFFF !important;
		color: #FFFFFF;
	}
	.content{
		margin-top: 50px;
	}
	.parttime-card {
		background-color: #FFFFFF;
		width: 693upx;
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
		width: 90upx;
		height: 40upx;
		line-height: 40upx;
		margin-left: 15upx;
		font-size: 21upx;
		text-align: center;
		color: #ADADAD;
		background: #FAEBD7;
	}
</style>
