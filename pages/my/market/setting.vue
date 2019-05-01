<template>
	<view>
		<view class="grace-padding grace-bg-white">
			<view class="grace-form">
				<form @submit="formSubmit">
					<view class="grace-items">
						<view><text style="line-height: 170upx;">店铺招牌</text></view>
						<view class="photo">
							<image :src="billboard" mode="widthFix" @click="uploadBillboard" style="width: 170upx; height: 170upx;"></image>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">超市名称</view>
						<input type="text" class="input" v-model="marketName" placeholder="请输入超市名称" maxlength="8"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">正在营业</view>
						<view class="grace-form-r">
							<switch @change="switchChange" :checked="marketstatus==1 ? true:false"/>
						</view>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">公告</view>
						<view class="grace-form-r">
							<textarea auto-height v-model="notice" placeholder="多条以竖杠丨隔开" maxlength="254"></textarea>
						</view>
					</view>
					<view style="padding:22upx 0;">
						<button formType="submit" type="primary" style="width:100%;background-color: #ff4500;">提交</button>
					</view>
				</form>
			</view>
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
				marketId: 0,
				billboard: "../../../static/parttime/upload.jpg",
				marketName: '',
				notice: '',
				marketstatus:-1
			}
		},
		computed: mapState(['user']),
		onLoad() {
			const market = uni.getStorageSync('market');
			if (market.isMarket) {
				this.marketId = market.marketId;
				uni.showLoading({
					title: '加载中...',
					mask: false
				});
				uni.request({
					url: this.GLOBAL.serverSrc + 'market/management/marketinfo',
					method: 'POST',
					data: {
						phone: this.user.phone,
						token: this.user.token,
						market_id: this.marketId
					},
					success: res => {
						if (res.data.status == 200) {
							this.marketName = res.data.market_info.market_name;
							this.notice = res.data.market_info.notice;
							this.marketstatus = res.data.market_info.market_status;
							if (res.data.market_info.billboard != null) {
								this.billboard = res.data.market_info.billboard;
							}
						} else if (res.data.status == 410) {
							this.GLOBAL.tokenFail();
						} else {
							uni.showToast({
								title: '服务器出错啦，休息一下',
								icon: 'none'
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
			} else {
				this.GLOBAL.tokenFail();
			}
		},
		methods: {
			switchChange: function(e) {
				if(e.target.value){
					this.marketstatus = 1;
				}else{
					this.marketstatus = 0;
				}
			},
			uploadBillboard: function() {
				var _this = this;
				var src = this.GLOBAL.serverSrc; //得到服务器地址
				uni.chooseImage({
					count: 1,
					success: function(chooseImageRes) {
						const tempFilePath = chooseImageRes.tempFilePaths[0];
						//开始上传头像
						uni.showLoading({
							title: '上传中...'
						});
						uni.uploadFile({
							url: src + 'market/management/uploadBillboard', //接口地址
							filePath: tempFilePath,
							name: 'img',
							success: (uploadFileRes) => {
								var resObj = JSON.parse(uploadFileRes.data);
								if (resObj.status === 200) {
									_this.billboard = resObj.imagePath;
								} else {
									uni.showToast({
										title: resObj.msg,
										icon: "none"
									});
								}
							},
							fail: (e) => {
								_self.global_.requestFail(e);
							},
							complete: () => {
								uni.hideLoading();
							}
						});
					}
				});
			},
			formSubmit: function(e) {
				if (this.marketName.length == 0) {
					uni.showToast({
						title: "超市名称不能为空!",
						icon: "none"
					});
				} else if (this.img == '../../../static/parttime/upload.jpg') {
					uni.showToast({
						title: "请上传超市招牌!",
						icon: "none"
					});
				} else {
					uni.showLoading({
						title: '加载中...',
						mask: false
					});
					uni.request({
						url: this.GLOBAL.serverSrc + 'market/management/marketupdate',
						method: 'POST',
						data: {
							phone: this.user.phone,
							token: this.user.token,
							market_id: this.marketId,
							billboard: this.billboard,
							market_name: this.marketName,
							notice: this.notice,
							market_status:this.marketstatus
						},
						success: res => {
							uni.hideLoading();
							if (res.data.status == 200) {
								uni.showToast({
									title: "修改成功!",
									icon: "none"
								});
								setTimeout(function() {
									uni.navigateBack();
								}, 1000);
							} else {
								uni.showToast({
									title: '修改失败 ' + res.data.msg,
									icon: "none"
								});
							}
						},
						fail: (e) => {
							uni.hideLoading();
							this.GLOBAL.requestFail(e);
						}
					});
				}
			}
		}
	}
</script>
