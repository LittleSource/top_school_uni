(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/market/checkstand"],{"4c88":function(t,a,e){"use strict";e.r(a);var s=e("e6e3"),i=e("520b");for(var r in i)"default"!==r&&function(t){e.d(a,t,function(){return i[t]})}(r);e("c4d1");var c=e("2877"),n=Object(c["a"])(i["default"],s["a"],s["b"],!1,null,null,null);a["default"]=n.exports},"4d8e":function(t,a,e){"use strict";e("7f79");var s=r(e("b0ce")),i=r(e("4c88"));function r(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))},"520b":function(t,a,e){"use strict";e.r(a);var s=e("95db"),i=e.n(s);for(var r in s)"default"!==r&&function(t){e.d(a,t,function(){return s[t]})}(r);a["default"]=i.a},"5a54":function(t,a,e){},"95db":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var s=e("2f62"),i={data:function(){return{itemList:[],realPrice:999,orderId:0,remark:"",payWay:"wxpay"}},computed:(0,s.mapState)(["user","addressInfo"]),onLoad:function(a){var e=this;this.orderId=a.order_id,this.realPrice=a.real_price,t.showLoading({title:"加载中"}),t.request({url:this.GLOBAL.serverSrc+"pay/create_order/select",method:"POST",data:{order_id:this.orderId},success:function(a){t.hideLoading(),200===a.data.status?e.itemList=a.data.itemList:t.showToast({title:a.data.msg,icon:"none"})},fail:function(a){t.hideLoading(),e.GLOBAL.requestFail(a)}})},methods:{changeWxpay:function(){this.payWay="wxpay"},changeAlipay:function(){this.payWay="alipay"},goPay:function(){"wxpay"===this.payWay?this.wxpay():"alipay"===this.payWay?this.alipay():t.showToast({title:"请选择一个付款方式哦！",icon:"none"})},wxpay:function(){var a=this;t.request({url:this.GLOBAL.serverSrc+"pay/wepay/payorder",method:"POST",data:{order_id:this.orderId,remark:this.remark},success:function(e){var s=a,i=e.data.wepay_sdk;t.requestPayment({provider:"wxpay",orderInfo:i,success:function(a){"requestPayment:ok"===a.errMsg&&t.showToast({title:"付款成功"}),t.redirectTo({url:"./payresult?price="+s.realPrice})},fail:function(t){console.log(JSON.stringify(t.errMsg))}})},fail:function(t){a.GLOBAL.requestFail(t)}})},alipay:function(){var a=this;t.request({url:this.GLOBAL.serverSrc+"pay/alipay/payorder",method:"POST",data:{order_id:this.orderId,remark:this.remark},success:function(a){var e=a.data.alipay_sdk;t.requestPayment({provider:"alipay",orderInfo:e,success:function(a){"requestPayment:ok"===a.errMsg&&t.showToast({title:"付款成功"})},fail:function(t){console.log(JSON.stringify(t.errMsg))}})},fail:function(t){a.GLOBAL.requestFail(t)}})}}};a.default=i}).call(this,e("6e42")["default"])},c4d1:function(t,a,e){"use strict";var s=e("5a54"),i=e.n(s);i.a},e6e3:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",[e("view",{staticStyle:{"margin-bottom":"90rpx"}},[t._m(0),e("navigator",{staticClass:"cu-list menu",attrs:{url:"/pages/my/address/address"}},[null===t.addressInfo.city?e("view",{staticClass:"cu-item arrow"},[e("view",{staticClass:"content padding-tb-arrow"},[e("view",{staticClass:"iconfont icon-jiahao1"},[t._v("点击添加")]),e("view",{staticClass:"text-gray text-sm"},[t._v("您还没有设置收货地址")])])]):e("view",{staticClass:"cu-item arrow"},[e("view",{staticClass:"content padding-tb-arrow"},[e("view",[t._v(t._s(t.addressInfo.name+" "+t.addressInfo.phone))]),e("view",{staticClass:"text-gray text-sm"},[t._v(t._s(t.addressInfo.city+t.addressInfo.address))])])])]),t._m(1),e("view",{staticClass:"grace-list"},t._l(t.itemList,function(a,s){return e("view",{key:s,staticClass:"items"},[e("view",{staticClass:"icons"},[e("image",{attrs:{src:a.item_img,mode:"scaleToFill"}})]),e("view",{staticClass:"title"},[t._v(t._s(a.item_name)),e("text",{staticStyle:{color:"#000"}},[t._v(t._s(a.item_price+" × "+a.item_count))])])])})),e("view",{staticClass:"bg-white text-right has-borderb"},[e("view",{staticClass:" text-xl padding"},[e("text",{staticClass:"text-black"},[t._v("小计:￥"+t._s(t.realPrice))])])]),t._m(2),e("view",{staticClass:"cu-form-group has-bordertb"},[e("textarea",{attrs:{placeholder:"请输入订单留言",value:t.remark,maxlength:"-1","auto-height":"","placeholder-class":"placeholder"}})]),t._m(3),e("radio-group",{staticStyle:{width:"100%"},attrs:{mpcomid:"1b18f546-0"}},[e("view",{staticClass:"cu-list menu menu-avatar"},[e("view",{staticClass:"cu-item",attrs:{eventid:"1b18f546-0"},on:{click:t.changeWxpay}},[e("view",{staticClass:"cu-avatar round weixin lg"}),e("view",{staticClass:"content"},[e("view",{staticClass:"text-black"},[t._v("微信支付"),e("view",{staticClass:"cu-tag round bg-orange sm"},[t._v("推荐")])]),e("view",{staticClass:"text-gray text-sm"},[t._v("亿万用户的选择,更快更安全")])]),e("view",{staticClass:"action"},[e("radio",{staticClass:"orange sm",attrs:{value:"wxpay",checked:"wxpay"===t.payWay}})],1)]),e("view",{staticClass:"cu-item",attrs:{eventid:"1b18f546-1"},on:{click:t.changeAlipay}},[e("view",{staticClass:"cu-avatar alipay round lg"}),e("view",{staticClass:"content"},[e("view",{staticClass:"text-black"},[t._v("支付宝")]),e("view",{staticClass:"text-gray text-sm"},[t._v("推荐支付宝用户使用")])]),e("view",{staticClass:"action"},[e("radio",{staticClass:"orange sm",attrs:{value:"alipay",checked:"alipay"===t.payWay}})],1)])])])],1),e("view",{staticClass:"grace-footer"},[e("view",{staticStyle:{width:"50%","line-height":"90rpx","font-size":"36rpx"}},[e("text",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(t.realPrice)+"元")])]),e("view",{staticStyle:{width:"50%"}},[e("button",{attrs:{type:"warn",eventid:"1b18f546-2"},on:{click:t.goPay}},[t._v("去支付")])],1)])])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",{staticClass:"cu-bar bg-white"},[e("view",{staticClass:"action"},[e("text",{staticClass:"icon-titles text-orange"}),e("text",{staticClass:"text-xl text-bold"},[t._v("收货地址")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",{staticClass:"cu-bar bg-white margin-top"},[e("view",{staticClass:"action"},[e("text",{staticClass:"icon-titles text-orange"}),e("text",{staticClass:"text-xl text-bold"},[t._v("订单详情")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",{staticClass:"cu-bar bg-white margin-top"},[e("view",{staticClass:"action"},[e("text",{staticClass:"icon-titles text-orange"}),e("text",{staticClass:"text-xl text-bold"},[t._v("订单留言")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",{staticClass:"cu-bar bg-white margin-top"},[e("view",{staticClass:"action"},[e("text",{staticClass:"icon-titles text-orange"}),e("text",{staticClass:"text-xl text-bold"},[t._v("付款方式")])])])}];e.d(a,"a",function(){return s}),e.d(a,"b",function(){return i})}},[["4d8e","common/runtime","common/vendor"]]]);