<template>
	<view class="s-page-wrapper">
		<view class="s-page">
			<view class="is-100vh is-flex is-column is-justify-center is-align-center">
				<image :src="img" style="width: 50%;margin-top: -100px" mode="widthFix"></image>
				<view class="has-title-color is-size-16 has-mgt-30">{{text1}}</view>
				<view class="has-desc-color is-size-14 has-mgt-10">{{text2}}</view>
				<button v-if="merchant === 0" @click="goRegMarketInfo()" type="primary" style='background:#fc6666; margin-top:30px; width: 90%;'>申请开通</button>
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
			return{
				merchant:0,
				img:'https://yuange666.oss-cn-beijing.aliyuncs.com/app/pageinfo/noShop.png',
				text1:'亲，您还没有开通店铺',
				text2:'如果您拥有超市可以点击下方按钮申请开通'
			}
		},
		computed: mapState(['user']),
		onLoad: function() {
			uni.startPullDownRefresh();
		},
		onPullDownRefresh(){
			uni.request({
				url: this.GLOBAL.serverSrc + 'market/index/getmerchant',
				method: 'GET',
				data: {
					user_id: this.user.id
				},
				success: res => {
					if (res.data.status === 200) {
						this.merchant = res.data.merchant;
						if (this.merchant === 1) {
							uni.redirectTo({
								url: './manage'
							});
						}else if(this.merchant === 2){
							this.img = 'https://yuange666.oss-cn-beijing.aliyuncs.com/app/pageinfo/ok.png';
							this.text1 = '店铺信息审核中';
							this.text2 = '我们将会在1个工作日内完成审核';
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
					this.text1 = '网络错误,请检查网络';
					this.text2 = JSON.stringify(e);
				},
				complete: () => {
					uni.stopPullDownRefresh();
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
