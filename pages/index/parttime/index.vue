<template>
	<view>
		<view class="parttime-card" v-for="(job,index) in jobList" :key="index" @click="getimage">
			<view class="parttime-card-img">
				<image class="parttime-card-imge" :src="imagesList[1]" mode="scaleToFill"></image>
			</view>
			<view class="text-one">{{job.jobtitle}}</view>
			<view class="text-two">{{job.treatment}}</view>
			<view class="text-three">{{job.site}}</view>
			<view class="text-four">{{job.validtime}}</view>
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
				jobList: [],
				imagesList:[
					"https://yuange666.oss-cn-beijing.aliyuncs.com/app/parttime/catclaw.png",
					"https://yuange666.oss-cn-beijing.aliyuncs.com/app/parttime/orange.png",
					"https://yuange666.oss-cn-beijing.aliyuncs.com/app/parttime/square2.png"
				]
			}
		},
		computed: mapState(['selectSchool']),
		onLoad() {
			this.getList();
		},
		onPullDownRefresh() {
			this.getList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getList() {
				uni.request({
					url: this.GLOBAL.serverSrc + 'job/job/seljob',
					method: 'POST',
					data: {
						page: 1,
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
			getimage(){
				var index = Math.round(Math.random()*5);
			}
		},
	}
</script>
<style>
	.parttime-card {
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
