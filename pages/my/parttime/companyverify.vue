<template>
    <view>
        <view class="grace-padding grace-bg-white  grace-common-border">
            <view class="grace-form">
                <form @submit="formSubmit">
                    <view class="grace-items">
                        <view class="grace-label">姓名</view>
                        <input type="text" class="input" name="name" placeholder="请输入团队名称"></input>
                    </view>
                    <view class="grace-items">
                        <view class="grace-label">手机号</view>
                        <view class="grace-form-r">
                             <input type="text" class="input" name="name" placeholder="请输入团队名称"></input>
                        </view>
                    </view>
					<view class="grace-items">
					    <view class="grace-label">身份证正反</view>
					    <view class="grace-form-r">
					         <input type="text" class="input" name="name" placeholder="请输入团队名称"></input>
					    </view>
					</view>
					<view class="grace-items">
					    <view class="grace-label">身份证正反</view>
					    <view class="grace-form-r">
					         <input type="text" class="input" name="name" placeholder="请输入团队名称"></input>
					    </view>
					</view>
					<view class="grace-team">
						<view class="team-i">团队简介</view>
						<view class="textarea"><textarea value="" placeholder="请输入团队简介(可展示到详情页,起到品牌推广作用)" rows="30"/></view>
					</view>
                    <view style="padding:22upx 0;">
                        <button formType="submit" type="primary" style="width:100%; background: orangered; border-bottom: none;">下一步</button>
                    </view>
                </form>
            </view>
        </view>
    </view>
</template>
<style>
	view{
		font-size: 35upx;
	}
	.grace-team{
		padding-top: 10upx;
		width: 90%;
		height: 200upx;
	}
	.team-i{
		float: left;
		width: 25%;
		height: 200upx;
	}
	.textarea{
		width: 65%;
		float: right;
		height: 200upx;
	}
	.text-top{
		height: 50%;
		border-bottom: 1px solid #f5f5f5;
	}
</style>