<script>
	import graceVersion from 'graceUI/jsTools/version'
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
				this.appOnLunch(app);
			}
			// #ifdef APP-PLUS
			var serverUrl = "https://www.easy-mock.com/mock/5bb833775df5622d84ac87ca/example/version#!method=get";
			graceVersion.checkAndUpdate(serverUrl);
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
</style>
