<template>
	<view>
		<view class="top">
			<view class="img" style="background-image: url('../../../static/parttime/top3.jpg');">TOP校园兼职认证<br>
				<view class="img-two">系统即时审核，无需等待</view>
			</view>
			<view class="blue">
				<view class="text">
					<p class="now">企业机构认证</p>
					<p>同时在线招聘条数</p>
					<p>认证企业表示</p>
					<p>兼职优先审核</p>
					<p>指定兼职</p>
					<p>兼职优先排序</p>
					<p>兼职专场活动</p>
					<p>兼职信息优先审核</p>
				</view>
				<view class="form">
					<button type="default" class="input" style="color: skyblue;" @click="goCompany">免费申请</button>
					<view class="litter">
						<p>无上限</p>
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="text">
					<p class="now">个人团队认证</p>
					<p>同时在线招聘条数</p>
					<p>认证团队标识</p>
					<p>指定兼职类别</p>
					<p>兼职信息优先审核</p>
				</view>
				<view class="form">
					<button type="default" class="input" style="color: skyblue;">免费申请</button>
					<view class="litter">
						<p>3条</p>
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
				key: ''
			}
		},methods: {
			goCompany() {
				uni.navigateTo({
					url: './protocol?type=1'
				});
			}
		},
	}
</script>
<style>
	.top {
		width: 100%;
		height: 300upx;
	}

	.img {
		width: 100%;
		height: 250upx;
		padding-top: 50upx;
		text-align: center;
		font-size: 60upx;
		color: white;
		text-shadow: 3upx 3upx 3upx gray;
	}

	.img-two {
		font-size: 30upx;
		color: white;
		margin-top: 25upx;
	}

	.blue {
		width: 600upx;
		height: 550upx;
		margin: 10upx auto;
		background: skyblue;
		padding: 25upx 30upx;
		border-radius: 15upx;
	}

	.text {
		float: left;
		width: 300upx;
		color: white;
		font-size: 20upx;
		line-height: 60upx;
	}

	.text p.now {
		font-size: 40upx;
		margin-bottom: 22upx;
		font-weight: bold;
	}

	.form {
		float: right;
		width: 280upx;
		height: 200upx;
		text-align: center;
	}

	.input {
		width: 200upx;
		height: 58upx;
		float: right;
		font-size: 35upx;
		line-height: 58upx;
		border-radius: 50upx;
		margin-top: 5upx;
	}

	.bottom {
		width: 600upx;
		height: 400upx;
		padding: 25upx 30upx;
		margin: 30upx auto;
		background: #f9b95d;
		border-radius: 15upx;
	}

	.litter {
		width: 200upx;
		height: 50upx;
		float: right;
		text-align: right;
		font-size: 23upx;
		margin-top: 30upx;
		color: white;
	}
</style>
