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
			//this.GLOBAL.checkUpdater(plus.runtime.version, '../common/update')
			// #endif
		},
		onShow: function() {
			//uni.showModal({
			//	title: '提示',
			//	content: '此版本为源梦团队内部测试版本，未经允许禁止发布到互联网！www.ym998.cn',
			//	showCancel: false
			//});
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
		font-size: 26upx;
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
