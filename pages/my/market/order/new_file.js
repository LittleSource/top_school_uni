<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				marketId: 0,
				orderList: []
			}
		},
		computed: mapState(['user']),
		onLoad() {
			const market = uni.getStorageSync('market');
			if (market.isMarket) {
				this.marketId = market.marketId;
			}
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			uni.request({
				url: this.GLOBAL.serverSrc + 'market/management/order',
				method: 'POST',
				data: {
					phone: this.user.phone,
					token: this.user.token,
					market_id: this.marketId
				},
				success: res => {
					if (res.data.status === 200) {
						this.orderList = res.data.orderList;
						console.log(JSON.stringify(this.orderList));
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
		}
	}
</script>