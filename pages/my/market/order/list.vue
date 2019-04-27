<template>
	<view>
		<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
			<view v-for="(cate, index) in categories" :key="index" :data-cateid="cate.cateid" :data-index="index" :class="[cateCurrentIndex == index ? 'grace-tab-current' : '']"
			 @tap="tabChange">{{cate.name}}</view>
		</scroll-view>
		<view v-if="orderList.length === 0" class="no-order">您暂无{{categories[cateCurrentIndex].name}}的订单哦</view>
		<view v-else style="margin-top: 50px;">
			<view class="order-card grace-rows has-borderb" v-for="(order,index) in orderList" :key="index">
				<view style="width: 80upx;">
					<image :src="order.first_img" mode="widthFix" style="width: 70upx;height: 70upx;"></image>
				</view>
				<view class="right" style="width: 660upx;">
					<view class="grace-rows grace-space-between">
						<view style="font-size: 35upx;">{{order.first_product}} &gt;</view>
					</view>
					<view class="time has-borderb"><text>{{order.create_time}}</text></view>
					<view class="rice grace-rows grace-space-between has-borderb">
						<view>订单号:{{order.out_trade_no}}</view>
						<text>&yen;{{order.real_price}}</text>
					</view>
					<view v-if="isUntreated" class="btn-area">
						<button class="mini-btn" type="primary" size="mini" plain="true">已处理</button>
					</view>
				</view>
			</view>
		</view>
		<graceLoading :loadingType="loading.type" :loadingText="loading.text" :show="loading.show"></graceLoading>
	</view>
</template>
<script>
	import graceLoading from "../../../../graceUI/components/graceLoading.vue"
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			graceLoading
		},
		data() {
			return {
				marketId: 0,
				isUntreated:true,
				//分类信息
				categories: [{
						cateid: 0,
						name: "待处理"
					},
					{
						cateid: 1,
						name: "待付款"
					},
					{
						cateid: 2,
						name: "已处理"
					},
					{
						cateid: 3,
						name: "已退款"
					}
				],
				// 当前选择的分类
				cateCurrentIndex: 0,
				// 内容实例，内容区域您根据项目情况设计即可，覆盖模式
				orderList: [],
				loading: {
					show: false,
					nextPages: 2,
					totalPages: 2,
					type: 0,
					text: ['加载更多', 'loading ......', '已加载全部']
				}
			};
		},
		computed: mapState(['user']),
		onLoad() {
			const market = uni.getStorageSync('market');
			if (market.isMarket) {
				this.marketId = market.marketId;
				uni.startPullDownRefresh();
			} else {
				uni.showToast({
					title: '系统错误',
					mask: false,
					duration: 1500
				});
				uni.navigateBack();
			}
		},
		onPullDownRefresh() {
			this.getList(1, this.categories[this.cateCurrentIndex].name)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//监听触底加载事件
		onReachBottom: function() {
			this.loading.show = true;
			//判断当前是否正在加载
			if (this.loading.type === 1) {
				return;
			}
			//判断是否是最后一页
			if (this.loading.nextPages > this.loading.totalPages) {
				this.loading.type = 2; //显示已加载全部
				return;
			}
			this.loading.type = 1; //显示加载中
			uni.request({
				url: this.GLOBAL.serverSrc + 'market/management/order',
				method: 'POST',
				data: {
					phone: this.user.phone,
					token: this.user.token,
					market_id: this.marketId,
					page: this.loading.nextPages,
					type: this.categories[this.cateCurrentIndex].name
				},
				success: res => {
					if (res.data.status === 200) {
						this.orderList = this.orderList.concat(res.data.orderList);
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
					}
				},
				fail: (e) => {
					this.GLOBAL.requestFail(e);
				},complete: () => {
					this.loading.type = 0;
					this.loading.nextPages++;
				}
			});
		},
		methods: {
			getList: function(page, type) {
				uni.showLoading({
					title:'加载中...'
				})
				uni.request({
					url: this.GLOBAL.serverSrc + 'market/management/order',
					method: 'POST',
					data: {
						phone: this.user.phone,
						token: this.user.token,
						market_id: this.marketId,
						page: page,
						type: type
					},
					success: res => {
						if(type=='待处理'){
							this.isUntreated = true;
						}else{
							this.isUntreated = false;
						}
						if (res.data.status === 200) {
							this.orderList = res.data.orderList;
							this.loading.totalPages = res.data.totalPages;
							if(this.loading.totalPages > 1 && this.orderList.length > 0){
								this.loading.show = true;
							}else{
								this.loading.show = false;
							}
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
			tabChange: function(e) {
				// 选中的索引
				var index = e.currentTarget.dataset.index;
				this.cateCurrentIndex = index;
				// 动态替换内容
				this.loading.nextPages = 2;
				this.getList(1, this.categories[index].name);
			}
		}
	}
</script>
<style>
	page {
		background-color: #F6F6F6;
	}

	.grace-tab-title {
		position: fixed;
		z-index: 999;
		top: 0;
	}

	.grace-tab-current {
		border-bottom: 4upx solid #ff4500 !important;
		color: #ff4500;
	}

	.no-order {
		margin-top: 53px;
		font-size: 30upx;
		text-align: center;
		color: grey;
	}

	.order-card {
		padding: 20upx 30upx;
		margin-bottom: 18px;
		width: 690upx;
		background-color: #FFFFFF;
	}

	.right {
		margin-left: 10upx;
	}

	.time {
		font-size: 25upx;
		color: gray;
		margin-top: 10upx;
	}

	.rice {
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
	}

	.btn-area {
		float: right;
		height: 80upx;
		line-height: 80upx;
	}

	.btn-area button {
		vertical-align: middle;
	}
</style>
