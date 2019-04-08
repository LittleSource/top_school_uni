<template>
	<view class="bg-white" style="width: 100%;">
		<view class="grace-idcard-desc has-bordertb">
			自2019年起，为了让商家更好的取得用户信任，所有商家必须经过身份认证后才可以进行发布商品等操作，我们将在1个工资日内完成审核。
		</view>
		<view class="has-bordertb">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="icon-title text-green"></text>
					<text>姓名</text>
				</view>
			</view>
			<view class="cu-form-group">
				<input name="input" v-model="name" placeholder="输入您的姓名"></input>
			</view>
		</view>
		<view class="has-bordertb">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="icon-title text-green"></text>
					<text>身份证号</text>
				</view>
			</view>
			<view class="cu-form-group">
				<input name="input" v-model="idNum" placeholder="输入您的身份证"></input>
			</view>
		</view>
		<view class="has-bordertb">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="icon-title text-green"></text>
					<text>身份证照片(正面)</text>
				</view>
			</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg1">
					<view class="img">
						<image src="https://yuange666.oss-cn-beijing.aliyuncs.com/app/camera.png" mode="widthFix" />
					</view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="idCard1" @tap="previewImg1" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="has-bordertb">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="icon-title text-green"></text>
					<text>身份证照片(背面)</text>
				</view>
			</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg2">
					<view class="img">
						<image src="https://yuange666.oss-cn-beijing.aliyuncs.com/app/camera.png" mode="widthFix" />
					</view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="idCard2" @tap="previewImg2" mode="widthFix" />
				</view>
			</view>
		</view>
		<view class="has-bordertb">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="icon-title text-green"></text>
					<text>学生证(照片页)</text>
				</view>
			</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg3">
					<view class="img">
						<image src="https://yuange666.oss-cn-beijing.aliyuncs.com/app/camera.png" mode="widthFix" />
					</view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="idCard3" @tap="previewImg3" mode="widthFix" />
				</view>
			</view>
		</view>
		<view class="grace-form grace-padding">
			<button style="background-color: #fc4243;" type="primary" @tap="uploadCards">提 交</button>
		</view>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	var _self;
	var graceChecker = require("../../../graceUI/graceChecker.js");
	export default {
		data() {
			return {
				idCard1: 'https://yuange666.oss-cn-beijing.aliyuncs.com/app/idcard1.png',
				idCard2: 'https://yuange666.oss-cn-beijing.aliyuncs.com/app/idcard2.png',
				idCard3: 'https://yuange666.oss-cn-beijing.aliyuncs.com/app/schoolcard.png',
				name: '',
				idNum: ''
			};
		},
		computed: mapState(['user']),
		onLoad: function() {
			_self = this;
		},
		methods: {
			selectImg1: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title: "上传中"
						});
						uni.uploadFile({
							url: _self.GLOBAL.serverSrc + 'market/index/upload',
							filePath: res.tempFilePaths[0],
							name: 'card_front',
							success: function(uploadFileRes) {
								var resObj = JSON.parse(uploadFileRes.data);
								if (resObj.status === 200) {
									_self.idCard1 = resObj.imagePath;
								} else {
									uni.showToast({
										title: resObj.msg,
										icon: "none"
									});
								}
							},
							fail: function() {
								uni.showToast({
									title: '上传失败,请检查网络稍后重试！',
									icon: "none"
								});
							},
							complete: function() {
								uni.hideLoading();
							}
						});
					}
				});
			},
			selectImg2: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title: "上传中"
						});
						uni.uploadFile({
							url: _self.GLOBAL.serverSrc + 'market/index/upload',
							filePath: res.tempFilePaths[0],
							name: 'card_back',
							success: function(uploadFileRes) {
								var resObj = JSON.parse(uploadFileRes.data);
								if (resObj.status === 200) {
									_self.idCard2 = resObj.imagePath;
								} else {
									uni.showToast({
										title: resObj.msg,
										icon: "none"
									});
								}
							},
							fail: function() {
								uni.showToast({
									title: '上传失败,请检查网络稍后重试！',
									icon: "none"
								});
							},
							complete: () => {
								uni.hideLoading();
							}
						});
					}
				});
			},
			selectImg3: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.uploadFile({
							url: _self.GLOBAL.serverSrc + 'market/index/upload',
							filePath: res.tempFilePaths[0],
							name: 'student_card',
							success: function(uploadFileRes) {
								var resObj = JSON.parse(uploadFileRes.data);
								if (resObj.status === 200) {
									_self.idCard3 = resObj.imagePath;
								} else {
									uni.showToast({
										title: resObj.msg,
										icon: "none"
									});
								}
							},
							fail: function() {
								uni.showToast({
									title: '上传失败,请检查网络稍后重试！',
									icon: "none"
								});
							},
							complete: () => {
								uni.hideLoading();
							}
						});
					}
				});
			},
			previewImg1: function() {
				uni.previewImage({
					urls: [_self.idCard1]
				});
			},
			previewImg2: function() {
				uni.previewImage({
					urls: [_self.idCard2]
				});
			},
			previewImg3: function() {
				uni.previewImage({
					urls: [_self.idCard3]
				});
			},
			uploadCards: function() {
				if (this.idCard1 == 'https://yuange666.oss-cn-beijing.aliyuncs.com/app/idcard1.png' || this.idCard2 ==
					'https://yuange666.oss-cn-beijing.aliyuncs.com/app/idcard2.png') {
					uni.showToast({
						title: "请上传身份证照片",
						icon: "none"
					});
					return;
				} else if (this.idCard3 == 'https://yuange666.oss-cn-beijing.aliyuncs.com/app/schoolcard.png') {
					uni.showToast({
						title: "请上传学生证证照片",
						icon: "none"
					});
					return;
				} else {
					var rule = [{
							name: "name",
							checkType: "string",
							checkRule: "2,4",
							errorMsg: "请输入正确的姓名"
						},
						{
							name: "idNum",
							checkType: "notnull",
							checkRule: "18,18",
							errorMsg: "请输入正确的身份证号"
						}
					];
					//进行表单检查
					var formData = {
						name: this.name,
						idNum: this.idNum
					};
					var checkRes = graceChecker.check(formData, rule);
					if (checkRes) {
						uni.showLoading({
							title: "提交中..."
						});
						uni.request({
							url: this.GLOBAL.serverSrc + 'market/index/insertinfo',
							method: 'POST',
							data: {
								user_id:this.user.id,
								phone : this.user.phone,
								token:this.user.token,
								verify_name:this.name,
								id_number:this.idNum,
								card_front:this.idCard1,
								card_back:this.idCard2,
								student_card:this.idCard3
							},
							success: res => {
								if(res.data.status === 200){
									uni.redirectTo({
										url:'./index'
									});
								}else{
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									});
								}
								console.log(JSON.stringify(res));
							},
							fail: (e) => {
								this.GLOBAL.requestFail(e);
							},
							complete: () => {
								uni.hideLoading();
							}
						});
					} else {
						uni.showToast({
							title: graceChecker.error,
							icon: "none"
						});
					}
				}
			}
		},
	}
</script>
<style>
	@import "../../../static/css/colorui.css";
	@import "../../../static/css/icon.css";

	view {
		font-size: 28upx;
	}

	.grace-idcard-main {
		margin: 20upx 30upx;
	}

	.grace-idcard-desc {
		line-height: 2em;
		background: #FFFFFF;
		padding: 20upx;
		border-radius: 10upx;
	}

	.grace-idcard-text {
		line-height: 2em;
		margin-top: 30upx;
	}

	.grace-idcard-items {
		background: #FFFFFF;
		padding: 15upx 0;
		display: flex;
		margin: 15upx 0;
		border-radius: 10upx;
		align-items: flex-start;
	}

	.grace-idcard-uper-btn {
		width: 276upx;
		margin: 0 60upx;
		background: #F1F1F1;
		padding-bottom: 10upx;
		border-radius: 10upx;
		text-align: center;
	}

	.grace-idcard-uper-btn .img {
		width: 100upx;
		height: 100upx;
		margin: 0 auto;
		margin-top: 30upx;
	}

	.grace-idcard-uper-btn .img image {
		width: 100upx;
		height: 100upx;
	}

	.grace-idcard-uper-btn .text {
		width: 100%;
		margin-top: 10upx;
		text-align: center;
		line-height: 2em;
	}

	.grace-idcard-preview {
		width: 50%;
		margin: 0 30upx;
	}

	.grace-idcard-preview image {
		width: 100%;
	}
</style>
