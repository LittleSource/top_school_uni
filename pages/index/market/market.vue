<template>
	<view style='height:100%;'>
		<graceSpeaker icon="../../../static/market/trumpet.png" :msgs="notices"></graceSpeaker>
		<view class="grace-cate" style='width:100%; height:calc(100% - 90px);'>
			<scroll-view scroll-y class="grace-cate-left" :scroll-into-view="leftTo">
				<view v-for="(item, index) in mainCate" :key="index" :class="['item', currentCateIndex == item.cateid ? 'current' : '']"
				 :data-cateid="item.cateid" @tap='changCate' :id="'cate'+item.cateid">{{item.title}}</view>
			</scroll-view>
			<scroll-view class="grace-cate-right" scroll-y :scroll-into-view="productListTo" @scroll="rscroll">
				<block v-for="(cate, index) in mainCate" :key="index">
					<view class="grace-title grace-nowrap grace-space-between" style="margin-top:15px;" :id="'productList'+cate.cateid">
						<view class="grace-h5 grace-blod">{{cate.title}}</view>
					</view>
					<view class="grace-news-list">
						<view class="grace-news-list-items" v-for="(product, productIndex) in allProducts['cateproducts'+cate.cateid]"
						 :key="productIndex">
							<image :src="product.img" class="grace-news-list-img grace-list-imgs-l" mode="widthFix"></image>
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{product.title}}</view>
								<view class="price">￥{{product.price}}</view>
								<view>
									<view :data-productid='product.id' class='grace-add-to-card' @tap='addtocard'>+</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<view class="grace-footer">
			<view style="width:60%;">
				<view class="icons grace-iconfont icon-shoppingcard"></view>
				<view class="icons grace-iconfont icon-shoucang"></view>
				<view class="icons iconfont icon-jiahao"></view>
			</view>
			<view style="width:40%;">
				<button type="warn">立即结算</button>
			</view>
		</view>
	</view>
</template>
<script>
	import graceSpeaker from "../../../graceUI/components/graceSpeaker.vue";
	var scrollTimer = null;
	var pageHeight = 100;
	var productsData = require('../../../data/products.js');
	export default {
		components: {
			graceSpeaker
		},
		data() {
			return {
				popmenuShowX: true,
				goodsCount: 0,
				notices: [],
				currentCateIndex: 1,
				// 左侧滚动定位
				leftTo: 'cate1',
				// 产品列表滚动定位
				productListTo: 'productList1',
				//分类
				mainCate: [],
				// 产品列表对应分类
				allProducts: productsData.allProducts,
				marketId: 0
			}
		},
		onLoad: function(parameter) {
			uni.getSystemInfo({
				success: function(res) {
					pageHeight = res.windowHeight;
				},
			});
			
			uni.setNavigationBarTitle({
				title: parameter.market_name
			});
			this.notices = JSON.parse(parameter.notices);
			this.marketId = parameter.market_id;
			uni.request({
				url: this.GLOBAL.serverSrc + 'market/product/select',
				method: 'GET',
				data: {
					market_id: this.marketId
				},
				success: res => {
					if (res.data.status === 200) {
						this.allProducts = res.data.allProduct;

						this.mainCate = res.data.mainCate;
					}
				},
				fail: (e) => {
					this.GLOBAL.requestFail(e);
				}
			});
		},
		methods: {
			// 分类切换
			changCate: function(e) {
				var cateid = e.currentTarget.dataset.cateid;
				this.currentCateIndex = cateid;
				this.leftTo = 'cate' + cateid;
				this.productListTo = 'productList' + cateid;
			},
			// 产品区域滚动
			rscroll: function(e) {
				var sctop = e.detail.scrollTop;
				if (scrollTimer != null) {
					clearTimeout(scrollTimer);
				}
				scrollTimer = setTimeout(function() {
					this.getIndex(0, sctop);
				}.bind(this), 80);
			},
			// 动态识别分类激活
			getIndex: function(i, sctop) {
				var _self = this;
				var query = wx.createSelectorQuery();
				query.select('#productList' + this.mainCate[i].cateid).boundingClientRect();
				query.selectViewport().scrollOffset();
				query.exec(function(res) {
					if (res[0].top + pageHeight / 2 > 0) {
						_self.currentCateIndex = _self.mainCate[i].cateid;
						_self.leftTo = 'cate' + _self.mainCate[i].cateid;
					} else {
						i++;
						if (i < _self.mainCate.length) {
							_self.getIndex(i, sctop);
						}
					}
				});
			},
			// 加入到购物车
			addtocard: function(e) {
				this.goodsCount++;
				var productid = e.currentTarget.dataset.productid;
				uni.showToast({
					title: '产品id : ' + productid + ', 请根据项目需求自行完善后续代码',
					icon: "none"
				})
			},
			// 搜索
			searchNow: function(e) {
				var k = e.detail.value;
				uni.showToast({
					title: '关键字 : ' + k + ', 请根据项目需求自行完善后续代码',
					icon: "none"
				});
			},
			showmenuX: function() {
				this.popmenuShowX = !this.popmenuShowX;
			}
		}
	}
</script>
<style>
	page {
		height: 100%;
	}

	.icons {
		float: left;
	}

	.grace-search-icon:before {
		color: #E2231A;
	}

	.grace-news-list-items>image {
		width: 80px;
		height: 80px;
	}

	.grace-news-list-title .price {
		line-height: 1.8em;
		color: #E2231A;
	}

	.grace-add-to-card {
		width: 26px;
		height: 26px;
		line-height: 22px;
		border: 1px solid #E2231A;
		font-size: 26px;
		color: #E2231A;
		float: right;
		text-align: center;
		border-radius: 26px;
	}
</style>
