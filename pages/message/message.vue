<template>
	<view class="grace-scroll-do grace-bg-white">
		<scroll-view class="grace-scroll-x" scroll-x v-for="(item, index) in msgList" :scroll-left="scrollIndex == index ? 180 : 0"
		 @touchstart='touchStart' @touchend='touchEnd' :data-id="index" scroll-with-animation="true" :key="index">
			<view class="grace-items" @click="goChat(item.toId,index)">
				<image :src="item.avatar" mode="widthFix"></image>
				<view class="contents">
					<view class="grace-h5 grace-blod">{{item.name}}</view>
					<view class="grace-text-small">{{item.msg}}</view>
				</view>
				<text v-if="item.unread > 0" class="grace-badge grace-badge-red">{{item.unread}}</text>
			</view>
			<view class="grace-items btn btn-first" :data-id="index" @tap="changStatus" :style="{width : index == deleteIndex ? '0px' : btn1Width + 'px', background:item.status == '已读' ? '#CCCCCC' : '#5959D3', color:item.status == '已读' ? '#999' : '#FFF'}">{{item.status}}</view>
			<view class="grace-items btn" :data-id="index" @tap="removeMsg" :style="{width : index == deleteIndex ? deleteBtnWidth + 'px' : btn2Width+'px'}">删除</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex'
	var _self, x, y;
	export default {
		data() {
			return {
				//2个按钮的宽度
				btn1Width: 70,
				btn2Width: 70,
				//2个按钮的总宽 = btn1Width + btn23Width【uni-app 模板内不建议复杂运算请手动配置】
				deleteBtnWidth: 140,
				//正在滑动的索引
				scrollIndex: -1,
				//正在删除的索引
				deleteIndex: -1,
			}
		},
		computed: mapState(['msgList']),
		onLoad: function() {
			_self = this;
		},
		methods: {
			...mapMutations(['changeMsg','delMsg']),
			goChat: function(toId,index) {
				this.changeMsg(index);
				uni.navigateTo({
					url: './chat?toId=' + toId
				});
			},
			removeMsg: function(e) {
				var index = e.target.dataset.id;
				//删除确认
				if (this.deleteIndex != index) {
					this.deleteIndex = index;
					setTimeout(function() {
						_self.deleteIndex = -1;
					}, 2000);
					return false;
				}
				this.scrollIndex = -1;
				setTimeout(function() {
					_self.delMsg(index);
					_self.deleteIndex = -1;
				}, 500);
			},
			touchStart: function(e) {
				x = e.mp.changedTouches[0].clientX;
				y = e.mp.changedTouches[0].clientY;
			},
			touchEnd: function(e) {
				x = x - e.mp.changedTouches[0].clientX;
				y = y - e.mp.changedTouches[0].clientY;
				if (Math.abs(x) < 50) {
					return;
				}
				if (Math.abs(x) < Math.abs(y)) {
					return;
				}
				var index = e.currentTarget.dataset.id;
				if (index == this.scrollIndex) {
					return;
				}
				_self.scrollIndex = index;
			},
			changStatus: function(e) {
				var index = e.currentTarget.dataset.id;
				this.changeMsg(index);
			}
		}
	}
</script>

<style>
	.grace-badge{
		margin-right: 8px;
	}
</style>
