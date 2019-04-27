<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['msgList']),
		methods: {
			...mapMutations(['appOnLunch', 'addMsg', 'onMessage'])
		},
		onLaunch: function() {
			var user = uni.getStorageSync('user');
			if (user.hasLogin === true) {
				this.appOnLunch(user);
				uni.connectSocket({
					url: this.GLOBAL.serverChat,
				});
				this.onMessage();
			}
			// #ifdef APP-PLUS
			const updated = uni.getStorageSync('updated') // 尝试读取storage
			if (updated.completed === true) { // 如果上次刚更新过
				// 删除安装包及安装记录
				uni.removeSavedFile({
					filePath: updated.packgePath,
					success: (res) => {
						uni.removeStorageSync('updated')
					}
				})
			}
			// 检查更新，参数：{ 当前版本号，跳转到更新页面的url }
			// uni.showModal({
			// 	title: '提示',
			// 	content: '此版本为源梦团队内部测试版本，未经允许禁止发布到互联网！www.ym998.cn',
			// 	showCancel: false
			// });
			// this.GLOBAL.checkUpdater(plus.runtime.version, '../common/update')
			// #endif
		},
		onShow: function() {
			
		},
		onHide: function() {
			uni.connectSocket({
				url: this.GLOBAL.serverChat,
			});
			this.onMessage();
			uni.request({
				url: this.GLOBAL.serverSrc + 'message/top_chat/recordlist',
				method: 'POST',
				data: {
					'msgList': this.msgList
				}
			});
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./static/css/simplepro.css";
	@import "./graceUI/graceUI.css";

	@font-face {
		font-family: "iconfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');
		/* iOS 4.1- */
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 36upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-heart:before {
		content: "\e64b";
	}

	.icon-fire:before {
		content: "\e729";
	}

	.icon-mima1:before {
		content: "\e63d";
	}

	.icon-bianji:before {
		content: "\e6cf";
	}

	.icon-qiehuanzuzhi:before {
		content: "\e60d";
	}

	.icon-scan:before {
		content: "\e614";
	}

	.icon-shouji:before {
		content: "\e613";
	}

	.icon-gouwuche:before {
		content: "\e617";
	}

	.icon-lianxikefu:before {
		content: "\e668";
	}

	.icon-star:before {
		content: "\e643";
	}

	.icon-heart1:before {
		content: "\e6b3";
	}

	.icon-yanzhengma:before {
		content: "\e61b";
	}

	.icon-shezhi:before {
		content: "\e61c";
	}

	.icon-jiahao1:before {
		content: "\e616";
	}

	.icon-jiahao:before {
		content: "\e626";
	}

	.icon-info-circle:before {
		content: "\e77e";
	}

	.icon-tags:before {
		content: "\e7e5";
	}

	.icon-xingxing:before {
		content: "\e70b";
	}

	.icon-thumbs-up:before {
		content: "\e922";
	}



	.ymkj-gradient-bg {
		width: 100%;
		background-color: #f43f3b;
	}

	.grace-steps .current .step-circle {
		background: #f43f3b;
		color: #FFFFFF;
	}

	.grace-steps .current .step-title {
		color: #f43f3b;
	}

	.ymkj-reply-list {
		display: flex;
		flex-wrap: nowrap;
		padding: 10upx 0;
		margin: 5upx 0;
	}

	.ymkj-reply-top {
		display: flex;
		flex-wrap: nowrap;
		line-height: 1.5em;
	}

	.ymkj-reply-top text {
		color: #0A98D5;
		font-size: 24upx;
	}

	.ymkj-reply-top .grace-iconfont {
		color: gray;
		font-weight: bold;
	}

	.ymkj-reply-margin {
		margin-left: 15upx;
	}

	.ymkj-bg {
		background-color: #fc4243;
	}
</style>
