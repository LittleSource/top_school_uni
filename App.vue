<script>
	import graceVersion from 'graceUI/jsTools/version'
	import autoUpdater from 'graceUI/jsTools//autoUpdater.min.js'
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
			autoUpdater.init({
				packageUrl: 'https://qd.myapp.com/myapp/qqteam/Androidlite/qqlite_3.7.1.704_android_r110206_GuanWang_537057973_release_10000484.apk',
				content: '更新内容:\n.修复上传房源时图片重复错乱问题\n.修复启动app时启动图变形问题\n.优化部分性能问题\n.新增功能1.新增功能2.新增功能3.新增功能3.新增功能3.新增功能3.新增功能3.新增功能3.新增功能3',
				contentAlign: 'left',
				cancel: '取消',
				cancelColor: '#007fff'
			});
			//autoUpdater.show();
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

	.ymkj-gradient-bg {
		width: 100%;
		background: linear-gradient(45deg, #ccff33 0, #ffcc33 33%, #ff9933 66%, #fc4243 100%);
		background-size: 400%;
		background-position: 0 100%;
		animation: gradient 7.5s ease-in-out infinite;
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
	
	.ymkj-bg{
		background-color: #fc4243;
	}
</style>
