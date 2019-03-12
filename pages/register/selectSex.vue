<template>
	<view class="s-page-wrapper">
		<view class="s-page has-pd-20">
			<view class="has-mgt-35">
				<view class="is-size-25 has-title-color is-bold">
					你的性别是？
				</view>
				<view class="has-desc-color  has-mgt-5  is-bold">帮助我们为你量身推荐内容{{userName}}</view>
				<view class="is-block has-mgt-60 has-mgb-15">
					<view>
						<view class="is-block" @click="setSex(1)">
							<image src="../../static/register/n1.png" class="is-response" mode="widthFix"></image>
						</view>
					</view>
					<view class="has-mgt-10">
						<view class="is-block" @click="setSex(0)">
							<image src="../../static/register/n2.png" class="is-response" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-steps grace-center" style="margin: 30% 15% 0;width: 70%;">
			<view class="step current">
				<view class="step-circle">1</view>
				<view class="step-content">
					<view class="step-title">第一步</view>
				</view>
			</view>
			<view class="step">
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
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		computed: {
			...mapState(['userName'])
		},
		methods: {
			setSex(sex) {
				uni.navigateTo({
					url: './selectSchool?sex=' + sex
				});
			}
		}
	}
</script>

<style>

</style>
