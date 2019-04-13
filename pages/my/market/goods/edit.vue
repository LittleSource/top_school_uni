<template>
	<view>
		<view class="grace-padding grace-bg-white">
			<view class="grace-form">
				<form @submit="formSubmit">
					<view class="grace-items">
						<view class="grace-label">商品名</view>
						<input type="text" class="input" name="title" :value="title" placeholder="请输入商品名称"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">商品价格</view>
						<input type="number" class="input" name="price" :value="price" placeholder="请输入出售价格"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">关键字</view>
						<input type="text" class="input" name="keywords" :value="keywords" placeholder="多个关键字用英文逗号隔开"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">成本价格</view>
						<input type="number" class="input" name="cost" :value="cost" placeholder="请输入成本价格"></input>
					</view>
					<view class="grace-items" style="height: 190upx;">
						<view class="grace-label">商品图片</view>
						<view class="img">
							<image :src="imgurl" @click="uploadImg" style="width:210upx;height:180upx;line-height: 180upx;" />
							</image>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">商品分类</view>
						<view class="grace-form-r">
							<picker @change="bindPickerChange" :value="catesIndex" :range="cates" name="cate">
								<text>{{cates[catesIndex]}}</text>
							</picker>
						</view>
					</view>
					<view style="padding:22upx 0; border-bottom: 1px solid #EBEBEB; ">
						<button :loading="btnLoading" formType="submit" type="primary" style="width:100%; background: #fb6566;">确定{{btnText}}</button>
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
	var graceChecker = require("../../../../graceUI/graceChecker.js");
	export default {
		data() {
			return {
				isEdit: false,
				title: '',
				price: '',
				cost: '',
				keywords: '',
				cateid: 0,
				marketId: 0,
				productId: 0, //商品id 修改商品时才会有
				catesIndex: 0,
				cates: [],
				catesList: [],
				imgurl: 'https://yuange666.oss-cn-beijing.aliyuncs.com/app/camera.png',
				btnText: '添加',
				btnLoading: false
			}
		},
		computed: mapState(['user']),
		onLoad(parameter) {
			var _self = this;
			const market = uni.getStorageSync('market');
			if (market.isMarket) {
				this.marketId = market.marketId;
			}else{
				uni.showToast({
					title: '系统错误',
					icon: "none"
				});
				return;
			}
			uni.showLoading({
				title: '加载中...'
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
						if (this.catesList.length === 0) { //若该商家没有分类
							uni.showModal({
								title: '提示',
								content: '您还未添加商品分类,点击确定去添加商品分类',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										uni.navigateBack();
									}
								}
							});
						} else {
							for (var i = 0; i < this.catesList.length; i++) {
								this.cates.push(this.catesList[i].title);
							}
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
			if (parameter.type === 'edit') { //如果编辑商品
				uni.showLoading({
					title: '加载商品中...'
				});
				this.isEdit = true;
				this.btnText = '修改';
				this.productId = parameter.product_id; //拿到商品id
				uni.request({ //根据商品id获取商品信息
					url: _self.GLOBAL.serverSrc + 'market/management/product',
					method: 'GET',
					data: {
						product_id: this.productId
					},
					success: res => {
						if (res.data.status === 200) {
							var product = res.data.product;
							_self.title = product.title;
							_self.price = product.price;
							_self.cost = product.cost;
							_self.keywords = product.keywords;
							_self.imgurl = product.img;
							_self.cateid = product.cateid;
							for (var i = 0; i < _self.catesList.length; i++) { //同步显示当前商品的分类
								if (_self.catesList[i].cateid == _self.cateid) {
									_self.catesIndex = i;
								}
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
						}
					},
					fail: (e) => {
						_self.GLOBAL.requestFail(e);
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			}
			uni.setNavigationBarTitle({
				title: '商品' + this.btnText
			});
		},
		methods: {
			bindPickerChange: function(e) {
				this.catesIndex = e.detail.value;
			},
			formSubmit: function(e) {
				if (this.imgurl === 'https://yuange666.oss-cn-beijing.aliyuncs.com/app/camera.png') {
					uni.showToast({
						title: '请上传商品图片',
						icon: "none"
					});
					return;
				}
				var rule = [{
						name: "title",
						checkType: "string",
						checkRule: "1,8",
						errorMsg: "商品名称应为1-8个字符"
					},
					{
						name: "price",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "商品价格不能为空"
					},
					{
						name: "keywords",
						checkType: "string",
						checkRule: "1,30",
						errorMsg: "关键字不能为空"
					},
					{
						name: "cost",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "成本价格不能为空"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var requrl = '';
					if (this.isEdit) {
						formData.product_id = this.productId;
						requrl = this.GLOBAL.serverSrc + '/market/management/productupdate';
					} else {
						requrl = this.GLOBAL.serverSrc + '/market/management/productadd';
					}
					this.btnLoading = true;
					formData.phone = this.user.phone;
					formData.token = this.user.token;
					formData.market_id = this.marketId;
					formData.img = this.imgurl;
					formData.cateid = this.catesList[this.catesIndex].cateid;
					uni.request({
						url: requrl,
						method: 'POST',
						data: formData,
						success: res => {
							if (res.data.status === 200) {
								uni.showToast({
									title: '商品' + this.btnText + '成功'
								});
								uni.redirectTo({
									url: './index?market_id=' + this.marketId
								});
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
							this.btnLoading = false;
						}
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			uploadImg: function() {
				var _self = this;
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						uni.showLoading({
							title: '上传中...'
						})
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: this.GLOBAL.serverSrc + 'market/product/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								var resObj = JSON.parse(uploadFileRes.data);
								if (resObj.status === 200) {
									_self.imgurl = resObj.imagePath;
								} else {
									uni.showToast({
										title: resObj.msg,
										icon: "none"
									});
								}
							},
							fail: (e) => {
								_self.GLOBAL.requestFail(e);
							},
							complete: () => {
								uni.hideLoading();
							}
						});
					}
				});
			}
		}
	}
</script>
<style>

</style>
