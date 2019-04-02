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
									<view :data-product='product' class='grace-add-to-card' @tap='addtocard'>+</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<view class="grace-footer">
			<view style="width:60%;">
				<view @click="showShppingcard" class="icons iconfont icon-gouwuche">
					<text v-if="shoppingCart.length > 0" class="grace-badge grace-badge-red">{{shoppingCart.length}}</text>
				</view>
				<view class="icons iconfont icon-lianxikefu"></view>
				<view class="icons iconfont icon-jiahao"></view>
			</view>
			<view style="width:40%;">
				<button type="warn" @click="settleAccounts">立即结算</button>
			</view>
		</view>
		<popup-layer ref="popup" :direction="direction">
			<view v-if="shoppingCart.length === 0" style="text-align: center;color: grey;line-height: 80px;">购物车内空空如也(＞﹏＜)</view>
			<view v-else class="grace-form">
				<view style="padding: 0 8upx;">
					<view class="grace-items" v-for="(product,index) in shoppingCart" :key="index">
						<view class="iconss">
							<image :src="product.img" mode="widthFix" style="width: 50upx;height: 50upx;"></image>
						</view>
						<view class="grace-label">{{product.title}}</view>
						<graceNumberBox minNum="0" :value="product.count" :index="index" v-on:change="change"></graceNumberBox>
					</view>
				</view>
			</view>
		</popup-layer>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	import popupLayer from "../../../components/popup-layer.vue";
	import graceNumberBox from "../../../graceUI/components/graceNumberBox.vue";
	import graceSpeaker from "../../../graceUI/components/graceSpeaker.vue";
	var scrollTimer = null;
	var pageHeight = 100;
	export default {
		components: {
			graceNumberBox,
			popupLayer,
			graceSpeaker
		},
		data() {
			return {
				popmenuShowX: true,
				notices: [],
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
				shoppingCart: []
			}
		},
		computed: mapState(['user']),
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
					token: this.user.token,
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
				this.goodsCount++; //用于购物车小红点
				var product = e.currentTarget.dataset.product;
				//console.log(JSON.stringify(e));
				if (this.shoppingCart.find(function(x) {
						return x.id === product.id;
					}) != undefined) { //商品在shoppingCart购物车已存在
					uni.showToast({
						title: '购物车已存在此商品\n请点击左下角购物车查看',
						icon: "none"
					});
				} else {
					product.count = 1;
					this.shoppingCart.push(product);
				}
			},
			showmenuX: function() {
				this.popmenuShowX = !this.popmenuShowX;
			},
			showShppingcard: function() {
				this.$refs.popup.show();
			},
			change: function(data) { //改变购物车数量
				var index = data[1];
				var count = data[0];
				this.shoppingCart[index].count = count;
			},
			settleAccounts: function() {
				uni.navigateTo({
					url: './checkstand'
				});
				return;
				if (this.shoppingCart.length === 0) {
					this.$refs.popup.show();
				} else {
					uni.showLoading({
						title: '加载中'
					});
					console.log(JSON.stringify(this.shoppingCart));
					uni.request({
						url: this.GLOBAL.serverSrc + 'pay/alipay/create',
						method: 'POST',
						data: {
							user_id: this.user.id,
							shopping_cart: this.shoppingCart
						},
						success: res => {
							uni.hideLoading();
							if(res.data.status === 200){
								
							}else{
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							}
							console.log(JSON.stringify(res));
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

	.icons {
		float: left;
	}

	.iconss {
		width: 50upx;
		height: 50upx;
		line-height: 80upx;
		margin: 15upx 0 10upx 15upx;
	}

	.icons image {
		width: 50upx;
		height: 50upx;
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

	.grace-badge {
		margin: 0 0 100% -10upx;
		position: fixed;
	}
</style>
