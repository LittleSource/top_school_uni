<template>
	<view>
		<view class="grace-center" style="font-size: 32upx;color: #2F2F2F;" v-if="schoolList.length === 0">当前学校:{{nowSchool.title}}</view>
		<view class="grace-list" v-if="schoolList.length > 0">
			<view class="items" v-for="(school,index) in schoolList" :key="index" @click="setSchool(schoolList[index])">
				<view class="title">{{school.title}}</view>
				<view class="arrow-right"></view>
			</view>
		</view>
		<simpleDialog ref="simpleDialog2" @confirmButton="confirmButton"></simpleDialog>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import simpleDialog from '../../components/dialog.vue';
	import QQMapWX from '../../common/qqmap-wx-jssdk.min.js';
	var qqmapsdk = new QQMapWX({
		key: "7YDBZ-4ATCD-5GM4Z-HCI5B-4ECM6-PPBXO"
	});
	export default {
		components: {
			simpleDialog
		},
		data() {
			return {
				parameter:{},
				schoolList: [],
				nowSchool: {}
			}
		},
		computed: mapState(['selectSchool']),
		onLoad(parameter) {
			this.parameter = parameter;
			this.nowSchool = this.selectSchool;
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
			...mapMutations(['checkSchool']),
			setSchool(school) {
				this.nowSchool = school;
				this.$refs.simpleDialog2.confirm({
					title: '提示',
					message: '确定切换到' + school.title + "吗？ 学校位置:" + school.addr
				});
				//静默上传到学校表
				uni.request({
					url: this.GLOBAL.serverSrc+'common/school/getSchool',
					method: 'POST',
					data: {
						'id':school.id,
						'title':school.title,
						'addr':school.addr
					}
				});
			},
			confirmButton() {
				this.checkSchool(this.nowSchool);
				if(this.parameter.market){
					uni.redirectTo({
						url: '../index/market/index'
					});
				}else if(this.parameter.index){
					uni.switchTab({
						url: '../index/index'
					});
				}else{
					uni.navigateBack();
				}
				
			}
		}
	}
</script>

<style>
</style>
