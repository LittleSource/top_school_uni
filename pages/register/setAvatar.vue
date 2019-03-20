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
							<image v-if="avatarPath.length === 0" class="avatar" src="../../static/register/chooseAvater.png"></image>
							<image v-else class="avatar" :src="avatarPath"></image>
						</view>
						<view class="form">
							<input class="input" type="text" v-model="userName" placeholder="设置昵称" maxlength="8">
						</view>
					</view>
				</view>
				<view class="button-sp-area">
					<button type="primary" @click="submit">完成注册</button>
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
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				userName: '',
				avatarPath: '',
				hasAvatar: false
			};
		},
		computed: mapState(['user','school']), // 拿到vuex的register对象
		methods: {
			//映射vuex的regSetNickName方法
			...mapMutations(['regSetUserName', 'regAfterLogin','regSetAvatar']),
			//点击提交按钮
			submit() {
				if (this.userName.length <= 0 || this.userName.length > 8) { //验证昵称
					uni.showToast({
						title: "请输入正确的昵称",
						icon: "none"
					});
					return;
				} else if (this.avatarPath.length === 0) { //验证头像是否上传
					uni.showToast({
						title: "您还未上传头像",
						icon: "none"
					});
					return;
				} else {
					this.regSetUserName(this.userName);
					uni.request({
						url: this.GLOBAL.serverSrc + '/common/register/register',
						method: 'POST',
						data: {
							'phone':this.user.phone,
							'password':this.user.password,
							'user_name':this.user.userName,
							'avatar':this.user.avatar,
							'sex':this.user.sex,
							'id':this.school.id
						},
						success: res => {
							if (res.data.status === 200) { //注册成功
								this.regAfterLogin(res.data);
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
 								uni.switchTab({
 									url: '../index/index'
 								});
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							}
						},
						fail: (e) => {
							if(e.statusCode === 0){
								uni.showToast({
									title: '未知的网络错误, 请确保设备处在联网状态',
									icon: "none"
								});
							}else{
								uni.showToast({
									title: '发生网络错误，错误码为：' + e.statusCode,
									icon: "none"
								});
							}
						}
					});
				}
			},
			//上传头像
			uploadAvater() {
				var _this = this;
				var src = this.GLOBAL.serverSrc; //得到服务器地址
				uni.chooseImage({
					count: 1,
					success: function(chooseImageRes) {
						const tempFilePath = chooseImageRes.tempFilePaths[0];
						//开始上传头像
						uni.uploadFile({
							url: src + '/common/register/uploadAvatar', //接口地址
							filePath: tempFilePath,
							name: 'avatar',
							success: (uploadFileRes) => {
								var resObj = JSON.parse(uploadFileRes.data);
								if(resObj.status === 200){
									_this.avatarPath = src + resObj.url;
									_this.regSetAvatar(_this.avatarPath);
									_this.hasAvatar = true;
								}else{
									uni.showToast({
										title: resObj.msg,
										icon: "none"
									});
								}
							},
							fail: (e) => {
								_self.global_.requestFail(e);
							}
						});
					}
				});
			},
			back() {
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
