<template>
	<view>
		<header style="background-image: url('static/userbg.png');">
		</header>
		<view class="info">
			<img src="static/food1.png">
			<p class="info_name"><span>源哥设计</span> <i class="iconfont icon-nan"></i></p>
			<p class="info_text">小小帅哥一枚！</p>
			<view class="info_item">
				<p>16</p>
				<p>关注</p>
			</view>
			<view class="info_item">
				<p>32</p>
				<p>粉丝</p>
			</view>
			<view class="info_item">
				<p>3</p>
				<p>动态</p>
			</view>
		</view>
		<view class="iconCon">
			<view>
				<i class="iconfont icon-xiezuo icon_comment"></i>
				<p>文章</p>
			</view>
			<view>
				<i class="iconfont icon-tupian icon_comment"></i>
				<p>图片</p>
			</view>
			<view>
				<i class="iconfont icon-yinyue icon_comment"></i>
				<p>音乐</p>
			</view>
			<view>
				<i class="iconfont icon-shipin icon_comment"></i>
				<p>视频</p>
			</view>
		</view>
		<view class="grace-list grace-common-mt">
			<navigator class="items" v-for="(item, index) in lists" :key="index">
				<view class="icons">
					<image :src="staticUrl + item.img" mode="widthFix"></image>
				</view>
				<view class="title">{{item.title}}<text>{{item.desc}}</text></view>
				<view class="arrow-right"></view>
			</navigator>
			<navigator class="items" url="./setting/setting">
				<view class="icons">
					<image src="../../static/coloricon/shop.png" mode="widthFix"></image>
				</view>
				<view class="title">我的店铺</view>
				<view class="arrow-right"></view>
			</navigator>
			<navigator class="items" url="./setting/setting">
				<view class="icons">
					<image src="../../static/coloricon/setting.png" mode="widthFix"></image>
				</view>
				<view class="title">设置</view>
				<view class="arrow-right"></view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import graceHeader from "../../graceUI/components/graceHeader.vue";
	export default {
		data() {
			return {
				staticUrl : 'https://staticimgs.oss-cn-beijing.aliyuncs.com/',
				lists : [
						{ img: 'shange.png', title: '布局栅格', path: "rows", desc:"flex 基础布局"},
						{ img: 'scroll.png', title: '滚动区域', path: "scroll", desc: "" },
						{ img: 'moveview.png', title: '可移动区域', path: "moveview", desc: "" }
					]
				
			}
		},
		components: {
			graceHeader
		}
	}
</script>

<style>
	header {
		/* 头部包含背景图 */
		background-color: #fc4243;
		width: 100%;
		overflow: hidden;
		height: 150px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
	}

	.info {
		/* 存放个人信息的 */
		width: calc(100% - 32px);
		background-color: #FFFFFF;
		margin-left: 16px;
		margin-top: -48px;
		float: left;
		border-radius: 8px;
		box-shadow: 0 0 6px rgba(128, 128, 128, 0.6);
	}

	.info>img {
		width: 66px;
		height: 66px;
		border-radius: 66px;
		margin: 0 auto;
		display: block;
		margin-top: -33px;
		border: 1px solid #ffda19;
	}

	.info_name {
		text-align: center;
		font-size: 16px;
		color: #444444;
		height: 30px;
		line-height: 30px;
	}

	.info_text {
		text-align: center;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #6F6F6F;
	}

	.info_item {
		width: calc(100% / 3);
		float: left;
		text-align: center;
		padding: 4px 0;
	}

	.info_item>p:nth-of-type(1) {
		font-size: 12px;
	}

	.info_item>p:nth-of-type(2) {
		font-size: 14px;
		color: #6F6F6F;
	}

	.info_item:nth-of-type(1) {
		border-radius: 0 0 0 8px;
	}

	.info_item:nth-last-of-type(1) {
		border-radius: 0 0 8px 0;
	}

	.iconCon {
		/* 放功能的图标 */
		width: 100%;
		float: left;
		overflow: hidden;
		margin-top: 16px;
		padding: 32px 0;
	}

	.iconCon>view {
		float: left;
		width: calc(100% / 4);
		text-align: center;
	}
</style>
