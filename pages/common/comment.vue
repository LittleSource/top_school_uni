<template>
	<view>
		<view class="grace-comment grace-padding" style="margin-bottom: 90upx;">
			<view v-for="(comment , index) in commentList" :key="index">
				<view class="grace-comment-list">
					<view class="grace-comment-face">
						<image :src="comment.avatar" mode="widthFix"></image>
					</view>
					<view class="grace-comment-body">
						<view class="grace-comment-top">
							<text>{{comment.commentator_name}}</text>
							<text @click="thumbsUpComment(index)" v-if="comment.thumbs_up_status !== 1" class="grace-iconfont icon-zan"></text>
							<text @click="thumbsUpComment(index)" v-else class="iconfont icon-thumbs-up"></text>
						</view>
						<view class="grace-comment-date">
							<text>{{comment.comment_time}}</text>
							<text>{{comment.thumbs_up}}</text>
						</view>
						<view class="grace-comment-content" @click="replyOne(comment.commentator_name,comment.commentator_id,comment.comment_id)">{{comment.comment_content}}</view>
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
						<view class="grace-comment-content" @click="replyReply(reply.replier_name,reply.replier_id,comment.comment_id)">{{reply.reply_content}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-footer">
			<view class="grace-input">
				<view class="grace-input-icon grace-iconfont icon-write"></view>
				<input :focus="focus" type="text" :placeholder="textPlaceholder" v-model="content" @blur="blur"></input>
			</view>
			<view @click="replySubmit" class="grace-items" style="padding:0 20upx;">发布</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				articleId: 0, //当前文章id
				textPlaceholder: "写评论",
				commentList: [],
				focus: false,
				content: "",
				commentId: 0, //评论内容id
				commentatorId: 0, //评论者id
				commentId: 0, //评论id
				isreplyReply: false,
				replierId: 0 //回复者id
			}
		},
		computed: mapState(['user']),
		onLoad(parameter) {
			this.articleId = parameter.articleId;
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.getBody();
			uni.stopPullDownRefresh();
		},
		methods: {
			getBody(){
				uni.request({
					url: this.GLOBAL.serverSrc + '/confession/article/getComment',
					method: 'GET',
					data: {
						phone: this.user.phone,
						article_id: this.articleId
					},
					success: res => {
						this.commentList = [];
						this.commentList = res.data.commentAndReplyList;
					},
					fail: (e) => {
						this.GLOBAL.requestFail(e);
					}
				});
				this.content = '';
			},
			thumbsUpComment(index){
				if(this.commentList[index].thumbs_up_status !== 1){
					this.commentList[index].thumbs_up_status = 1;
					this.commentList[index].thumbs_up = this.commentList[index].thumbs_up + 1;
				}else{
					this.commentList[index].thumbs_up_status = 0;
					this.commentList[index].thumbs_up = this.commentList[index].thumbs_up - 1;
				}
				uni.request({
					url: this.GLOBAL.serverSrc + 'confession/article/addthumbsup',
					method: 'POST',
					data: {
						phone: this.user.phone,
						token: this.user.token,
						comment_id: this.commentList[index].comment_id
					},
					success: res => {
						//点赞只验证是否身份过期
						if (res.status === 410) {
							this.GLOBAL.tokenFail();
						}
					}
				});
			},
			blur() {
				this.focus = false;
			},
			replyOne(userName, commentatorId, commentId) {
				this.isreplyReply = false;
				this.commentatorId = commentatorId;
				this.commentId = commentId;
				this.textPlaceholder = "@回复 " + userName;
				this.focus = true;
			},
			replyReply(userName, replierId, commentId) {
				this.replierId = replierId;
				this.commentId = commentId;
				this.textPlaceholder = "@回复 " + userName;
				this.focus = true;
				this.isreplyReply = true;
			},
			replySubmit() {
				if(this.content.trim() === '')
					return;
				//说明此时评论的是文章
				if (this.textPlaceholder === "写评论") {
					uni.request({
						url: this.GLOBAL.serverSrc + '/confession/article/addcomment',
						method: 'POST',
						data: {
							token: this.user.token,
							phone: this.user.phone,
							comment_content: this.content,
							article_id: this.this.articleId
						},
						success: res => {
							if (res.data.status === 200) {
								this.getBody();
							} else if (res.data.status === 410) {
								this.GLOBAL.tokenFail();
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							}
						},
						fail: (e) => {
							this.GLOBAL.requestFail(e);
						},
						complete: () => {}
					});
				} else { //此时是回复
					if (this.isreplyReply) { //回复->回复
						uni.request({
							url: this.GLOBAL.serverSrc + '/confession/article/reply',
							method: 'POST',
							data: {
								token: this.user.token,
								phone: this.user.phone,
								reply_content: this.content,
								comment_id: this.commentId,
								toReplier_id: this.replierId
							},
							success: res => {
								if (res.data.status === 200) {
									this.getBody();
								} else if (res.data.status === 410) {
									this.GLOBAL.tokenFail();
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									});
								}
							},
							fail: (e) => {
								this.GLOBAL.requestFail(e);
							},
							complete: () => {}
						});
					} else { //回复评论
						uni.request({
							url: this.GLOBAL.serverSrc + '/confession/article/replyComment',
							method: 'POST',
							data: {
								token: this.user.token,
								phone: this.user.phone,
								reply_content: this.content,
								comment_id: this.commentId,
								commentator_id: this.commentatorId
							},
							success: res => {
								if (res.data.status === 200) {
									this.getBody();
								} else if (res.data.status === 410) {
									this.GLOBAL.tokenFail();
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									});
								}
							},
							fail: (e) => {
								this.GLOBAL.requestFail(e);
							},
							complete: () => {}
						});
					}
				}
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
