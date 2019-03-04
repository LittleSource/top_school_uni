<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./graceUI/graceUI.css";
	.ymkj-gradient-bg{
		width:100%;
		  background: linear-gradient(45deg,#ccff33 0,#ffcc33 33%,#ff9933 66%,#fc4243 100%);
		  background-size: 400%; background-position:0 100%; animation: gradient 7.5s ease-in-out infinite;
	}
</style>
