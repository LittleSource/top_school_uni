<template>
	<view>
		<view class="img" style="background-image: url('../../../static/parttime/hand.jpg'); opacity: 1;">
			<view class="img-first">
				<p>{{job.jobtitle}}</p>
			</view>
			<view class="img-two">
				<p>{{job.treatment}}</p>
			</view>
			<view class="img-three">
				<p>{{job.county}} | {{job.site}}</p>
			</view>
		</view>
		<view class="claim">
			<!--要求-->
			<p>招聘要求</p>
			<view class="day">{{job.type}}</view>
			<view class="nine">招九百人</view>
			<view class="man">男女不限</view>
		</view>
		<view class="gray"></view>
		<view class="details">
			<view class="work-title">工作福利</view>
			<p>·包吃</p>
			<p>·包住</p>
			<p>·交通补贴</p>
			<p>·有提成</p>
			<p>·免费培训</p>
		</view>
		<view class="gray"></view>
		<view class="details">
			<!--详情-->
			<view class="work-title">职位详情</view>
			<p>{{job.content}}</p>
		</view>
		<view class="gray"></view>
		<view class="details">
			<view class="work-title">工作时间</view>
			<p>发布时间：{{job.addtime}}</p>
			<p>报到时间：2019年-04-25</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobId: 0,
				job:{}
			}
		},
		onLoad(parameter) {
			this.jobId = parameter.id;
			uni.showLoading({
				title:'加载中...'
			})
			uni.request({
				url: this.GLOBAL.serverSrc + '/job/job/getjob',
				method: 'POST',
				data: {
					id: this.jobId
				},
				success: res => {
					if(res.data.status === 200){
						this.job = res.data.job[0];
					}else{
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
	.img {
		/*第一排黑色大框架*/
		padding-top: 50upx;
		width: 100%;
		height: 200upx;
		background-color: black;
		opacity: 0.8;
	}

	.img-first p {
		margin-left: 34upx;
		font-size: 44upx;
		color: white;
	}

	.img-two p {
		margin-left: 34upx;
		margin-top: 20upx;
		font-size: 34upx;
		color: #FF0000;
	}

	.img-three p {
		margin-left: 34upx;
		margin-top: 20upx;
		font-size: 26upx;
		color: white;
	}

	.claim {
		/*第二排大框架*/
		width: 100%;
		height: 150upx;
		padding-top: 20upx;
		background: white;

	}

	.claim p {
		/*招聘要求*/
		font-size: 29upx;
		color: #B2B2B2;
		margin-left: 34upx;
		margin-top: 26upx;
	}

	.claim .day {
		float: left;
		padding: 5upx;
		margin-top: 20upx;
		margin-left: 34upx;
		border: 0.6upx solid #ff660d;
		border-radius: 8upx;
		color: #ff660d;
		background: #ffe9de;
		font-size: 24upx;
	}

	.claim .nine,
	.claim .man {
		float: left;
		padding: 5upx;
		margin-top: 20upx;
		margin-left: 20upx;
		border: 0.6upx solid #ff660d;
		border-radius: 8upx;
		color: #ff660d;
		background: #ffe9de;
		font-size: 24upx;
	}

	.gray {
		/*分界线*/
		width: 100%;
		height: 20upx;
		background: #EDEDED;
	}
	
	.details {
		width: 100%;
		background: white;
	}

	.work-title {
		width: 200upx;
		margin-left: 40upx;
		margin-top: 10upx;
		font-size: 35upx;
	}

	.details p {
		margin: 10upx 40upx;
		color: #555555;
		font-size: 30upx;
	}
</style>
