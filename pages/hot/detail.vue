<template>
	<view>
		<!-- 标题 -->
		<view :class="['grace-article-title', graceSkeleton == 'ing' ? 'grace-skeleton' : '']">{{article.title}}</view>
		<!-- 文章内容 -->
		<view style="width: 100%;" v-if="graceSkeleton == 'end'">
			<rich-text :nodes="article.content"></rich-text>
		</view>
		<block v-if="graceSkeleton == 'ing'" v-for="(item, index) in article.contents" :key="index">
			<view :class="['img-item', graceSkeleton == 'ing' ? 'grace-skeleton' : '']" v-if="item.type == 'img'">
				<image :src="item.content" mode="widthFix"></image>
			</view>
			<view class="grace-article-contents">
				<view :class="['text-item', graceSkeleton == 'ing' ? 'grace-skeleton' : '']"></view>
			</view>
		</block>
	</view>
</template>
<script>
	var _self;
	export default {
		data() {
			return {
				graceSkeleton: 'ing',
				article: {
					contents: [{
							type: "text",
							content: "文本内容"
						},
						{
							type: "img",
							content: "图片路径"
						},
						{
							type: "text",
							content: "文本内容"
						},
						{
							type: "img",
							content: "图片路径"
						},
						{
							type: "text",
							content: "文本内容"
						},
						{
							type: "img",
							content: "图片路径"
						},
						{
							type: "text",
							content: "文本内容"
						},
						{
							type: "img",
							content: "图片路径"
						},
					]
				}
			}
		},
		onLoad(palyload) {
			_self = this;
			// 加载文章详情
			uni.showLoading();
			uni.request({
				url: 'http://api.dagoogle.cn/news/ndetail',
				method: 'GET',
				data: {
					aid: palyload.aid
				},
				success: res => {
					// 骨架屏规划后延长 500 毫秒进行数据替换
					setTimeout(function() {
						_self.article = res.data.data;
						_self.graceSkeleton = 'end';
					}, 1000);
				},
				fail: () => {},
				complete: () => {
					uni.hideLoading();
				}
			});
		},
		methods: {

		}
	}
</script>
<style>

</style>
