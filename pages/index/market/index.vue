<template>
	<view>
		<!-- grace filter start -->
		<view class="grace-filter" id="grace-filter-header">
			<view class="items" @tap='showOptions1'>{{orderList[orderIndex]}}<text class="grace-iconfont icon-arrow-down"></text></view>
			<view class="items" @tap='showOptions2'>{{cateList[cateIndex]}}<text class="grace-iconfont icon-arrow-down"></text></view>
			<view class="items " @tap='changePriceOrder'>
				价格
				<image style="margin-top: 13%;" src='../../../static/market/sort1.png' mode='widthFix' v-if="priceOrder == 1"></image>
				<image style="margin-top: 13%;" src='../../../static/market/sort2.png' mode='widthFix' v-if="priceOrder == 2"></image>
			</view>
			<view class="items" @tap='showOptions99'>筛选<text class="grace-iconfont icon-shaixuan"></text></view>
			<!-- 第一个选项 -->
			<view class='grace-filter-options' v-if="showingIndex == 1">
				<view v-for="(item, index) in orderList" :key="index" :class="[index ==  orderIndex ? 'option current' : 'option']" @tap='changeOrder' :data-itemid="index">
					{{item}}<text class="grace-iconfont icon-right" v-if="index ==  orderIndex"></text>
				</view>
			</view>
			<!-- 第二个选项 -->
			<view class='grace-filter-options' v-if="showingIndex == 2">
				<view :class="[index ==  cateIndex ? 'option current' : 'option']" v-for="(item, index) in cateList" :key="index" @tap='changeCate' :data-itemid="index">
					{{item}}<text class="grace-iconfont icon-right" v-if="index ==  cateIndex"></text>
				</view>
			</view>
			<!-- 筛选 start -->
			<view class='grace-filter-options' :style="{'width':'90%', 'height' : filterHeight, 'padding':'0'}" v-if="showingIndex == 99">
				<form @submit='formsubmit' @reset='formReset'>
					<scroll-view scroll-y="true" :style="{'height':filterHeight}">
						<view style="width:96%; padding:15upx 2%;">
							<view class="grace-h5 grace-blod">条件1 - 多选示例</view>
							<view style='padding:20upx 0;' class="grace-select-tips">
								<checkbox-group name="where1" @change="changeFunc">
									<label v-for="(item, index) in where1Tips" :key="index" :class="[item.checked ? 'grace-checked' : '']">
										<checkbox :value="item.value + ''" :checked="item.checked"></checkbox> {{item.name}}
									</label>
								</checkbox-group>
							</view>
							<view class="grace-h5 grace-blod">条件2 - 单选示例</view>
							<view style='padding:20upx 0;' class="grace-select-tips">
								<radio-group name="where2" @change="changeFunc2">
									<label v-for="(item, index) in where2Tips" :key="index" :class="[item.checked ? 'grace-checked' : '']">
										<radio :value="item.value + ''" :checked="item.checked"></radio> {{item.name}}
									</label>
								</radio-group>
							</view>
							<!-- 占位视图组件 -->
							<view style="height:150upx;"></view>
						</view>
					</scroll-view>
					<!-- 按钮  -->
					<view class='grace-filter-buttons'>
						<view>
							重置
							<button form-type='reset'>重置</button>
						</view>
						<view>
							确定
							<button form-type='submit'>确定</button>
						</view>
					</view>
				</form>
			</view>
			<!-- 筛选 end -->
		</view>
		<!-- grace filter start -->
		<!-- 以下为演示内容 -->
		<view class="grace-padding" style='margin-top:30px;'>
			<view class="grace-news-list">
				<navigator class="has-borderb">
					<view class="grace-news-list-items">
						<image src="../../../static/logo.png" class="grace-news-list-img grace-list-imgs-l" mode="widthFix"></image>
						<view class="grace-news-list-title">
							<view class="grace-news-list-title-main grace-nowrap">521大商城</view>
							<text class="grace-news-list-title-desc grace-text-overflow">天津电子信息职业技术学院</text>
							<text class="grace-news-list-title-desc grace-text-overflow">
								<text v-for="(a,index) in [1,2,3,4,5]" :key="index" class="grace-iconfont icon-star"></text>
							</text>
							<text class="grace-news-list-title-desc grace-text-overflow">搞砸了就是有前途</text>
						</view>
					</view>
				</navigator>
				<navigator>
					<view class="grace-news-list-items">
						<image src="../../../static/logo.png" class="grace-news-list-img grace-list-imgs-l" mode="widthFix"></image>
						<view class="grace-news-list-title">
							<view class="grace-news-list-title-main grace-nowrap">一个项目经理不搞砸几个项目</view>
							<text class="grace-news-list-title-desc grace-text-overflow">搞砸了就是有前途</text>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>
<script>
var _self;
import graceStar from "../../../graceUI/components/graceStar.vue";
export default {
	components:{
        graceStar
    },
	data() {
		return {
			//for
			forData : [1,2,3,4,5,6,7,8,9,10],
			//被展示的菜单
			showingIndex : 0,
			//第一个选项相关
			orderIndex : 0,
			orderList : ['综合','星级','评价'],
			//第二个选项相关
			cateIndex: 0,
			cateList: ['全部','超市', '外卖', '水果', '其他'],
			//价格排序
			priceOrder : 1,
			//筛选条件
			where1Tips:[
				{ name : "条件 - 1" , value : 1 , checked:true},
				{ name : "条件 - 2" , value : 2 , checked: false},
				{ name : "条件 - 3" , value : 3 , checked: false},
				{ name : "条件 - 4" , value : 4 , checked: false},
				{ name : "条件 - 5" , value : 5 , checked: false}
			],
			where2Tips: [
				{ name: "条件 - 1", value: 1 , checked: false },
				{ name: "条件 - 2", value: 2 , checked: true },
				{ name: "条件 - 3", value: 3 , checked: false },
				{ name: "条件 - 4", value: 4 , checked: false },
				{ name: "条件 - 5", value: 5 , checked: false}
			],
			filterHeight : '100%'
		}
	},
	onReady:function(){
		_self = this;
		uni.getSystemInfo({
			success: function (res) {
				var windowHeight = res.windowHeight;
				//获取头部标题高度
				uni.createSelectorQuery().select('#grace-filter-header').fields(
					{
						size: true,
					}, function (res) {
						if(!res){return ;}
						var sHeight = (windowHeight - res.height);
						_self.filterHeight = sHeight + 'px';
					}
				).exec();
			}
		});
	},
	methods : {
		changeOrder:function(e){
			var tapIndex = e.target.dataset.itemid;
			this.orderIndex = tapIndex;
			this.showingIndex = 0;
			this.getList();
		},
		showOptions1:function(){if(this.showingIndex != 0){this.showingIndex = 0; return ;} this.showingIndex = 1;},
		showOptions2: function(){if(this.showingIndex != 0){this.showingIndex = 0; return ;} this.showingIndex = 2;},
		showOptions99 : function(){if(this.showingIndex != 0){this.showingIndex = 0; return ;} this.showingIndex = 99;},
		changeCate: function (e) {
			var tapIndex = e.target.dataset.itemid;
			this.cateIndex = tapIndex;
			this.showingIndex = 0;
			this.getList();
		},
		//价格排序
		changePriceOrder : function(){
			if(this.priceOrder == 1){
				this.priceOrder = 2;
			}else{
				this.priceOrder = 1;
			}
			uni.showModal({
				title: '价格排序已经切换',
				content: '对应的值保存在 priceOrder 变量中 ^_^'
			});
			this.getList();
		},
		//提交条件
		formsubmit : function(e){
			console.log(JSON.stringify(e.detail.value));
			uni.showModal({
				title: '请观察控制台',
				content: '条件以表单形式提交 ^_^'
			});
			_self.showingIndex = 0;
			this.getList();
		},
		//重置表单
		formReset : function(){
			for (var i = 0; i < _self.where1Tips.length; i++){
				_self.where1Tips[i].checked= false;
			}
			_self.where1Tips = _self.where1Tips;
			for (var i = 0; i < _self.where2Tips.length; i++) {
				_self.where2Tips[i].checked = false;
			}
			_self.where2Tips = _self.where2Tips;
			_self.showingIndex = 0;
			this.getList();
		},
		//筛选页面js
		changeFunc: function (e) {
			var checkVal = e.detail.value;
			var currentVal = this.where1Tips;
			for (var i = 0; i < currentVal.length; i++) {
				if (checkVal.indexOf(currentVal[i].value + '') != -1) {
					currentVal[i].checked = true;
				} else {
					currentVal[i].checked = false;
				}
			}
			this.where1Tips = currentVal;
		},
		changeFunc2: function (e) {
			var checkVal = e.detail.value;
			for (var i = 0; i < this.where2Tips.length; i++) {
				if (checkVal.indexOf(this.where2Tips[i].value + '') != -1) {
					this.where2Tips[i].checked = true;
				} else {
					this.where2Tips[i].checked = false;
				}
			}
			this.where2Tips = this.where2Tips;
		},
		//条件更新后执行统一函数（如重新读取数据等）
		getList : function(){
			console.log('条件更新后执行统一函数（如重新读取数据等）');
		}
	}
}
</script>
<style>
/* #ifdef  H5 */
.grace-filter{
    top:44px;
}
/* #endif */
</style>