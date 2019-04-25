<template>
	<view class="main">
		<view class="box-top"><!--上层订单的整体框架-->
			<view class="arrive">订单已送达 &gt;</view>
			<view class="service">
				<view class="service-thanks">感谢您对TOP学院的信任,期待再次光临</view>
				<view><text class="service-time">准时达服务：</text><text class="service-special">当前特殊情况暂不享受超时赔付</text></view>
			</view>
			<view><button class="button" type="warn" style="background-color: #FF4243;">再来一单</button></view>
		</view>
		<view class="menu"><!--中间层框架-->
			<view class="shop">
				<view style="float: left;font-weight: 700;font-size: 36upx;"><text>杭州小笼包</text></view>
				<view style="float: right;"><text style="font-weight: bold;">&gt;</text></view>
			</view>
			<view class="shop">
				<view style="float: left;"><text>韭菜鸡蛋包</text></view>
				<view style="float: right;"><text class="price">x1</text><text>&yen;7</text></view>
			</view>
			<view class="shop">
				<view style="float: left;"><text>鲜肉小笼包</text></view>
				<view style="float: right;"><text class="price">x1</text><text>&yen;7</text></view>
			</view>
			<view class="shop">
				<view style="float: left;"><text>冰糖雪梨</text></view>
				<view style="float: right;"><text class="price">x1</text><text>&yen;4</text></view>
			</view>
			<view class="shop">
				<view style="float: left;"><text>餐盒费</text></view>
				<view style="float: right;"><text class="price">x1</text><text>&yen;2</text></view>
			</view>
			<view class="shop">
				<view style="float: left;"><text>配送费</text></view>
				<view style="float: right;"><text>&yen;2.5</text></view>
			</view>
			<view class="shop">
				<view style="float: left;"><text style="font-size: 33upx;">店铺红包</text></view>
				<view style="float: right;"><text style="color: #f53237;">&yen;6</text></view>
			</view>
			<view class="shop" style="border-bottom: none;">
				<view style="float: left;"><text style="color: #FF4243;font-size: 33upx;">联系商家</text></view>
				<view style="float: right;"><text class="space" style="font-size: 35upx;">实付</text><text style="font-weight: bold;">&yen;16.5</text></view>
			</view>
		</view>
		<view class="send"><!--配送信息-->
			<view class="send-way">
				<view><text style="font-size: 36upx;">配送信息</text></view>
			</view>
			<view class="send-way">
				<view style="float: left;"><text>送达时间</text></view>
				<view style="float: right;"><text>尽快送达</text></view>
			</view>
			<view class="send-way">
				<view style="float: left;"><text>收货地址</text></view>
				<view style="float: right;"><text style="font-size: 20upx;">天津电子信息职业技术学院4号楼525宿舍</text><text style="font-size: 20upx;">李文杰(先生)</text></view>
			</view>
			<view class="send-way" style="border-bottom: none;">
				<view style="float: left;"><text>配送方式</text></view>
				<view style="float: right;"><text>商家配送</text></view>
			</view>
		</view>
		<view class="send"><!--订单信息-->
			<view class="send-way">
				<view><text style="font-size: 36upx;">订单信息</text></view>
			</view>
			<view class="send-way">
				<view style="float: left;"><text>订单号</text></view>
				<view style="float: right;"><text style="font-size: 30upx; ">2102 9570 8039 8090 293</text></view>
			</view>
			<view class="send-way">
				<view style="float: left;"><text>支付方式</text></view>
				<view style="float: right;"><text>在线支付</text></view>
			</view>
			<view class="send-way" style="border-bottom: none;">
				<view style="float: left;"><text>下单时间</text></view>
				<view style="float: right;"><text class="space">2019-04-21</text><text>17:46</text></view>
			</view>
		</view>
	</view>
</template>
<style>
	page{
		background-color: #f5f5f5;
	}
	.box-top{/*最上面的大框架*/
		width: 85%;
		padding: 40upx 30upx;
		box-shadow: 1upx 1upx 1px #f5f5f5;
		margin: 20upx auto;
		margin-top: 10px;
		background: white;
	}
	.arrive{
		height: 90upx;
		border-bottom: 1upx solid #f5f5f5;
		color: black;
		font-size: 46upx;
		margin-bottom: 15upx;
	}
	.service{
		margin-top: 20upx;
		font-size: 35upx;
	}
	.service-thanks{
		font-size: 35upx;
		margin: 20upx 0;
	}
	.service-time{
		font-size: 30upx;
		color: #ff4243;
		font-weight: bold;
	}
	.service-special{
		font-size: 28upx;
		color: #969696;
	}
	.button{
		display: inline-block;
		margin-top: 30upx;
		width: 190upx;
		height: 75upx;
		line-height: 75upx;
		font-size: 32upx;
	}/*-----------------以下是menu-----------------*/
	.menu{
		width: 85%;
		padding: 20upx 30upx;
		box-shadow: 1upx 1upx 1px #f5f5f5;
		margin: 0 auto;
		margin-bottom: 10upx;
		background: white;
	}
	.shop{
		height: 100upx;
		line-height: 100upx;
		border-bottom: 1upx solid #f5f5f5;
		font-size: 33upx;
		color: black;
	}
	.price{
		margin-right: 60upx;
	}
	/*-----------------以下是配送信息-----------------*/
	.send{
		width: 85%;
		padding: 20upx 30upx;
		box-shadow: 1upx 1upx 1px #f5f5f5;
		margin: 0 auto;
		margin: 20upx auto;
		background: white;
	}
	.send-way{
		height: 100upx;
		line-height: 100upx;
		border-bottom: 1upx solid #f5f5f5;
		font-size: 33upx;
		color: black;
	}
	.space{
		margin-right: 30upx;
	}
</style>