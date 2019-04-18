<template>
	<view>
		<view class="text">
			<p>为打造真实可靠的"TOP校园"平台，共同营造安全、有效的兼职信息对接系统、本人/公司(以下简称"我方")承诺:</p>
			<p>1. 本账号仅用于我方使用TOP校园提供的简直招聘信息发布服务，除非有法律固定且征得TOP校园平台的同意，否则，本账户和密码我方承诺不以任何方式转让、赠与或继承。</p>
			<p>2. 如因我方失误导致本账号遗失，我方原为本账号所有行为负责。</p>
			<p>3. 在签署本声明时，我方已阅读"TOP校园平台用户协议"相关规定，除了本协议承诺外我方承诺遵守"用户协议"相关规定。</p>
			<p>4. 我方保证其在TOP校园平台服务中所产生的一切信息均为真实、准确，且愿意接受TOP校园平台监督。</p>
			<p>5. 我方承诺在TOP校园平台所发布的兼职信息不出现"要做兼职先办卡"、"网络兼职"或"工拖欠情况"等情况，如出现以上情况，我方愿意赔偿乙方及相应受害者一切损失(包括但不限于各种赔偿费、诉讼代理费以及为此支出的其他合理费用)。</p>
			<p>6. 我方保证我方拥有所提供的信息的版权，或获得他人授权，并保证该信息不侵犯到任何第三方人的合法权益</p>
			<p>7. 在使用TOP校园平台服务时产生的所有"内容"，我方对其承担全部责任，TOP校园平台(及其所有者)不对信息的真实性、准确性，有效性和安全性负责。</p>
			<p>8. 如因我方违反本条规定造成TOP校园平台被第三人的索赔，我方愿全额承担TOP校园平台一切损失(包括但不限于各种赔偿费，诉讼代理费及为此支出的其他合理费用。)</p>
			<p>9. 同时当我方向TOP校园平台提供内容时，我方及授予TOP校园平台永久性的、全球的、不可撤销的、免使用费的、可再次授权给他人的使用权。</p>
			<p>10. 我方自行评估和承担在TOP校园平台上提供的使用内容而产生的一切风险、损失。</p>
			<p>11. TOP校园平台有权利单方面无理由删除任何免费信息，有权利暂停任何付费信息的发布直至我方提供相关证据证明该信息的真实性。</p>
			<p>12. 如因我方违反本声明而造成TOP校园平台及其用户损失，TOP校园平台有权向我方索取一切赔偿。</p>
		</view>
		<view class="form">
			<button type="default" class="one" @click="idsagree">不同意</button>
			<button type="warn" class="two" @click="agree">同意</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				type: 0//认证类型  企业1/团队2
			}
		},
		onLoad(partemater) {
			this.type = parseInt(partemater.type);
		},
		methods: {
			agree() {
				if(this.type === 1){
					uni.navigateTo({
						url: './companyverify'
					});
				}else if(this.type === 2){
					uni.navigateTo({
						url: './companyverify'
					});
				}
			},
			disagree(){
				uni.navigateBack();
			}
		},
	}
</script>
<style>
	.text{
		width: 90%;
		padding: 5%;
		color: black;
		font-size: 26upx;
		line-height: 45upx;
		margin-bottom: 90upx;
	}
	p{
		margin-bottom: 40upx;
	}
	.form{
		width: 100%;
		height: 90upx;
		background: white;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 0 ;
	}
	.one{
		width: 300upx;
		height: 90upx;
		float: left;
		background: black;
		border-radius: 10upx;
		text-align: center;
		font-size: 35upx;
		margin-left: 65upx;
		background: #e4e1dc;
		color: black; 
	}
	.two{
		width: 300upx;
		height: 90upx;
		float: left;
		margin-left: 10upx;
		background: black;
		border-radius: 10upx;
		text-align: center;
		font-size: 35upx;
		background: #fe6b3d;
		color: white;
	}
</style>