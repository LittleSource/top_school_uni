<template>
	<view class="grace-padding bg-white">
		<view class="main-two">
			<view class="text">
				<text class="p1">上传营业执照扫描件 </text>
				<text class="p2">（请勿上传复印件）</text>
			</view>
			<view class="text-two">
				<view class="add">
					<image src="../../../static/parttime/upload.jpg" mode="widthFix" style="width: 170upx; height: 170upx;"></image>
				</view>
				<view class="photo">
					<image src="../../../static/parttime/licence.jpg" style="width: 210upx; height: 170upx;"></image>
				</view>
			</view>
		</view>
		<view class="grace-form">
			<view class="grace-items">
				<view class="grace-label">企业名称</view>
				<input type="text" class="input" name="company_name" placeholder="请输入企业全称"></input>
			</view>
			<view class="grace-items">
				<view class="grace-label">社会信用代码</view>
				<input type="text" class="input" name="society" placeholder="请输入社会信用代码"></input>
			</view>
		</view>
		<view class="next">
			<button type="warn" style="background-color: #FC4243;">下一步</button>
		</view>
	</view>
</template>
<script>

</script>
<style>
	.main-two {
		margin: 0 auto;
		clear: both;
		font-size: 35upx;
	}

	.p1 {
		color: black;
		float: left;
		font-size: 35upx;
	}

	.p2 {
		color: red;
		float: left;
		font-size: 35upx;
	}

	.text-two {
		float: left;
		margin: 20upx auto;
		height: 200upx;
	}

	.add {
		float: left;
		width: 170upx;
		height: 170upx;
	}

	.photo {
		float: left;
		margin-left: 50upx;
		width: 210upx;
		height: 170upx;
	}

	.next {
		margin: 0 auto;
		padding: 25upx 0;
		font-size: 38upx;
	}
</style>
