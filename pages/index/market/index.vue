<template>
	<view>
		<!-- grace filter start -->
		<view class="grace-filter" id="grace-filter-header">
			<view class="items" @tap='showOptions1'>{{orderList[orderIndex]}}<text class="grace-iconfont icon-arrow-down"></text></view>
			<view class="items" @tap='showOptions2'>{{cateList[cateIndex]}}<text class="grace-iconfont icon-arrow-down"></text></view>
			<view class="items " @tap='changePriceOrder'>
				销量
				<image style="margin-top: 13%;" src='../../../static/market/sort1.png' mode='widthFix' v-if="saleVolume == 1"></image>
				<image style="margin-top: 13%;" src='../../../static/market/sort2.png' mode='widthFix' v-if="saleVolume == 2"></image>
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
			<view class="grace-card-view" v-for="(market,index) in marketList" :key="index">
				<view class="body" @click="goMarket(market.market_id,market.notice,market.market_name)">
					<view class="img">
						<image :src="market.billboard" />
					</view>
					<view class="desc">
						<view class="title">
							{{market.market_name}}
							<text v-for="(item,index2) in 5" :key="index2" :class="market.star_level > index2 ?'grace-iconfont icon-shoucang' : 'grace-iconfont icon-star'"></text>
						</view>
						<view class="text">
						</view>
						<view class="text">{{market.status === 1?'正在营业':'商家休息中'}}</view>
						<view class="text">{{market.dorm_tower+market.dorm_num}}</view>
						<view class="text">{{market.market_school}}</view>
					</view>
				</view>
				<view class="footer">
					<view class="grace-iconfont icon-home" @click="goMarket(market.market_id)">进店</view>
					<view class="grace-iconfont icon-share">分享</view>
				</view>
			</view>
		</view>
		<graceLoading :loadingType="loading.type" :loadingText="loading.text" :show="loading.show"></graceLoading>
	</view>
</template>
<script>
	var _self;
	import graceLoading from "../../../graceUI/components/graceLoading.vue"
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			graceLoading
		},
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
				saleVolume: 1,
				marketList: [],
				filterHeight: '100%',
				loading: {
					show: true,
					nextPages: 2,
					totalPages: 2,
					type: 0,
					text: ['加载更多', 'loading ......', '已加载全部']
				}
			}
		},
		computed: mapState(['selectSchool']),
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
			this.getList();
		},
		onPullDownRefresh() {
			this.getList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//监听触底加载事件
		onReachBottom: function() {
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
				url: this.GLOBAL.serverSrc + 'market/index/findoftype',
				method: 'POST',
				data: {
					page: this.loading.nextPages,
					order: this.orderList[this.orderIndex],
					sale_volume: this.saleVolume,
					market_school: this.selectSchool.title,
					type: this.cateList[this.cateIndex]
				},
				success: res => {
					if (res.data.status === 200) {
						this.marketList = this.marketList.concat(res.data.marketList);
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
					this.loading.type = 0;
					this.loading.nextPages++;
				}
			});
		},
		methods: {
			changeSchool: function() {
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
				if (this.saleVolume == 1) {
					this.saleVolume = 2;
				} else {
					this.saleVolume = 1;
				}
				this.getList();
			},
			//条件更新后执行统一函数（如重新读取数据等）
			getList: function() {
				uni.request({
					url: this.GLOBAL.serverSrc + 'market/index/findoftype',
					method: 'POST',
					data: {
						page: 1,
						order: this.orderList[this.orderIndex],
						sale_volume: this.saleVolume,
						market_school: this.selectSchool.title,
						type: this.cateList[this.cateIndex]
					},
					success: res => {
						if (res.data.status === 200) {
							this.marketList = res.data.marketList;
							this.loading.totalPages = res.data.totalPages;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
						}
					},
					fail: (e) => {
						this.GLOBAL.requestFail(e);
					}
				});
			},
			goMarket: function(marketId,noticeArr,marketName) {
				var notices=[];
				for(var i=0;i<noticeArr.length;i++){//组装notices公告
					var obj={
						title:noticeArr[i]
					};
					notices.push(obj);
				}
				
				uni.navigateTo({
					url: './market?market_name='+marketName+'&market_id='+marketId+'&notices='+JSON.stringify(notices)
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
