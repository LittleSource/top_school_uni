<template>
	<view>
		<view class="header">
			<view class="status-bar"></view><!-- 状态栏占位 -->
		</view>
		<view class="content">
			<view class="search-box">
				<view class="input-box">
					<view class="grace-iconfont icon-arrow-left" @click="back()"></view>
					<input focus type="text" :placeholder="hotKeywordList[0]" @input="inputChange" v-model="keyword" @confirm="inputChange()"
					 placeholder-class="placeholder-class" confirm-type="search">
				</view>
				<view class="search-btn" @tap="inputChange()">搜索</view>
			</view>
			<view class="search-keyword" @touchstart="blur">
				<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
					<view v-if="user.length > 0">
						<view class="grace-title grace-nowrap">
							<view class="grace-h5 grace-blod">校友</view>
						</view>
						<view class="keyword-entry" hover-class="keyword-entry-tap" v-for="(row,userIndex) in user" :key="userIndex">
							<view class="keyword-text" @click="goUser(row.user_id)">
								<rich-text :nodes="row.user_name"></rich-text>
							</view>
							<view class="keyword-img">
								<image src="../../static/search/back.png"></image>
							</view>
						</view>
					</view>
					<view v-if="confession.length > 0">
						<view class="grace-title grace-nowrap">
							<view class="grace-h5 grace-blod">表白墙</view>
						</view>
						<view class="keyword-entry" hover-class="keyword-entry-tap" v-for="(row,conIndex) in confession" :key="conIndex">
							<view class="keyword-text" @click="goConfession(row.article_id)">
								<rich-text :nodes="row.content"></rich-text>
							</view>
							<view class="keyword-img">
								<image src="../../static/search/back.png"></image>
							</view>
						</view>
					</view>
					<view v-if="market.length > 0">
						<view class="grace-title grace-nowrap">
							<view class="grace-h5 grace-blod">超市</view>
						</view>
						<view class="keyword-entry" hover-class="keyword-entry-tap" v-for="(row,marketIndex) in market" :key="marketIndex">
							<view class="keyword-text" @click="goMarket(row.market_id,row.market_name)">
								<rich-text :nodes="row.market_name"></rich-text>
							</view>
							<view class="keyword-img">
								<image src="../../static/search/back.png"></image>
							</view>
						</view>
					</view>
					<view v-if="job.length > 0">
						<view class="grace-title grace-nowrap">
							<view class="grace-h5 grace-blod">兼职</view>
						</view>
						<view class="keyword-entry" hover-class="keyword-entry-tap" v-for="(row,jobIndex) in job" :key="jobIndex">
							<view class="keyword-text" @click="goJob(row.id)">
								<rich-text :nodes="row.jobtitle"></rich-text>
							</view>
							<view class="keyword-img">
								<image src="../../static/search/back.png"></image>
							</view>
						</view>
					</view>
				</scroll-view>
				<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
					<view class="keyword-block" v-if="oldKeywordList.length>0">
						<view class="keyword-list-header">
							<view>历史搜索</view>
							<view>
								<image @tap="oldDelete" src="../../static/search/delete.png"></image>
							</view>
						</view>
						<view class="keyword">
							<view v-for="key in oldKeywordList" @tap="doSearch(key)" :key="key">{{key}}</view>
						</view>
					</view>
					<view class="keyword-block">
						<view class="keyword-list-header">
							<view>热门搜索</view>
							<view>
								<image @tap="hotToggle" :src="'../../static/search/attention'+forbid+'.png'"></image>
							</view>
						</view>
						<view class="keyword" v-if="forbid==''">
							<view v-for="key in hotKeywordList" @tap="doSearch(key)" :key="key">{{key}}</view>
						</view>
						<view class="hide-hot-tis" v-else>
							<view>当前搜热门搜索已隐藏</view>
						</view>
					</view>
				</scroll-view>
			</view>
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
				confession: [],
				market: [],
				job: [],
				user: [],
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false
			}
		},
		computed: mapState(['selectSchool']),
		onLoad() {
			this.loadOldKeyword();
			this.loadHotKeyword();
		},
		methods: {
			goConfession(id) {
				this.saveKeyword();
				uni.navigateTo({
					url: '/pages/index/confession/detail?id=' + id
				});
			},
			goJob(id) {
				this.saveKeyword();
				uni.navigateTo({
					url: '/pages/index/parttime/details?id=' + id
				});
			},
			goMarket(id,name) {
				this.saveKeyword();
				uni.navigateTo({
					url: '/pages/index/market/market?market_id=' + id+'&market_name='+ name
				});
			},
			doSearch(key){
				this.keyword = key;
				this.inputChange();
			},
			back() {
				uni.navigateBack();
			},
			blur() {
				uni.hideKeyboard()
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				this.hotKeywordList = ['电子', '天津', '手机'];
			},
			//监听输入
			inputChange() {
				//兼容引入组件时传入参数情况
				var keyword = this.keyword;
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
				uni.request({
					url: this.GLOBAL.serverSrc + 'common/seek/searchMess',
					method: 'GET',
					data: {
						title: keyword,
						id: this.selectSchool.id
					},
					success: res => {
						this.confession = res.data.confession;
						this.job = res.data.job;
						this.market = res.data.market;
						this.user = res.data.user;
					},
					fail: (e) => {
						this.GLOBAL.requestFail(e);
					}
				});
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//保存关键字到历史记录
			saveKeyword() {
				var keyword = this.keyword;
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			}
		}
	}
</script>
<style>
	.header {
		background: #fc4243;
		width: 100%;
		position: fixed;
		top: 0;
		z-index: -1;
	}

	.header>.status-bar {
		height: var(--status-bar-height);
	}

	.content {
		margin-top: var(--status-bar-height);
	}

	.grace-iconfont {
		font-size: 28px;
		color: #FFFFFF;
	}

	.grace-title {
		margin-left: 3%;
	}

	.search-box {
		width: 95%;
		background-color: #fc4243;
		padding: 7.5px 2.5%;
		display: flex;
		justify-content: space-between;
	}

	.search-box .input-box {
		width: 85%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-box .search-btn {
		width: 15%;
		margin: 0 0 0 2%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		font-size: 14px;
		color: #fff;
		background: linear-gradient(to right, #ff9801, #ff570a);
		border-radius: 30px;
	}

	.search-box .input-box>input {
		width: 100%;
		height: 30px;
		font-size: 16px;
		border: 0;
		border-radius: 30px;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		padding: 0 3%;
		margin: 0;
		background-color: #ffffff;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		width: 100%;
		background-color: rgb(242, 242, 242);
	}

	.keyword-list-box {
		height: calc(100vh - 55px);
		padding-top: 5px;
		border-radius: 10px 10px 0 0;
		background-color: #fff;
	}

	.keyword-entry-tap {
		background-color: #eee;
	}

	.keyword-entry {
		width: 94%;
		height: 40px;
		margin: 0 3%;
		font-size: 15px;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1px #e7e7e7;
	}

	.keyword-entry image {
		width: 30px;
		height: 30px;
	}

	.keyword-entry .keyword-text,
	.keyword-entry .keyword-img {
		height: 40px;
		display: flex;
		align-items: center;
	}

	.keyword-entry .keyword-text {
		width: 90%;
	}

	.keyword-entry .keyword-img {
		width: 10%;
		justify-content: center;
	}

	.keyword-box {
		height: calc(100vh - 55px);
		border-radius: 10px 10px 0 0;
		background-color: #fff;
	}

	.keyword-box .keyword-block {
		padding: 5px 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 5px 3%;
		font-size: 13.5px;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 20px;
		height: 20px;
	}

	.keyword-box .keyword-block .keyword {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 14px;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30px;
		padding: 0 10px;
		margin: 5px 10px 5px 0;
		height: 30px;
		font-size: 14px;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
	}
</style>
