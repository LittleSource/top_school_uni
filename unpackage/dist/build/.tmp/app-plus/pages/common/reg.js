(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/common/reg"],{"116d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("4e77"),i={data:function(){return{vcodeBtnName:"获取验证码",countNum:120,countDownTimer:null,phoneno:"",password:"",yzm:""}},methods:{loginWithWx:function(){t.showToast({title:"微信登录功能开发中",icon:"none"})},changePre:function(t){this.pnpre=this.pnpres[t.detail.value]},regNow:function(e){var n=[{name:"phone",checkType:"phoneno",errorMsg:"请输入正确的手机号"},{name:"yzm",checkType:"string",checkRule:"6,6",errorMsg:"短信验证码输入错误"},{name:"password",checkType:"string",checkRule:"8,20",errorMsg:"密码长度应为8-20个字符"}],i=e.detail.value,o=a.check(i,n);if(o){var s=e.detail.value;s.verificationCode=this.yzm,t.request({url:this.GLOBAL.serverSrc+"register",method:"POST",data:s,success:function(e){200===e.data.status&&(t.showToast({title:e.data.msg,icon:"none"}),t.reLaunch({url:"../index/index"})),console.log(JSON.stringify(e))},fail:function(){},complete:function(){}}),console.log(JSON.stringify(e))}else t.showToast({title:a.error,icon:"none"})},getVCode:function(){var e=this,n=/^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;if(!n.test(this.phoneno))return t.showToast({title:"请填写正确的手机号码",icon:"none"}),!1;"获取验证码"!=this.vcodeBtnName&&"重新发送"!=this.vcodeBtnName||(this.vcodeBtnName="发送中...",t.request({url:this.GLOBAL.serverSrc+"register/sendSms/"+this.phoneno,method:"GET",success:function(n){console.log(JSON.stringify(n)),200===n.data.status?(t.showToast({title:n.data.msg,icon:"none"}),e.yzm=n.data.verificationCode,e.countNum=120,e.countDownTimer=setInterval(function(){this.countDown()}.bind(e),1e3)):400===n.data.status&&(t.showToast({title:n.data.msg,icon:"none"}),e.vcodeBtnName="获取验证码")},fail:function(){console.log(JSON.stringify("123213"))},complete:function(){}}))},countDown:function(){if(this.countNum<1)return clearInterval(this.countDownTimer),void(this.vcodeBtnName="重新发送");this.countNum--,this.vcodeBtnName=this.countNum+"秒重发"}}};e.default=i}).call(this,n("649d")["default"])},2816:function(t,e,n){"use strict";n("859d");var a=o(n("b0ce")),i=o(n("5e4b"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},"5b33":function(t,e,n){"use strict";n.r(e);var a=n("116d"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},"5e4b":function(t,e,n){"use strict";n.r(e);var a=n("aee7"),i=n("5b33");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("ef77");var s=n("2877"),c=Object(s["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},aee7:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"grace-padding"},[t._m(0),n("view",{staticClass:"grace-form",staticStyle:{width:"95%",margin:"0 auto"}},[n("form",{attrs:{eventid:"9b50365a-3"},on:{submit:t.regNow}},[n("view",{staticClass:"grace-items  item-border"},[n("view",{staticClass:"grace-label"},[n("view",{staticClass:"iconfont icon-shouji"})]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.phoneno,expression:"phoneno"}],staticClass:"input",attrs:{type:"number",name:"phone",placeholder:"请输入手机号",eventid:"9b50365a-0"},domProps:{value:t.phoneno},on:{input:function(e){e.target.composing||(t.phoneno=e.target.value)}}})]),n("view",{staticClass:"grace-items  item-border"},[n("view",{staticClass:"grace-label"},[n("view",{staticClass:"iconfont icon-mima1"})]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input",attrs:{type:"text",password:"",name:"password",placeholder:"请输入密码",eventid:"9b50365a-1"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),n("view",{staticClass:"grace-space-between item-border",staticStyle:{"margin-top":"28rpx","max-height":"95rpx"}},[n("view",{staticClass:"grace-items",staticStyle:{width:"70%"}},[n("view",{staticClass:"grace-label"},[n("view",{staticClass:"iconfont icon-yanzhengma"})]),n("input",{staticClass:"input",attrs:{type:"number",name:"yzm",placeholder:"请输入验证码"}})]),n("view",{staticStyle:{width:"28%","margin-left":"2%",paading:"0"}},[n("button",{staticClass:"login-sendmsg-btn",attrs:{type:"primary",eventid:"9b50365a-2"},on:{tap:t.getVCode}},[t._v(t._s(t.vcodeBtnName))])],1)]),n("button",{staticStyle:{background:"#fc4243","margin-top":"30px"},attrs:{"form-type":"submit",type:"primary"}},[t._v("注册"),n("text",{staticClass:"grace-iconfont icon-arrow-right"})])],1)],1),n("view",{staticClass:"ymkj-footer"},[n("view",{staticClass:"item-border"}),t._m(1),n("view",{staticClass:"grace-login-three",staticStyle:{"margin-top":"8px"}},[n("view",{staticClass:"grace-iconfont icon-weixin",staticStyle:{color:"#00c40b"},attrs:{eventid:"9b50365a-4"},on:{tap:t.loginWithWx}}),n("view",{staticClass:"grace-iconfont icon-qq",staticStyle:{color:"#01a1e5"}}),n("view",{staticClass:"grace-iconfont icon-weibo",staticStyle:{color:"#fc4243"}})])])])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"grace-center",staticStyle:{"margin-top":"50px","margin-bottom":"38px"}},[n("image",{staticClass:"ym-logo",attrs:{src:"../../static/logo.png"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"grace-title"},[n("view",{staticClass:"grace-h5 grace-blod grace-center",staticStyle:{color:"grey"}},[t._v("使用其他账号登录")])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},db84:function(t,e,n){},ef77:function(t,e,n){"use strict";var a=n("db84"),i=n.n(a);i.a}},[["2816","common/runtime","common/vendor"]]]);