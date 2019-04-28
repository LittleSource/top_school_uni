let _app = {
	appUrl:'http://top.ym998.cn',//app下载地址
	goShare:function(title,summary,url,imageUrl){
		if(url === false){
			url = this.appUrl;
		}
		if(imageUrl === false){
			imageUrl = "https://icloud.9ykm.cn/app/logo1024.png";
		}
		uni.showActionSheet({
			itemList: ['微信', 'QQ'],
			success: function(res) {
				switch (res.tapIndex) {
					case 0:
						uni.showActionSheet({
							itemList: ['微信好友', '朋友圈', '微信收藏'],
							success: function(res) {
								var scene;
								switch (res.tapIndex) {
									case 0:
										scene = 'WXSceneSession';
										break;
									case 1:
										scene = 'WXSenceTimeline';
										break;
									case 2:
										scene = 'WXSceneFavorite';
										break;
								}
								uni.share({
									provider: "weixin",
									scene: scene,
									type: 0,
									title: title,
									summary: summary,
									href: url,
									imageUrl: imageUrl,
									success: function(res) {
										console.log("success:" + JSON.stringify(res));
									},
									fail: function(err) {
										console.log("fail:" + JSON.stringify(err));
									}
								});
							}
						});
						break;
					case 1:
						uni.share({
							provider: "qq",
							type: 2,
							title: title,
							summary: summary,
							href: url,
							imageUrl: imageUrl,
							success: function(res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail: function(err) {
								console.log("fail:" + JSON.stringify(err));
							}
						});
						break;
					case 2:
					//此处留出微博的分享  还未实现
						break;
				}
			},
			fail: function(res) {
				console.log(res.errMsg);
			}
		});
	}
}
export default _app;