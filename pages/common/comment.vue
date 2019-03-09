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
							<text>{{comment.commentatorName}}</text>
							<text class="grace-iconfont icon-zan"></text>
						</view>
						<view class="grace-comment-date">
							<text>{{comment.commentTime}}</text>
							<text>{{comment.thumbsUp}}</text>
						</view>
						<view class="grace-comment-content">{{comment.commentContent}}</view>
					</view>
				</view>
				<view class="ymkj-reply-list" v-for="(reply,index2) in comment.replyList" :key="index2">
					<view class="grace-comment-body" style="margin-left: 90upx;">
						<view class="ymkj-reply-top grace-rows">
							<text>{{reply.replierName}}</text>
							<text class="ymkj-reply-margin grace-iconfont icon-arrow-right"></text>
							<text class="ymkj-reply-margin">{{reply.toReplierName}}</text>
							<text class="ymkj-reply-margin" style="color: gray;">{{reply.replyTime}}</text>
						</view>
						<view class="grace-comment-content">{{reply.replyContent}}</view>
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
			uni.request({
				url: this.GLOBAL.serverSrc + '/confession/comment/'+parameter.articleId,
				method: 'GET',
				success: res => {
					this.commentList = res.data.commentAndReplyList;
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
