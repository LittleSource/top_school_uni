<template>
	<view style='height:100%;'>
		<view class="grace-cate" style='width:100%; height:calc(100%);'>
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
									<view :data-product='product' class='grace-iconfont icon-remove' @tap='deleteGoods'></view>
									<view :data-product='product' class='grace-iconfont icon-write' style="color: #6F6F6F;" @tap='editGoods'></view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<simpleDialog ref="simpleDialog2" @confirmButton="confirmButton"></simpleDialog>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	import simpleDialog from '../../../../components/dialog.vue';
	var scrollTimer = null;
	var pageHeight = 100;
	export default {
		components: {
			simpleDialog
		},
		data() {
			return {
				popmenuShowX: true,
				currentCateIndex: 1,
				// 左侧滚动定位
				leftTo: 'cate1',
				// 产品列表滚动定位
				productListTo: 'productList1',
				//分类
				mainCate: [],
				// 产品列表对应分类
				allProducts: {},
				marketId: 0,
				goodsCount: 0,
				deleteGoodsId: 0
			}
		},
		computed: mapState(['user']),
		onLoad: function(parameter) {
			uni.getSystemInfo({
				success: function(res) {
					pageHeight = res.windowHeight;
				},
			});
			const market = uni.getStorageSync('market');
			if (market.isMarket) {
				this.marketId = market.marketId;
			}
			this.getAllProducts();
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url: './edit?type=add&market_id=' + this.marketId
			});
		},
		methods: {
			getAllProducts() {
				uni.request({
					url: this.GLOBAL.serverSrc + 'market/product/select',
					method: 'GET',
					data: {
						token: this.user.token,
						market_id: this.marketId
					},
					success: res => {
						if (res.data.status === 200) {
							this.allProducts = res.data.allProduct;
							this.mainCate = res.data.mainCate;
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
			editGoods:function(e){
				var product = e.currentTarget.dataset.product;
				uni.navigateTo({
					url: './edit?type=edit&product_id='+product.id
				});
			},
			deleteGoods: function(e) {
				this.goodsCount++;
				var product = e.currentTarget.dataset.product;
				this.deleteGoodsId = product.id; //拿到将要删除的商品id
				this.$refs.simpleDialog2.confirm({
					title: '提示',
					message: '确定删除' + product.title + '吗?'
				});
			},
			confirmButton: function() { //点击确定后与后端交互删除
				uni.request({
					url: this.GLOBAL.serverSrc + 'market/management/productdel',
					method: 'POST',
					data: {
						user_id: this.user.id,
						phone: this.user.phone,
						token: this.user.token,
						id: this.deleteGoodsId
					},
					success: res => {
						if (res.data.status === 200) {
							uni.showToast({
								title: '删除成功',
							});
							this.getAllProducts();//更新列表
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

	.grace-iconfont {
		float: right;
		width: 26px;
		height: 26px;
		color: #E2231A;
	}
</style>
