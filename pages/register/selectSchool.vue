<template>
	<view class="s-page-wrapper">
		<view class="s-page has-pd-20">
			<view class="has-mgt-35">
				<view class="is-size-25 has-title-color is-bold">
					设置您所在的学校
				</view>
				<view class="has-desc-color  has-mgt-5  is-bold">帮助我们为你量身推荐内容</view>
				<view class="is-block has-mgt-60 has-mgb-15">
					<view class="form">
						<label>输入学校名称搜索</label>
						<input class="input" type="text" focus @input="changeInput">
						<scroll-view scroll-y="true" style="height: 300px;">
							<view class="grace-list" v-if="schoolList.length > 0">
								<view class="items" v-for="(school,index) in schoolList" :key="index" @click="setSchool(schoolList[index])">
									<view class="title">{{school.title}}</view>
									<view class="arrow-right"></view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-steps grace-center" style="margin: 20% 15% 0;width: 70%;">
			<view class="step" @click="back">
				<view class="step-circle">1</view>
				<view class="step-content">
					<view class="step-title">第一步</view>
				</view>
			</view>
			<view class="step current">
				<view class="step-circle">2</view>
				<view class="step-content">
					<view class="step-title">第二步</view>
				</view>
			</view>
			<view class="step">
				<view class="step-circle">3</view>
				<view class="step-content">
					<view class="step-title">第三步</view>
				</view>
			</view>
		</view>
		<simpleDialog ref="simpleDialog2" @confirmButton="confirmButton"></simpleDialog>
	</view>
</template>

<script>
	import {
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
				schoolList: [],
				selectSchool: {},
				isThird: 0
			}
		},
		onLoad(parameter) {
			if (parseInt(parameter.is_third) === 1) {
				this.isThird = 1;
			}
		},
		methods: {
			...mapMutations(['regSetSchool']),
			changeInput(e) {
				if (e.detail.value === "") {
					this.schoolList = [];
					return;
				}
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
					}
				});
			},
			setSchool(school) {
				this.selectSchool = school;
				this.$refs.simpleDialog2.confirm({
					title: '提示',
					message: '确定设置' + school.title + "为您的学校吗？一经设置不可修改哦！学校位置:" + school.addr
				});
				//静默上传到学校表
				uni.request({
					url: this.GLOBAL.serverSrc + 'common/school/getSchool',
					method: 'POST',
					data: {
						'id': school.id,
						'title': school.title,
						'addr': school.addr
					}
				});
			},
			confirmButton() {
				this.regSetSchool(this.selectSchool);
				uni.navigateTo({
					url: './setAvatar?is_third=' + this.isThird
				});
			},
			back() {
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.form {
		width: 90%;
		margin: 0 auto;
	}

	.input {
		font-size: 25px;
		border-bottom: #a9a9a9 2px solid;
		border-left-width: 0px;
		border-right-width: 0px;
		border-top-width: 0px;
	}

	.grace-list .items .title {
		margin-left: 0;
	}
</style>
