<template>
	<view>
		<view class="img" style="background-image: url('../../../static/parttime/hand.jpg'); opacity: 1;">
			<view class="img-first">
				<p>诚聘日结简单手机兼职App试玩员</p>
			</view>
			<view class="img-two">
				<p>10000.00元/天</p>
			</view>
			<view class="img-three">
				<p>北辰 | 其他</p>
			</view>
		</view>
		<view class="claim">
			<!--要求-->
			<p>招聘要求</p>
			<view class="day">日结</view>
			<view class="nine">招九百人</view>
			<view class="man">男女不限</view>
		</view>
		<view class="gray"></view>
		<view class="work">
			<view class="work-one">工作福利</view>
			<view class="eat1">·包吃</view>
			<view class="eat">·包住</view>
			<view class="eat">·交通补贴</view>
			<view class="eat">·有提成</view>
			<view class="eat">·免费培训</view>
		</view>
		<view class="gray"></view>
		<view class="details">
			<!--详情-->
			<view class="details-one">职位详情</view>
			<p>唯品会急招线上兼职，0成本在家可做！</p>
			<p>【报名流程】</p>
			<p>点击报名后请直接添加客服微信号，只有添加微信号才算报名成功，谢谢合作！(yxy88888888666)</p>
			<p>【报名方法】</p>
			<p>(点链接后是直接到企业QQ，点添加好友，然后按要求发消息给客服，安排兼职)</p>
			<p>薪资待遇：多劳多得，按照要求完成人物反馈给客服，每个任务1-30元的金额</p>
			<p>工作时间9：00-21：00基本上全天候，最后生命，绝不收费，不要受外面不健康兼职的影响</p>
			<p class="details-two">Tip:凡收取费用的或工作内容不符的兼职，请提高警惕并第一时间向我们举报</p>
		</view>
		<view class="gray"></view>
		<view class="worktime">
			<view class="worktime-one">工作时间</view>
			<view class="work-begin">开始时间：? 04月01日</view>
			<view class="work-end">结束时间：? 04月30日</view>
		</view>
		<view class="gray-one">——————宝贝我也是有底线的——————</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: ''
			}
		}
	}
</script>

<style>
	.img {
		/*第一排黑色大框架*/
		padding-top: 130upx;
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

	.gray-one {
		/*分界线*/
		width: 100%;
		height: 150upx;
		text-align: center;
		line-height: 150upx;
		background: #EDEDED;
		color: #ccc;
	}

	.work {
		width: 100%;
		background: white;
	}

	.work .work-one {
		margin-top: 40upx;
		width: 200upx;
		height: 40upx;
		margin-left: 34upx;
		font-size: 35upx;
	}

	.work .eat1 {
		margin-top: 10upx;
		padding: 5upx;
		margin-left: 34upx;
		border-radius: 8upx;
		color: black;
		font-size: 30upx;
	}

	.work .eat {
		padding: 5upx;
		margin-left: 34upx;
		border-radius: 8upx;
		color: black;
		font-size: 30upx;
	}

	.details {
		width: 100%;
		/* height: 1300upx; */
		background: white;
	}

	.details .details-one {
		width: 200upx;
		height: 100upx;
		margin-left: 40upx;
		margin-top: 40upx;
		font-size: 35upx;
	}

	.details p {
		margin-left: 40upx;
		margin-right: 40upx;
		line-height: 60upx;
		color: #555555;
		font-size: 30upx;
	}

	.details .details-two {
		margin: 70upx 20upx 20upx 40upx;
		color: #ff660d;
		font-size: 25upx;
	}

	.worktime {
		width: 100%;
		height: 250upx;
		background: white;
	}

	.worktime .worktime-one {
		width: 200upx;
		height: 100upx;
		margin-left: 40upx;
		margin-top: 40upx;
		font-size: 35upx;
	}

	.worktime .work-begin {
		margin-top: 8upx;
		margin-left: 34upx;
		color: #555555;
		font-size: 30upx;
	}

	.worktime .work-end {
		margin-top: 8upx;
		margin-left: 34upx;
		color: #555555;
		font-size: 30upx;
	}
</style>
