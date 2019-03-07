<template>
	<view>
		<view class="grace-center" style="font-size: 32upx;color: #2F2F2F;" v-if="schoolList.length === 0">当前学校:{{nowSchool.title}}</view>
		<view class="grace-list" v-if="schoolList.length > 0">
			<view class="items" v-for="(school,index) in schoolList" :key="index" @click="setSchool(schoolList[index])">
				<view class="title">{{school.title}}</view>
				<view class="arrow-right"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '../../common/qqmap-wx-jssdk.min.js';
	var qqmapsdk = new QQMapWX({
		key: "7YDBZ-4ATCD-5GM4Z-HCI5B-4ECM6-PPBXO"
	});
	export default {
		data() {
			return {
				schoolList: [],
				nowSchool: {}
			}
		},
		onLoad() {
			this.nowSchool = uni.getStorageSync('school');
		},
		onNavigationBarSearchInputChanged(e) {
			if (e.text === "") {
				this.schoolList = [];
				return;
			}
			var _self = this;
			qqmapsdk.getSuggestion({
				//获取输入框值并设置keyword参数
				keyword: e.text, //用户输入的关键词
				filter: 'category=大学,中学',
				success: function(res) { //搜索成功后的回调
					var sug = [];
					for (var i = 0; i < res.data.length; i++) {
						sug.push({ // 获取返回结果，放到sug数组中
							id: res.data[i].id,
							title: res.data[i].title,
							addr: res.data[i].address
						});
					}
					_self.schoolList = sug;
				},
				fail: function(error) {
					console.error(JSON.stringify(error));
				}
			});
		},
		methods: {
			setSchool(school) {
				uni.showModal({
					title: '提示',
					content: '确定切换到 ' + school.title + " 吗？\n学校位置:" + school.addr,
					success: function(res) {
						if (res.confirm) {
							uni.setStorage({
								key: 'school',
								data: school,
								fail: function() {
									uni.showModal({
										title: '提示',
										content: '学校切换失败！',
										showCancel: false
									});
								},
								complete: function() {
									uni.switchTab({
										url: '/pages/index/index'
									});
								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
</style>
