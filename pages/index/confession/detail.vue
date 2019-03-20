<template>
	<view>
		<view class="grace-article-author-line" style="margin-top: 8px;">
			<view class="grace-article-author">
				<image :src="article.avatar" mode="widthFix"></image>
				<view class="author-name">{{article.user_name}}</view>
			</view>
			<view class="btn" @click="guanzhu()"> +关注 </view>
		</view>
		<!-- 文章内容 -->
		<view class="grace-article-contents">
			<block>
				<view class="text-item">{{article.content}}</view>
				<view class="grace-wrap grace-padding" @click="showImage()">
					<image v-for="(img, imgIndex) in article.images_list" :key="imgIndex" :src="img" mode="widthFix" style="height: 100px;width: 48%;margin: 2px 1%;"></image>
				</view>
			</block>
		</view>
		<!-- 其他基本信息 -->
		<view class="grace-article-info-line" style="font-size: 50upx;">
			<view class="grace-iconfont icon-time">{{article.release_time}}</view>
			<view class="iconfont icon-fire">{{article.reading_volume}}</view>
			<view class="iconfont icon-heart2">{{article.thumbs_up}}</view>
		</view>
		<view class="grace-title grace-border" style="margin-top:60upx;">
			<view class="grace-h5 grace-blod">网友评论</view>
		</view>
		<!-- 评论区 start -->
		<view class="grace-padding" v-if="commentAndReplyList.length > 0">
			<view class="grace-comment-list" v-for="(comment,index) in commentAndReplyList" :key="index">
				<view class="grace-comment-face" style="width: 30px;">
					<image :src="comment.avatar" mode="widthFix"></image>
				</view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>{{comment.commentator_name}}</text>
						<text class="grace-iconfont icon-zan"> {{comment.thumbs_up}}</text>
					</view>
					<view class="grace-comment-content" @click="goComment()">{{comment.comment_content}}</view>
					<view class="grace-comment-date">
						<text>{{comment.comment_time}}</text>
						<text class="grace-comment-replay-btn" v-if="comment.reply_list.length > 0" @click="goComment()">{{comment.reply_list.length}}回复</text>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-more-bottom">
			<navigator v-if="commentAndReplyList.length > 0" :url="'../../common/comment?type=confession&articleId='+article.article_id" class="grace-border">{{other}}
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
				<input type="text" style="padding:5 0upx;" placeholder="我要评论"></input>
			</view>
			<view class="grace-items" style="padding:0 20upx;">发布</view>
		</view>
		<graceFullLoading :graceFullLoading="graceFullLoading" logoUrl="../../../static/index/love.png"></graceFullLoading>
	</view>
</template>
<script>
	import graceFullLoading from "../../../graceUI/components/graceFullLoading.vue";
	export default {
		components: {
			graceFullLoading
		},
		data() {
			return {
				graceFullLoading: false,
				article: {},
				commentAndReplyList:[],
				other:""
			}
		},
		onLoad(parameter) {
			this.graceFullLoading = true;
			uni.request({
				url: this.GLOBAL.serverSrc + 'confession/article/getContent',
				method: 'GET',
				data:{
					article_id:parameter.id
				},
				success: res => {
					this.article = res.data.ArticleContent.article;
					this.commentAndReplyList = res.data.comment_list;
					this.other = res.data.other;
				},
				fail: (e) => {
					this.GLOBAL.requestFail(e);
				},
				complete: () => {
					this.graceFullLoading = false;
				}
			});
		},
		methods: {
			guanzhu() {},
			showImage() {
				uni.previewImage({
					urls: this.article.images_list
				});
			},
			goComment(){
				uni.navigateTo({
					url: '../../common/comment?type=confession&articleId=' + this.article.articleId
				});
			}
		}
	}
</script>
<style>

</style>
