<template>
	<view>
		<view class="grace-padding grace-rows" style="line-height: 1.5rem;">
			<view style="margin-right: 10px;">输入学校名称:</view>
			<input class="input" placeholder="上海交通大学" @input="inputChange" />
		</view>
		<view class="grace-list" v-for="(school,index) in schoolList" :key="index">
			<view class="items" style="line-height: 1.3rem;">
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
				schoolList:[]
			}
		},
		methods: {
			inputChange(e) {
				var _self = this;
				qqmapsdk.getSuggestion({
					//获取输入框值并设置keyword参数
					keyword: e.detail.value, //用户输入的关键词
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
					},
					complete: function(res) {
						console.log(res);
					}
				});
			}
		}
	}
</script>

<style>
</style>
