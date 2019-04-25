<template>
	<view>
		<view class="grace-article-author-line" style="margin-top: 8px;">
			<view class="grace-article-author">
				<image :src="article.avatar" mode="scaleToFill"></image>
				<view class="author-name">{{article.user_name}}</view>
			</view>
			<view class="btn" @click="guanzhu()"> +关注 </view>
		</view>
		<!-- 文章内容 -->
		<view class="grace-article-contents">
			<block>
				<view class="text-item" style="line-height: 20px;">{{article.content}}</view>
				<view v-if="article.images_list != null" class="grace-wrap grace-padding" @click="showImage()">
					<image v-for="(img, imgIndex) in article.images_list" :key="imgIndex" :src="img" mode="aspectFill" style="height: 300upx;width: 48%;margin: 2px 1%;"></image>
				</view>
			</block>
		</view>
		<!-- 其他基本信息 -->
		<view class="grace-article-info-line" style="font-size: 50upx;height: 60upx;">
			<view class="grace-iconfont icon-time">{{article.release_time}}</view>
			<view class="iconfont icon-fire">{{article.reading_volume}}</view>
			<view @click="thumbsUp" v-if="article.thumbs_up_status !== 1" class="iconfont icon-heart">{{article.thumbs_up}}</view>
			<view @click="thumbsUp" v-else class="iconfont icon-heart1">{{article.thumbs_up}}</view>
		</view>
		<view class="grace-title grace-border" style="margin-top:60upx;">
			<view class="grace-h5 grace-blod">网友评论</view>
		</view>
		<!-- 评论区 start -->
		<view class="grace-padding" v-if="commentAndReplyList.length > 0">
			<view class="grace-comment-list" v-for="(comment,index) in commentAndReplyList" :key="index">
				<view class="grace-comment-face" style="width: 30px;">
					<image :src="comment.avatar" style="height: 30px;"></image>
				</view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>{{comment.commentator_name}}</text>
						<text @click="thumbsUpComment(index)" v-if="comment.thumbs_up_status !== 1" class="grace-iconfont icon-zan"> {{comment.thumbs_up}}</text>
						<text @click="thumbsUpComment(index)" v-else class="iconfont icon-thumbs-up"></text>
					</view>
					<view class="grace-comment-content" @click="replyOne(comment.commentator_name,comment.commentator_id,comment.comment_id)">{{comment.comment_content}}</view>
					<view class="grace-comment-date">
						<text>{{comment.comment_time}}</text>
						<text class="grace-comment-replay-btn" v-if="comment.reply_list.length > 0" @click="goComment()">{{comment.reply_list.length}}回复</text>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-more-bottom">
			<navigator v-if="commentAndReplyList.length > 0" :url="'../../common/comment?type=confession&articleId='+article.article_id"
			 class="grace-border">{{other}}
				<text class="grace-iconfont icon-arrow-right"></text>
			</navigator>
			<view class="grace-border" v-else>{{other}}</view>
		</view>
		<!-- 评论区 end -->
		<view style="height:100upx;"></view>
		<!-- 评论输入框 -->
		<view class="grace-footer">
			<view class="grace-input">
				<view class="grace-input-icon grace-iconfont icon-write"></view>
				<input :focus="focus" type="text" style="padding:5 0upx;" :placeholder="textPlaceholder" @blur="blur" v-model="content"></input>
			</view>
			<view @click="submit" class="grace-items" style="padding:0 20upx;">发布</view>
		</view>
		<graceFullLoading :graceFullLoading="graceFullLoading" logoUrl="../../../static/index/love.png"></graceFullLoading>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	import graceFullLoading from "../../../graceUI/components/graceFullLoading.vue";
	export default {
		components: {
			graceFullLoading
		},
		data() {
			return {
				articleId: 0,
				graceFullLoading: false,
				article: {},
				commentAndReplyList: [],
				other: "",
				textPlaceholder: "写评论",
				focus: false,
				content: "",
				commentId: 0, //评论内容id
				commentatorId: 0, //评论者id
			}
		},
		computed: mapState(['user']),
		onLoad(parameter) {
			this.articleId = parameter.id;
			this.graceFullLoading = true;
			this.getDetail();
		},
		onPullDownRefresh() {
			this.getDetail();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2500);
		},
		methods: {
			getDetail() {
				uni.request({
					url: this.GLOBAL.serverSrc + 'confession/article/getContent',
					method: 'GET',
					data: {
						phone: this.user.phone,
						article_id: this.articleId
					},
					success: res => {
						this.article = res.data.ArticleContent;
						this.commentAndReplyList = res.data.comment_list;
						this.other = res.data.other;
					},
					fail: (e) => {
						this.GLOBAL.requestFail(e);
					},complete: () => {
						this.graceFullLoading = false;
					}
				});
				this.content = '';
			},
			guanzhu() {},
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
			thumbsUp() {
				console.log(this.article.thumbs_up_status);
				if (this.article.thumbs_up_status !== 1) {
					this.article.thumbs_up = this.article.thumbs_up + 1;
					this.article.thumbs_up_status = 1;
				} else {
					this.article.thumbs_up = this.article.thumbs_up - 1;
					this.article.thumbs_up_status = 0;
				}
				uni.request({
					url: this.GLOBAL.serverSrc + 'confession/article/addthumbsup',
					method: 'POST',
					data: {
						phone: this.user.phone,
						token: this.user.token,
						article_id: this.articleId
					},
					success: res => {
						//点赞只验证是否身份过期
						if (res.status === 410) {
							this.GLOBAL.tokenFail();
						}
					}
				});
			},
			showImage() {
				uni.previewImage({
					urls: this.article.images_list
				});
			},
			goComment() {
				uni.navigateTo({
					url: '../../common/comment?type=confession&articleId=' + this.article.article_id
				});
			},
			blur() {
				this.focus = false;
			},
			replyOne(userName, commentatorId, commentId) {
				this.commentatorId = commentatorId;
				this.commentId = commentId;
				this.textPlaceholder = "@回复 " + userName;
				this.focus = true;
			},
			submit() {
				if (this.content.trim() === '')
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
							article_id: this.articleId
						},
						success: res => {
							if (res.data.status === 200) {
								this.getDetail();
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
						}
					});
				} else { //此时是回复
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
								this.getDetail();
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
						}
					});
				}
			}
		}
	}
</script>
<style>

</style>
