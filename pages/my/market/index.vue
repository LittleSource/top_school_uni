<template>
	<view class="s-page-wrapper">
		<view class="s-page">
			<view class="is-100vh is-flex is-column is-justify-center is-align-center ">
				<image src="../../../static/error/noShop.png" style="width: 50%;margin-top: -110px" mode="widthFix"></image>
				<view class="has-title-color is-size-16 has-mgt-30">亲，您还没有开通店铺</view>
				<view class="has-desc-color is-size-14 has-mgt-10">如果您拥有超市可以点击下方按钮申请开通</view>
				<button @click="goRegMarketInfo()" type="primary" style='background:#fc6666; margin-top:30px; width: 90%;'>申请开通</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {

		},
		computed: mapState(['user']),
		onLoad: function() {
			uni.request({
				url: this.GLOBAL.serverSrc + 'market/index/getmerchant',
				method: 'GET',
				data: {
					user_id: this.user.id
				},
				success: res => {
					if (res.data.status === 200) {
						if (res.data.merchant === 1) {
							//已开通转发
						}else if(res.data.merchant === 2){
							//审核中
						}else{
							//未开通
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
				}
			});
		},
		methods: {
			goRegMarketInfo() {
				uni.navigateTo({
					url: './regMarketInfo'
				});
			}
		}
	}
</script>

<style>
</style>
