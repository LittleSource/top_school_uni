(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/market/order/list"],{"238a":function(t,e,a){"use strict";a("7f79");var i=r(a("b0ce")),n=r(a("8c5d"));function r(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(n.default))},"70ba":function(t,e,a){"use strict";var i=a("c62c"),n=a.n(i);n.a},7611:function(t,e,a){"use strict";a.r(e);var i=a("be41"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e["default"]=n.a},"8c5d":function(t,e,a){"use strict";a.r(e);var i=a("fc7a"),n=a("7611");for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);a("70ba");var s=a("2877"),o=Object(s["a"])(n["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports},be41:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(a("08f2")),n=a("2f62");function r(t){return t&&t.__esModule?t:{default:t}}var s={components:{graceLoading:i.default},data:function(){return{marketId:0,categories:[{cateid:0,name:"待处理"},{cateid:1,name:"待付款"},{cateid:2,name:"已处理"},{cateid:3,name:"已退款"}],cateCurrentIndex:0,orderList:[],loading:{show:!1,nextPages:2,totalPages:2,type:0,text:["加载更多","loading ......","已加载全部"]}}},computed:(0,n.mapState)(["user"]),onLoad:function(){var e=t.getStorageSync("market");e.isMarket?(this.marketId=e.marketId,t.startPullDownRefresh()):(t.showToast({title:"系统错误",mask:!1,duration:1500}),t.navigateBack())},onPullDownRefresh:function(){this.getList(1,this.categories[this.cateCurrentIndex].name),setTimeout(function(){t.stopPullDownRefresh()},1e3)},onReachBottom:function(){var e=this;this.loading.show=!0,1!==this.loading.type&&(this.loading.nextPages>this.loading.totalPages?this.loading.type=2:(this.loading.type=1,t.request({url:this.GLOBAL.serverSrc+"market/management/order",method:"POST",data:{phone:this.user.phone,token:this.user.token,market_id:this.marketId,page:this.loading.nextPages,type:this.categories[this.cateCurrentIndex].name},success:function(a){200===a.data.status?e.orderList=e.orderList.concat(a.data.orderList):t.showToast({title:a.data.msg,icon:"none"})},fail:function(t){e.GLOBAL.requestFail(t)},complete:function(){e.loading.type=0,e.loading.nextPages++}})))},methods:{getList:function(e,a){var i=this;t.showLoading({title:"加载中..."}),t.request({url:this.GLOBAL.serverSrc+"market/management/order",method:"POST",data:{phone:this.user.phone,token:this.user.token,market_id:this.marketId,page:e,type:a},success:function(e){200===e.data.status?(i.orderList=e.data.orderList,i.loading.totalPages=e.data.totalPages,i.loading.totalPages>1&&i.orderList.length>0?i.loading.show=!0:i.loading.show=!1):t.showToast({title:e.data.msg,icon:"none"})},fail:function(t){i.GLOBAL.requestFail(t)},complete:function(){t.hideLoading()}})},tabChange:function(t){var e=t.currentTarget.dataset.index;this.cateCurrentIndex=e,this.loading.nextPages=2,this.getList(1,this.categories[e].name)}}};e.default=s}).call(this,a("6e42")["default"])},c62c:function(t,e,a){},fc7a:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("scroll-view",{staticClass:"grace-tab-title grace-center",attrs:{"scroll-x":"true",id:"grace-tab-title"}},t._l(t.categories,function(e,i){return a("view",{key:i,class:[t.cateCurrentIndex==i?"grace-tab-current":""],attrs:{"data-cateid":e.cateid,"data-index":i,eventid:"72b36996-0-"+i},on:{tap:t.tabChange}},[t._v(t._s(e.name))])})),0===t.orderList.length?a("view",{staticClass:"no-order"},[t._v("您暂无"+t._s(t.categories[t.cateCurrentIndex].name)+"的订单哦")]):a("view",{staticStyle:{"margin-top":"50px"}},t._l(t.orderList,function(e,i){return a("view",{key:i,staticClass:"order-card grace-rows has-borderb"},[a("view",{staticStyle:{width:"80rpx"}},[a("image",{staticStyle:{width:"70rpx",height:"70rpx"},attrs:{src:e.first_img,mode:"widthFix"}})]),a("view",{staticClass:"right",staticStyle:{width:"660rpx"}},[a("view",{staticClass:"grace-rows grace-space-between"},[a("view",{staticStyle:{"font-size":"35rpx"}},[t._v(t._s(e.first_product)+" >")]),a("text",{staticStyle:{"font-size":"30rpx"}},[t._v("已送达")])]),a("view",{staticClass:"time has-borderb"},[a("text",[t._v(t._s(e.create_time))])]),a("view",{staticClass:"rice grace-rows grace-space-between has-borderb"},[a("view",[t._v("订单号:"+t._s(e.out_trade_no))]),a("text",[t._v("¥"+t._s(e.real_price))])]),a("view",{staticClass:"btn-area"},[a("button",{staticClass:"mini-btn",attrs:{type:"primary",size:"mini",plain:"true"}},[t._v("已处理")])],1)])])})),a("graceLoading",{attrs:{loadingType:t.loading.type,loadingText:t.loading.text,show:t.loading.show,mpcomid:"72b36996-0"}})],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})}},[["238a","common/runtime","common/vendor"]]]);