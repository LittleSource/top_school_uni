<template>
	<view class="s-page-wrapper">
		<view class="s-page has-pd-20">
			<view class="has-mgt-35">
				<view class="is-size-25 has-title-color is-bold">
					设置您的头像和昵称
				</view>
				<view class="has-desc-color  has-mgt-5  is-bold">提升同学对你的第一印像</view>
				<view class="is-block has-mgt-60 has-mgb-15">
					<view>
						<view class="grace-center avatar-box" @click="uploadAvater">
							<image class="avatar" src='../../static/logo.png'></image>
						</view>
						<view class="form">
							<input class="input" type="text" placeholder="设置昵称">
						</view>
					</view>
				</view>
				<view class="button-sp-area">
					<button type="primary">完成注册</button>
				</view>
			</view>
		</view>
		<view class="grace-steps grace-center" style="margin: 30% 15% 0;width: 70%;">
			<view class="step">
				<view class="step-circle">1</view>
				<view class="step-content">
					<view class="step-title">第一步</view>
				</view>
			</view>
			<view class="step" @click="back">
				<view class="step-circle">2</view>
				<view class="step-content">
					<view class="step-title">第二步</view>
				</view>
			</view>
			<view class="step current">
				<view class="step-circle">3</view>
				<view class="step-content">
					<view class="step-title">第三步</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			submit() {

			},
			uploadAvater() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(chooseImageRes) {
						console.log(JSON.stringify(chooseImageRes));
					}
				});
			},
			back(){
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.avatar-box {
		margin-top: 40px;
		margin-bottom: 10px;
	}

	.avatar {
		width: 68px;
		height: 68px;
		border-radius: 50%;
	}

	.form {
		width: 50%;
		margin: 0 auto;
	}

	.input {
		text-align: center;
		font-size: 15px;
		border-bottom: #a9a9a9 2px solid;
		border-left-width: 0px;
		border-right-width: 0px;
		border-top-width: 0px;
	}

	.button-sp-area {
		margin-top: 25%;
	}

	.button-sp-area button {
		width: auto;
		margin: 12upx;
		background: linear-gradient(to right, #fc4243, #fc6666);
	}
</style>
