(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/common/login"],{"053f":function(t,e,n){},"45fb":function(t,e,n){"use strict";n("859d");var i=o(n("b0ce")),a=o(n("f5a0"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(a.default))},"60fb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("2f62");function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){o(t,e,n[e])})}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r=n("4e77"),s={data:function(){return{positionTop:500,countNum:120,countDownTimer:null,phoneno:"",password:"",btnLoading:!1}},computed:{margin:function(){return.08*this.positionTop}},onReady:function(){this.positionTop=t.getSystemInfoSync().windowHeight-105},methods:a({},(0,i.mapMutations)(["login"]),{loginWithWx:function(){t.login({provider:"weixin",success:function(t){console.log(t.authResult)},fail:function(t){console.log(JSON.stringify(t))}})},loginWithQQ:function(){t.showToast({title:"QQ登录功能开发中",icon:"none"})},loginWithWb:function(){},loginNow:function(e){var n=this,i=[{name:"phone",checkType:"phoneno",errorMsg:"请输入正确的手机号"},{name:"password",checkType:"string",checkRule:"8,20",errorMsg:"密码长度应为8-20个字符"}],a=e.detail.value,o=r.check(a,i);o?(this.btnLoading=!0,t.request({url:this.GLOBAL.serverSrc+"common/login/login",method:"POST",data:e.detail.value,success:function(e){200===e.data.status?(n.login(e.data),t.reLaunch({url:"../index/index"})):t.showToast({title:e.data.msg,icon:"none"})},fail:function(t){n.GLOBAL.requestFail(t)},complete:function(){n.btnLoading=!1}})):t.showToast({title:r.error,icon:"none"})},reg:function(){t.navigateTo({url:"../register/reg"})}})};e.default=s}).call(this,n("649d")["default"])},"716d":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",[t._m(0),n("view",{staticClass:"grace-padding",staticStyle:{"background-color":"#fffcfa"}},[n("view",{staticClass:"grace-center",style:{"margin-top":t.margin+"px","margin-bottom":t.margin+"px"}},[n("image",{staticClass:"ym-logo",attrs:{src:"../../static/logo.png"}})]),n("view",{staticClass:"grace-form",staticStyle:{width:"95%",margin:"0 auto"}},[n("form",{attrs:{eventid:"7ba207e8-3"},on:{submit:t.loginNow}},[n("view",{staticClass:"grace-items  item-border"},[n("view",{staticClass:"grace-label"},[n("view",{staticClass:"iconfont icon-shouji"})]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.phoneno,expression:"phoneno"}],staticClass:"input",attrs:{type:"number",name:"phone",placeholder:"请输入手机号",maxlength:"11",eventid:"7ba207e8-0"},domProps:{value:t.phoneno},on:{input:function(e){e.target.composing||(t.phoneno=e.target.value)}}})]),n("view",{staticClass:"grace-items  item-border"},[n("view",{staticClass:"grace-label"},[n("view",{staticClass:"iconfont icon-mima1"})]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input",attrs:{type:"text",password:"",name:"password",placeholder:"请输入密码",maxlength:"20",eventid:"7ba207e8-1"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),n("button",{staticStyle:{background:"linear-gradient(to right,#fc6666,#ff8c55)","margin-top":"30px"},attrs:{loading:t.btnLoading,"form-type":"submit",type:"primary"}},[t._v("登录"),n("text",{staticClass:"grace-iconfont icon-arrow-right"})]),n("view",{staticClass:"grace-space-between grace-rows",staticStyle:{"margin-top":"20rpx"}},[n("text",[t._v("忘记密码")]),n("text",{attrs:{eventid:"7ba207e8-2"},on:{tap:t.reg}},[t._v("还没有账号？点击注册")])])],1)],1)]),n("view",{staticClass:"login-footer grace-wrap",style:{top:t.positionTop+"px"}},[n("view",{staticClass:"item-border"}),t._m(1),n("view",{staticClass:"grace-login-three"},[n("view",{staticClass:"grace-iconfont icon-weixin",staticStyle:{color:"#00c40b"},attrs:{eventid:"7ba207e8-4"},on:{tap:t.loginWithWx}}),n("view",{staticClass:"grace-iconfont icon-qq",staticStyle:{color:"#01a1e5"},attrs:{eventid:"7ba207e8-5"},on:{tap:t.loginWithQQ}}),n("view",{staticClass:"grace-iconfont icon-weibo",staticStyle:{color:"#fc4243"},attrs:{eventid:"7ba207e8-6"},on:{tap:t.loginWithWb}})])])])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticStyle:{background:"linear-gradient(to right,#ff8c55,#fc6666)",width:"100%",height:"80px"}},[n("image",{staticClass:"gif-wave",attrs:{src:"../../static/common/login/wave.gif",mode:"scaleToFill"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"grace-title"},[n("view",{staticClass:"grace-h5 grace-blod grace-center",staticStyle:{color:"grey"}},[t._v("使用其他账号登录")])])}];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},"9f04":function(t,e,n){"use strict";n.r(e);var i=n("60fb"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},f5a0:function(t,e,n){"use strict";n.r(e);var i=n("716d"),a=n("9f04");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("fc3a");var r=n("2877"),s=Object(r["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=s.exports},fc3a:function(t,e,n){"use strict";var i=n("053f"),a=n.n(i);a.a}},[["45fb","common/runtime","common/vendor"]]]);