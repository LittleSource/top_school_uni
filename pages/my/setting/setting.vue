<template>
	<view>
		<view class="grace-list grace-bg-white grace-common-mt">
			<view class='items'>
				<view class="title">认证<text>已认证</text></view>
				<view class="arrow-right"></view>
			</view>
			<view class='items'>
				<view class="title">
					通知
					<switch checked style='float:right'></switch>
				</view>
				<view class="arrow-right"></view>
			</view>
		</view>
		<view style="width:100%; margin-top:18px;">
			<button @click="logOut" style="width:100%; background:#FFFFFF; border:0;">退出登录</button>
		</view>
		<view style="width:100%; height:30px;"></view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default{
		data() {
			return {
			}
		},
		methods: {
			...mapMutations(['logOut'])
		},
	}
</script>

<style>
</style>
