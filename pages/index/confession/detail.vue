<template>
	<view>
		<!-- 标题 -->
		<!-- <view :class="['grace-article-title', graceSkeleton == 'ing' ? 'grace-skeleton' : '']">{{article.title}}</view> -->
		<!-- 作者信息 -->
		<view class="grace-article-author-line" style="margin-top: 8px;">
			<view :class="['grace-article-author', graceSkeleton == 'ing' ? 'grace-skeleton' : '']">
				<image :src="article.authorFcae" mode="widthFix"></image>
				<view class="author-name">{{article.authorName}}</view>
			</view>
			<view class="btn" @click="guanzhu()"> +关注 </view>
		</view>
		<!-- 其他基本信息 -->
		<view :class="['grace-article-info-line', graceSkeleton == 'ing' ? 'grace-skeleton' : '']">
			<view>{{article.viewNumber}}</view>
			<view>{{article.date}}</view>
		</view>
		<!-- 文章内容 -->
		<view class="grace-article-contents">
			<block v-for="(item, index) in article.contents" :key="index">
				<view :class="['img-item', graceSkeleton == 'ing' ? 'grace-skeleton' : '']" v-if="item.type == 'img'">
					<image :src="item.content" mode="widthFix"></image>
				</view>
				<view :class="['text-item', graceSkeleton == 'ing' ? 'grace-skeleton' : '']" v-if="item.type == 'text'">{{item.content}}</view>
			</block>
		</view>
		<view class="grace-title" style="margin-top:60upx;">
            <view class="grace-h5 grace-blod">网友评论</view>
        </view>
        <!-- 评论区 start -->
        <view class="grace-comment">
            <view class="grace-comment-list">
                <view class="grace-comment-face"><image src="../../../static/school/tjdzxxjsxy.png" mode="widthFix"></image></view>
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
                <view class="grace-comment-face"><image src="../../../static/school/tjdzxxjsxy.png" mode="widthFix"></image></view>
                <view class="grace-comment-body">
                    <view class="grace-comment-top">
                        <text>马克一天</text>
                        <text class="grace-iconfont icon-zan grace-comment-zan"> 100</text>
                    </view>
                    <view class="grace-comment-content">除非巍巍群山消逝不见，除非滔滔江水干涸枯竭。除非凛凛寒冬雷声翻滚，除非炎炎酷暑白雪纷飞，除非天地相交聚合连接，直到这样的事情全都发生时，我才敢将对你的情意抛弃决绝！</view>
                </view>
            </view>
            <view class="grace-comment-list">
                <view class="grace-comment-face"><image src="../../../static/school/tjdzxxjsxy.png" mode="widthFix"></image></view>
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
                <view class="grace-comment-face"><image src="../../../static/school/tjdzxxjsxy.png" mode="widthFix"></image></view>
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
				graceSkeleton: 'ing',
				//文章对象格式
				//{
				//	title : "标题",
				//	authorFcae : "作者头像",
				//	authorName : "作者姓名",
				//	viewNumber : "浏览次数",
				//	date       : "日期",
				//	contents   : [
				//		{type : "text", content : "文本内容"},
				//		{type : "img", content : "图片路径"},
				//		//.....
				//	]
				//}
				article: {
					contents: []
				}
			}
		},
		onLoad() {
			_self = this;
			// 加载文章详情
			uni.showLoading({
				title: '正在加载...',
				mask: true
			});
			uni.request({
				url: 'https://www.easy-mock.com/mock/5bb833775df5622d84ac87ca/example/artinfo_skeleton',
				method: 'GET',
				data: {},
				success: res => {
					// 此处先规划骨架
					var art = {
						contents: []
					};
					for (var i = 0; i < res.data.contents.length; i++) {
						art.contents.push({
							'type': res.data.contents[i].type
						});
					}
					_self.article = art;
					// 骨架屏规划后延长 500 毫秒进行数据替换
					setTimeout(function() {
						_self.article = res.data;
						_self.graceSkeleton = 'end';
					}, 500);
				},
				fail: () => {},
				complete: () => {
					uni.hideLoading();
				}
			});
		},
		methods: {
			guanzhu() {
				
			}
		}
	}
</script>
<style>

</style>
