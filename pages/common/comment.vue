<template>
	<view>
		<view class="grace-comment grace-padding">
			<view v-for="(comment , index) in commentList" :key="index">
				<view class="grace-comment-list">
					<view class="grace-comment-face">
						<image :src="comment.avatar" mode="widthFix"></image>
					</view>
					<view class="grace-comment-body">
						<view class="grace-comment-top">
							<text>{{comment.commentator_name}}</text>
							<text class="grace-iconfont icon-zan"></text>
						</view>
						<view class="grace-comment-date">
							<text>{{comment.comment_time}}</text>
							<text>{{comment.thumbs_up}}</text>
						</view>
						<view class="grace-comment-content">{{comment.comment_content}}</view>
					</view>
				</view>
				<view class="ymkj-reply-list" v-for="(reply,index2) in comment.reply_list" :key="index2">
					<view class="grace-comment-body" style="margin-left: 90upx;">
						<view class="ymkj-reply-top grace-rows">
							<text>{{reply.replier_name}}</text>
							<text class="ymkj-reply-margin grace-iconfont icon-arrow-right"></text>
							<text class="ymkj-reply-margin">{{reply.toReplier_name}}</text>
							<text class="ymkj-reply-margin" style="color: gray;">{{reply.reply_time}}</text>
						</view>
						<view class="grace-comment-content">{{reply.reply_content}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-footer">
			<view class="grace-input">
				<view class="grace-input-icon grace-iconfont icon-write"></view>
				<input type="text" :placeholder="textPlaceholder"></input>
			</view>
			<view class="grace-items" style="padding:0 20upx;">发布</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textPlaceholder:"写评论",
				commentList: {}
			}
		},
		onLoad(parameter) {
			console.log(parameter.articleId);
			uni.request({
				url: this.GLOBAL.serverSrc + '/confession/article/getComment',
				method: 'GET',
				data:{
					article_id:parameter.articleId
				},
				success: res => {
					this.commentList = res.data.commentAndReplyList;
					console.log(JSON.stringify(res.data));
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			name() {

			}
		}
	}
</script>

<style>
	.grace-comment-face {
		margin-left: 5px;
		margin-right: 5px;
	}
</style>
