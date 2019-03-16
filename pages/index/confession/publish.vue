<template>
	<view class="grace-bg-white">
		<view class="grace-items grace-noborder grace-padding input-textarea">
			<textarea style="width: 100%;" v-model="confessionPublish.content" placeholder="这一刻的想法..." maxlength="200"></textarea>
		</view>
		<view style="width:750px;" class="grace-common-mt">
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
			<button :loading="btnLoading" type="default" class="ymkj-bg" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	var maxNum = 9,_self;
	export default {
		data() {
			return {
				confessionPublish:{
					token:'',
					phone:'',
					content:''
				},
				imgLists: [],
				btnImg: true,
				btnLoading: false
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
			submit:function(){
				this.btnLoading = true;
				this.confessionPublish.token = this.user.token;
				this.confessionPublish.phone = this.user.phone;
				console.log('asdsad');
			}
		}
	}
</script>

<style scoped>
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
