<template>
	<view>
		<view v-if="catesList.length == 0" class="margin-top text-center grey">暂无分类，请点击下面按钮添加</view>
		<view v-if="catesList.length > 0" class="cu-form-group" v-for="(cate,index) in catesList" :key="index">
			<input class='radius' placeholder="请输入分类名称" v-model="cate.title"></input>
			<button class='mini-btn bg-green shadow' @click="sortUp(index)"><text class="grace-iconfont icon-arrow-up"></text></button>
			<button class='mini-btn bg-green shadow' @click="sortDown(index)"><text class="grace-iconfont icon-arrow-down"></text></button>
			<button class='cu-btn bg-orange shadow' @click="deleteCate(index)">删除</button>
		</view>
		<view class="margin-top padding flex flex-direction">
			<button class='cu-btn lg bg-blue shadow' @click="addCate">添加分类</button>
			<button :loading="btnLoading" class='cu-btn lg shadow save' style="background-color: #FC4243;" @click="submit">完成编辑</button>
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
				catesList: [],
				btnLoading:false
			}
		},
		computed: mapState(['user']),
		onLoad(paremeter) {
			const market = uni.getStorageSync('market');
			if (market.isMarket) {
				this.marketId = market.marketId;
			} else {
				uni.showToast({
					title: "系统错误",
					icon: "none"
				});
				return;
			}
			uni.showLoading({
				title: "加载中..."
			});
			uni.request({ //获取商品分类
				url: this.GLOBAL.serverSrc + 'market/management/productcate',
				method: 'GET',
				data: {
					market_id: this.marketId
				},
				success: res => {
					if (res.data.status === 200) {
						this.catesList = res.data.catesList;
					} else {
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
		},
		methods: {
			addCate() {
				if (this.catesList.length >= 10) {
					uni.showToast({
						title: '分类最大上限10个',
						icon: 'none'
					});
					return;
				}
				var ord = 1;
				if (this.catesList.length > 0) {
					ord = this.catesList[this.catesList.length - 1].ord + 1
				}
				var cate = {
					cateid:null,
					ord: ord,
					title: '',
					count:0,
					market_id: this.marketId
				};
				this.catesList.push(cate);
			},
			deleteCate(index) {
				if(this.catesList[index].count > 0){
					uni.showToast({
						title: '该分类下存在商品，无法删除',
						icon: 'none'
					});
					return;
				}else if(this.catesList[index].title === ''){
					this.catesList.splice(index, 1);
				}else{
					var _self = this;
					uni.showModal({
						title: '提示',
						content: '确定删除 ' + this.catesList[index].title + ' 分类吗？',
						success: function(res) {
							if (res.confirm) {
								_self.catesList.splice(index, 1);
							}
						}
					});
				}
			},
			sortUp(index) {
				if (index !== 0) {
					var ord = this.catesList[index].ord;
					this.catesList[index].ord = this.catesList[index - 1].ord;
					this.catesList[index - 1].ord = ord;
					this.catesList = this.swapArray(this.catesList, index, index - 1);
				} else {
					return;
				}
			},
			sortDown(index) {
				if (index + 1 !== this.catesList.length) {
					var ord = this.catesList[index].ord;
					this.catesList[index].ord = this.catesList[index + 1].ord;
					this.catesList[index + 1].ord = ord;
					this.catesList = this.swapArray(this.catesList, index, index + 1);
				} else {
					return;
				}
			},
			submit() {
				for (var i = 0; i < this.catesList.length; i++) {
					if(this.catesList[i].title === ''){
						uni.showToast({
							title: '第'+(i+1)+'个分类名称不能为空',
							icon: 'none'
						});
						return;
					}
				}
				this.btnLoading = true;
				uni.request({
					url: this.GLOBAL.serverSrc + 'market/category/update',
					method: 'POST',
					data: {
						market_id:this.marketId,
						phone:this.user.phone,
						token:this.user.token,
						cateList:this.catesList
					},
					success: res => {
						console.log(JSON.stringify(res));
						if (res.data.status === 200) {
							uni.showToast({
								title: '操作成功',
								mask: false,
								duration: 1500
							});
							setTimeout(function(){
								uni.navigateBack();
							},1000);
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
						this.btnLoading = false;
					}
				});
			},
			swapArray(arr, index1, index2) {
				arr[index1] = arr.splice(index2, 1, arr[index1])[0];
				return arr;
			}
		},
	}
</script>

<style>
	@import '../../../static/css/colorui.css';

	.cu-btn {
		margin: 2px;
	}

	.mini-btn {
		margin: 2px;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		font-size: 20upx;
		height: 50upx;
		width: 50upx;
		border-radius: 1000upx;
		line-height: 1;
		text-align: center;
		text-decoration: none;
		overflow: hidden;
		transform: translate(0upx, 0upx);
	}

	.mini-btn.button-hover {
		transform: translate(1upx, 1upx);
	}

	.save {
		color: #fff;
		margin-top: 15px;
	}
</style>
