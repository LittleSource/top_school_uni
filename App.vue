<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		methods: {
			...mapMutations(['appOnLunch'])
		},
		onLaunch: function() {
			var app = new Object();
			app.user = uni.getStorageSync('user');
			if (app.user.hasLogin === true) {
				app.school = uni.getStorageSync('school');
				app.selectSchool = uni.getStorageSync('selectSchool');
				this.appOnLunch(app);
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
// 			uni.showModal({
// 				title: '提示',
// 				content: '此版本为源梦团队内部测试版本，未经允许禁止发布到互联网！www.ym998.cn',
// 				showCancel: false
// 			});
		},
		onHide: function() {
			console.log('App Hide')
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

	.icon-shouji:before {
		content: "\e613";
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

	.icon-thumbs-up:before {
		content: "\e922";
	}

	.ymkj-gradient-bg {
		width: 100%;
		background-color: #f43f3b;
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
