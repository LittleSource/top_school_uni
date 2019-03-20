<template>
	<view class="grace-bg-white">
		<progress v-if="Loading" :percent="progress" color="#5FB878" stroke-width="4" />
		<view class="grace-items grace-noborder grace-padding input-textarea">
			<textarea style="width: 100%;" v-model="content" placeholder="这一刻的想法..." maxlength="200"></textarea>
		</view>
		<view class="grace-common-mt">
			<view class="grace-add-file">
				<view class="grace-add-btn" @tap="addImg" v-if="btnImg">
					<view>+</view>
					<view>添加照片</view>
				</view>
				<view class="garce-items" v-for="(item, index) in imgLists" :key="index">
					<image :src="item" mode="widthFix" :data-imgurl="item" @tap="showImgs"></image>
					<view class="grace-close" @tap="removeImg" :id="'grace-items-img-'+index"></view>
				</view>
			</view>
		</view>
		<view class="grace-padding has-bordert">
			<button :loading="Loading" type="default" class="ymkj-bg" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	var maxNum = 9,
		_self;
	export default {
		data() {
			return {
				content: '',
				imgLists: [],
				imgFiles: [],
				btnImg: true,
				Loading: false,
				progress:0//上传进度
			}
		},
		onLoad: function() {
			_self = this;
		},
		computed: mapState(['user']),
		methods: {
			addImg: function() {
				var num = maxNum - _self.imgLists.length;
				if (num < 1) {
					return false;
				}
				uni.chooseImage({
					count: num,
					sizeType: ['compressed'],
					success: function(res) {
						_self.imgFiles = _self.imgFiles.concat(res.tempFiles);
						_self.imgLists = _self.imgLists.concat(res.tempFilePaths);
						if (_self.imgLists.length >= maxNum) {
							_self.btnImg = false;
						}
					}
				});
			},
			removeImg: function(e) {
				var index = e.currentTarget.id.replace('grace-items-img-', '');
				_self.imgLists.splice(index, 1);
				_self.imgLists = _self.imgLists;
				if (_self.imgLists.length < maxNum) {
					_self.btnImg = true;
				}
			},
			showImgs: function(e) {
				var currentImg = e.currentTarget.dataset.imgurl;
				uni.previewImage({
					urls: this.imgLists,
					current: currentImg
				})
			},
			submit: function() {
				this.Loading = true;
				var i = 0;
				var _this = this;
				//更改imgFiles内的file对象的key为uri
				var filesArr = this.imgFiles.map(key => {
					return {
						name: 'file[' + (i++) + ']',
						uri: key.path
					}
				});
				const uploadTask = uni.uploadFile({
					url: _self.GLOBAL.serverSrc + 'confession/publish/upload',
					files: filesArr,
					formData: {
						'token': this.user.token,
						'phone': this.user.phone,
						'content': this.content
					},
					success: (uploadFileRes) => {
						var resObj = JSON.parse(uploadFileRes.data);
						if (resObj.status === 200) {
							uni.showToast({
								title: '发表成功！',
								icon: "none"
							});
							uni.switchTab({
								url: '../index'
							});
						} else {
							uni.showToast({
								title: resObj.msg,
								icon: "none"
							});
						}
					},
					fail: (e) => {
						_this.GLOBAL.requestFail(e);
					},
					complete: () => {
						_this.Loading = false;
					}
				});
				uploadTask.onProgressUpdate((res) => {
					_this.progress = res.progress;
				});
			}
		}
	}
</script>

<style scoped>
	.grace-bg-white {
		width: 750upx;
	}

	.input-textarea {
		margin: 5px auto;
		height: 68px;
		max-height: 100px;
		font-size: 16px;
	}

	.input-textarea textarea {
		width: 100%;
	}
</style>
