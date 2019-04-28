<template>
    <view>
        <view class="grace-padding grace-bg-white">
            <view class="grace-form">
                <form @submit="formSubmit">
                    <view class="grace-items">
                    	<view class="grace-label">所在学校</view>
                    	<input type="text" disabled class="input" name="market_school" :placeholder="school.title+'(不可更改)'"></input>
                    </view>
                    <view class="grace-items">
                    	<view class="grace-label">超市名称</view>
                    	<input type="text" class="input" name="market_name" placeholder="请输入超市名称" maxlength="8"></input>
                    </view>
                    <view class="grace-items">
                    	<view class="grace-label">宿舍楼</view>
                    	<input type="text" class="input" name="dorm_tower" placeholder="请输入您所在宿舍楼"></input>
                    </view>
                    <view class="grace-items">
                    	<view class="grace-label">宿舍号</view>
                    	<input type="text" class="input" name="dorm_num" placeholder="请精确到床号"></input>
                    </view>
                    <view style="padding:22upx 0;">
                        <button formType="submit" type="primary" style="width:100%;">提交</button>
                    </view>
                </form>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            genderIndex: 0,
            gender : ['男', '女'],
            dateValue : "请选择"
        }
    },
    methods:{
        bindPickerChange:function(e){
            console.log(e);
            this.genderIndex = e.detail.value;
        },
        bindDateChange : function(e){
            this.dateValue = e.detail.value;
        },
        formSubmit : function(e){
            uni.showToast({title:'请观察控制台', icon:'none'});
            console.log(JSON.stringify(e.detail.value));
        }
    }
}
</script>