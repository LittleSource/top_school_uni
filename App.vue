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
			this.GLOBAL.checkUpdater(plus.runtime.version, '../common/update')
			// #endif
		},
		onShow: function() {
			console.log('App Show')
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
