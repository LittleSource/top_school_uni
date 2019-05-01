<template>
	<view>
		<!-- 标题 -->
		<view :class="['grace-article-title', graceSkeleton == 'ing' ? 'grace-skeleton' : '']">{{article.title}}</view>
		<!-- 文章内容 -->
		<view class="grace-article-contents">
			<block v-for="(item, index) in article.contents" :key="index">
				<view :class="['img-item', graceSkeleton == 'ing' ? 'grace-skeleton' : '']" v-if="item.type == 'img'">
					<image :src="item.content" mode="widthFix"></image>
				</view>
				<view :class="['text-item', graceSkeleton == 'ing' ? 'grace-skeleton' : '']" v-if="item.type == 'text'">{{item.content}}</view>
			</block>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		data() {
			return {
				graceSkeleton: 'ing',
				article: {
					contents: []
				}
			}
		},
		onLoad(parameter) {
			_self = this;
			// 加载文章详情
			var url = "http://api.dagoogle.cn/news/ndetail?aid=";
			uni.request({
				url: this.GLOBAL.serverSrc + 'common/news/index',
				method: 'POST',
				data: {
					url: url + parameter.aid
				},
				success: res => {
					if (res.data.status === 200) {
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
					} else {
						uni.showToast({
							title: '服务器异常,请稍后再试！',
							icon:"none"
						});
					}
				},
				fail: (e) => {
					this.GLOBAL.requestFail(e);
				}
			});
		},
		methods: {

		}
	}
</script>
<style>

</style>
