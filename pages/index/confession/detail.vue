<template>
	<view>
		<view class="grace-article-author-line" style="margin-top: 8px;">
			<view class="grace-article-author">
				<image :src="article.avatar" mode="widthFix"></image>
				<view class="author-name">{{article.userName}}</view>
			</view>
			<view class="btn" @click="guanzhu()"> +关注 </view>
		</view>
		<!-- 文章内容 -->
		<view class="grace-article-contents">
			<block>
				<view class="text-item">{{article.content}}</view>
				<view class="grace-wrap grace-padding" @click="showImage()">
					<image v-for="(img, imgIndex) in article.imagesList" :key="imgIndex" :src="img" mode="widthFix" style="height: 100px;width: 48%;margin: 2px 1%;"></image>
				</view>
			</block>
		</view>
		<!-- 其他基本信息 -->
		<view class="grace-article-info-line" style="font-size: 50upx;">
			<view class="grace-iconfont icon-time">{{article.releaseTime}}</view>
			<view class="iconfont icon-fire">{{article.readingVolume}}</view>
			<view class="iconfont icon-heart2">{{article.thumbsUp}}</view>
		</view>
		<view class="grace-title grace-border" style="margin-top:60upx;">
			<view class="grace-h5 grace-blod">网友评论</view>
		</view>
		<!-- 评论区 start -->
		<view class="grace-padding">
			<view class="grace-comment-list">
				<view class="grace-comment-face">
					<image src="../../../static/school/tjdzxxjsxy.png" mode="widthFix"></image>
				</view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>刘美丽</text>
						<text class="grace-iconfont icon-zan"></text>
					</view>
					<view class="grace-comment-date">
						<text>08/10 08:12</text>
						<text>102</text>
					</view>
					<view class="grace-comment-content">上天呀！我渴望与你相知相惜，长存此心永不褪减。</view>
				</view>
			</view>
			<view class="grace-comment-list">
				<view class="grace-comment-face">
					<image src="../../../static/school/tjdzxxjsxy.png" mode="widthFix"></image>
				</view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>马克一天</text>
						<text class="grace-iconfont icon-zan grace-comment-zan"> 100</text>
					</view>
					<view class="grace-comment-content">除非巍巍群山消逝不见，除非滔滔江水干涸枯竭。除非凛凛寒冬雷声翻滚，除非炎炎酷暑白雪纷飞，除非天地相交聚合连接，直到这样的事情全都发生时，我才敢将对你的情意抛弃决绝！</view>
				</view>
			</view>
			<view class="grace-comment-list">
				<view class="grace-comment-face">
					<image src="../../../static/school/tjdzxxjsxy.png" mode="widthFix"></image>
				</view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>今生缘</text>
						<text class="grace-iconfont icon-zan"> 66</text>
					</view>
					<view class="grace-comment-content">人面不知何处去，桃花依旧笑春风。</view>
					<view class="grace-comment-date">
						<text>08/10 07:55</text>
					</view>
				</view>
			</view>
			<view class="grace-comment-list">
				<view class="grace-comment-face">
					<image src="../../../static/school/tjdzxxjsxy.png" mode="widthFix"></image>
				</view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>小猫咪</text>
						<text class="grace-iconfont icon-zan"> 120</text>
					</view>
					<view class="grace-comment-content">海上生明月，天涯共此时。。</view>
					<view class="grace-comment-date">
						<text>2天前</text>
						<text class="grace-comment-replay-btn">5回复</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论区 end -->
		<view class="grace-more-bottom">
			<navigator class="grace-border">查看全部评论 <text class="grace-iconfont icon-arrow-right"></text></navigator>
		</view>
		<view style="height:100upx;"></view>
		<!-- 评论输入框 -->
		<view class="grace-footer">
			<view class="grace-input">
				<view class="grace-input-icon grace-iconfont icon-write"></view>
				<input type="text" placeholder="写评论"></input>
			</view>
			<view class="grace-items" style="padding:0 20upx;">发布</view>
		</view>
	</view>
	</view>
</template>
<script>
	var _self;
	export default {
		data() {
			return {
				article: {}
			}
		},
		onLoad(parameter) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			uni.request({
				url: this.GLOBAL.serverSrc + 'confession/article/' + parameter.id,
				method: 'GET',
				success: res => {
					this.article = res.data;
				},
				fail: () => {
					
				},
				complete: () => {
					uni.hideLoading();
				}
			});
		},
		methods: {
			guanzhu() {},
			showImage(){
				uni.previewImage({
				    urls: this.article.imagesList
				});
			}
		}
	}
</script>
<style>

</style>
