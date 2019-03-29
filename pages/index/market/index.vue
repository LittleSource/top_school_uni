<template>
	<view>
		<!-- grace filter start -->
		<view class="grace-filter" id="grace-filter-header">
			<view class="items" @tap='showOptions1'>{{orderList[orderIndex]}}<text class="grace-iconfont icon-arrow-down"></text></view>
			<view class="items" @tap='showOptions2'>{{cateList[cateIndex]}}<text class="grace-iconfont icon-arrow-down"></text></view>
			<view class="items " @tap='changePriceOrder'>
				销量
				<image style="margin-top: 13%;" src='../../../static/market/sort1.png' mode='widthFix' v-if="priceOrder == 1"></image>
				<image style="margin-top: 13%;" src='../../../static/market/sort2.png' mode='widthFix' v-if="priceOrder == 2"></image>
			</view>
			<view class="items" @tap='changeSchool'>切换<text class="grace-iconfont icon-shaixuan"></text></view>
			<!-- 第一个选项 -->
			<view class='grace-filter-options' v-if="showingIndex == 1">
				<view v-for="(item, index) in orderList" :key="index" :class="[index ==  orderIndex ? 'option current' : 'option']"
				 @tap='changeOrder' :data-itemid="index">
					{{item}}<text class="grace-iconfont icon-right" v-if="index ==  orderIndex"></text>
				</view>
			</view>
			<!-- 第二个选项 -->
			<view class='grace-filter-options' v-if="showingIndex == 2">
				<view :class="[index ==  cateIndex ? 'option current' : 'option']" v-for="(item, index) in cateList" :key="index"
				 @tap='changeCate' :data-itemid="index">
					{{item}}<text class="grace-iconfont icon-right" v-if="index ==  cateIndex"></text>
				</view>
			</view>
		</view>
		<!-- grace filter start -->
		<!-- 以下为演示内容 -->
		<view style='margin-top:50px;'>
			<view class="grace-card-view">
				<view class="body" @click="goMarket()">
					<view class="img">
						<image src="../../../static/logo.png" />
					</view>
					<view class="desc">
						<view class="title">521大商城<text v-for="(a,index) in [1,2,3,4,5]" :key="index" class="grace-iconfont icon-star"></text></view>
						<view class="text">正在营业</view>
						<view class="text">4号楼521</view>
						<view class="text">天津电子信息职业技术学院</view>
					</view>
				</view>
				<view class="footer">
					<view class="grace-iconfont icon-home">进店</view>
					<view class="grace-iconfont icon-share">分享</view>
				</view>
			</view>
			<view class="grace-card-view">
				<view class="body" @click="goMarket()">
					<view class="img">
						<image src="../../../static/logo.png" />
					</view>
					<view class="desc">
						<view class="title">521大商城<text v-for="(a,index) in [1,2,3,4,5]" :key="index" class="grace-iconfont icon-star"></text></view>
						<view class="text">正在营业</view>
						<view class="text">4号楼521</view>
						<view class="text">天津电子信息职业技术学院</view>
					</view>
				</view>
				<view class="footer">
					<view class="grace-iconfont icon-home">进店</view>
					<view class="grace-iconfont icon-share">分享</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		data() {
			return {
				//被展示的菜单
				showingIndex: 0,
				//第一个选项相关
				orderIndex: 0,
				orderList: ['综合', '星级', '人气'],
				//第二个选项相关
				cateIndex: 0,
				cateList: ['全部', '超市', '外卖', '水果', '其他'],
				//销量排序
				priceOrder: 1,
				filterHeight: '100%'
			}
		},
		onReady: function() {
			_self = this;
			uni.getSystemInfo({
				success: function(res) {
					var windowHeight = res.windowHeight;
					//获取头部标题高度
					uni.createSelectorQuery().select('#grace-filter-header').fields({
						size: true,
					}, function(res) {
						if (!res) {
							return;
						}
						var sHeight = (windowHeight - res.height);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			console.log(this.orderList[this.orderIndex]);
			console.log(this.cateList[this.cateIndex]);
			console.log(this.priceOrder);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			changeSchool:function(){
				uni.navigateTo({
					url: '../../common/checkSchool'
				});
			},
			changeOrder: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.orderIndex = tapIndex;
				this.showingIndex = 0;
				this.getList();
			},
			showOptions1: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 1;
			},
			showOptions2: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 2;
			},
			changeCate: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.cateIndex = tapIndex;
				this.showingIndex = 0;
				this.getList();
			},
			//价格排序
			changePriceOrder: function() {
				if (this.priceOrder == 1) {
					this.priceOrder = 2;
				} else {
					this.priceOrder = 1;
				}
				this.getList();
			},
			//条件更新后执行统一函数（如重新读取数据等）
			getList: function() {
				console.log('条件更新后执行统一函数（如重新读取数据等）');
			},
			goMarket: function() {
				uni.navigateTo({
					url: './market'
				});
			}
		}
	}
</script>
<style>
	@import "../../../graceUI/animate.css";
	page {
		background-color: #F5F5F5;
	}

	/* #ifdef  H5 */
	.grace-filter {
		top: 44px;
	}

	/* #endif */
</style>
