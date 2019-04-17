<template>
	<view class="grace-padding bg-white">
		<view class="grace-form">
			<form @submit="formSubmit">
				<view class="grace-items">
					<view class="grace-label">姓名</view>
					<input type="text" class="input" name="name" v-model="addressInfo_.name"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">手机号</view>
					<input type="number" class="input" name="phone" v-model="addressInfo_.phone"></input>
				</view>
				<view class="grace-items" @click="cityPicker">
					<view class="grace-label">选择城市</view>
					<view style="line-height:80upx;">
						{{addressInfo_.city}}
						<text class="grace-iconfont icon-arrow-right"></text>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">详细地址</view>
					<input type="text" class="input" name="name" v-model="addressInfo_.address"></input>
				</view>
				<view style="padding:22upx 0;">
					<button :loading="btnLoading" formType="submit" type="warn" style="width:100%;background-color: #FC4243;">提交</button>
				</view>
			</form>
		</view>
		<mpvue-city-picker themeColor="#ff4243" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1"
		 @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../../threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../../threeComponents/mpvueCityPicker.vue';
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		data() {
			return {
				cityPickerValueDefault1: [1, 0, 3],//地区默认值
				addressInfo_:{},
				btnLoading:false
			}
		},
		computed: mapState(['user','addressInfo']),
		onLoad() {
			this.addressInfo_ = this.addressInfo;
			if(this.addressInfo_.city === null){
				this.addressInfo_.city = '请选择';
			}
		},
		methods: {
			...mapMutations(['changeAddressInfo']),
			cityPicker() {
				this.$refs.mpvueCityPicker1.show();
			},
			onConfirm(e) {
				this.addressInfo.city = e.label;
			},
			formSubmit(e) {
				if(!this.addressInfo_.name){
					uni.showToast({
						title: '姓名输入错误',
						icon: "none"
					});
				}else if(this.addressInfo_.phone.length !== 11){
					uni.showToast({
						title: '手机号输入错误',
						icon: "none"
					});
				}else if(this.addressInfo_.city === '请选择'){
					uni.showToast({
						title: '请选择城市',
						icon: "none"
					});
				}else if(!this.addressInfo_.address){
					uni.showToast({
						title: '请输入详细地址',
						icon: "none"
					});
				}else{
					this.addressInfo_.user_id = this.user.id;
					this.btnLoading = true;
					uni.request({
						url: this.GLOBAL.serverSrc + 'mine/address/update',
						method: 'POST',
						data: this.addressInfo_,
						success: res => {
							if(res.data.status === 200){
								uni.showToast({
									title: '操作成功',
								});
								this.changeAddressInfo(this.addressInfo_);
							}else{
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							}
						},
						fail: (e) => {
							this.GLOBAL.requesFail(e);
						},
						complete: () => {
							this.btnLoading = false;
						}
					});
				}
			}
		}
	}
</script>

<style>
	@page {
		background-color: #f6f6f6;
	}
</style>
