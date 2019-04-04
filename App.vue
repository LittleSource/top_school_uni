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

	.icon-qiehuanzuzhi:before {
		content: "\e60d";
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
