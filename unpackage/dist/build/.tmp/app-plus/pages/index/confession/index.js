(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/confession/index"],{"03a0":function(t,e,a){"use strict";var n=a("35a9"),s=a.n(n);s.a},"056b":function(t,e,a){"use strict";a("859d");var n=i(a("b0ce")),s=i(a("6755"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(s.default))},"0c5a":function(t,e,a){},2757:function(t,e,a){"use strict";a.r(e);var n=a("a535"),s=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=s.a},"35a9":function(t,e,a){},"5d92":function(t,e,a){"use strict";a.r(e);var n=a("eb23"),s=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=s.a},6755:function(t,e,a){"use strict";a.r(e);var n=a("c970"),s=a("2757");for(var i in s)"default"!==i&&function(t){a.d(e,t,function(){return s[t]})}(i);a("f877");var o=a("2877"),r=Object(o["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},"6d02":function(t,e,a){"use strict";a.r(e);var n=a("e5cd"),s=a("82e0");for(var i in s)"default"!==i&&function(t){a.d(e,t,function(){return s[t]})}(i);a("03a0");var o=a("2877"),r=Object(o["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},"82e0":function(t,e,a){"use strict";a.r(e);var n=a("e089"),s=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=s.a},a383:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{class:[t.show?"ganimate-show grace-alert":"grace-alert"],attrs:{hidden:!t.show}},[a("view",{staticClass:"icon gaicon",class:["icon-"+t.msgtype,t.msgtype]}),a("view",{staticClass:"grace-alert-msg"},[t._v(t._s(t.msg))])])},s=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return s})},a535:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("6d02")),s=i(a("deac"));function i(t){return t&&t.__esModule?t:{default:t}}var o=null,r={components:{graceAlert:s.default,graceLoading:n.default},data:function(){return{confessionList:[],alert:{show:!1,msg:"",msgtype:""},loading:{show:!0,nextPages:2,totalPages:2,type:0,text:["加载更多","loading ......","已加载全部"]}}},methods:{showMsg:function(t,e){this.alert.show=!0,this.alert.msgtype=t,this.alert.msg=e;var a=this;null!=o&&clearTimeout(o),o=setTimeout(function(){a.alert.show=!1,a.alert.msg=""},2e3)}},onLoad:function(){this.confessionList=t.getStorageSync("confessionList"),t.startPullDownRefresh()},onReady:function(){},onPullDownRefresh:function(){var e=this;t.request({url:this.GLOBAL.serverSrc+"confession/card/index",method:"GET",data:{page:1},success:function(a){e.confessionList=a.data.cardsList,e.loading.totalPages=a.data.totalPages,e.showMsg("right","表白墙动态已更新"),t.setStorage({key:"confessionList",data:e.confessionList})},fail:function(){e.showMsg("error","服务器异常，请稍后再试！")},complete:function(){t.stopPullDownRefresh()}})},onReachBottom:function(){var e=this;1!==this.loading.type&&(this.loading.nextPages>this.loading.totalPages?this.loading.type=2:(this.loading.type=1,t.request({url:this.GLOBAL.serverSrc+"confession/card/index",method:"GET",data:{page:this.loading.nextPages},success:function(t){e.confessionList=e.confessionList.concat(t.data.cardsList)},fail:function(){e.showMsg("error","服务器异常，请稍后再试！")},complete:function(){e.loading.type=0,e.loading.nextPages++}})))}};e.default=r}).call(this,a("649d")["default"])},b21a:function(t,e,a){},c35a:function(t,e,a){"use strict";var n=a("b21a"),s=a.n(n);s.a},c970:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"ymkj-gradient-bg"},[a("view",{staticClass:"card-box grace-padding"},t._l(t.confessionList,function(e,n){return a("navigator",{key:n,staticClass:"confession-card",attrs:{url:"./detail?id="+e.article_id}},[a("view",{staticClass:"confession-card-head grace-rows"},[a("image",{staticClass:"confession-card-avatar",attrs:{src:e.avatar}}),a("view",{staticClass:"confession-card-head-info"},[a("view",{staticStyle:{"font-size":"14px"}},[t._v(t._s(e.user_name))]),a("view",{staticStyle:{"font-size":"11px",color:"grey !important"}},[t._v(t._s(e.release_time))])])]),a("view",{staticClass:"grace-news-list-img-news"},[a("view",{staticClass:"grace-news-list-title-main",staticStyle:{padding:"1%",width:"96%"}},[t._v(t._s(e.content))]),a("view",{staticClass:"grace-wrap"},t._l(e.images_list,function(t,e){return a("image",{key:n,staticStyle:{height:"100px",width:"48%",margin:"2px 1%"},attrs:{mode:"aspectFill",src:t}})}))]),a("view",{staticClass:"grace-news-list-info",staticStyle:{width:"96%","padding-left":"2%"}},[a("view",[a("text",{staticClass:"iconfont icon-heart1"}),t._v(t._s(e.thumbs_up)),a("text",{staticClass:"iconfont icon-fire",staticStyle:{"margin-left":"18rpx"}}),t._v(t._s(e.reading_volume))])])])})),a("graceLoading",{attrs:{loadingType:t.loading.type,loadingText:t.loading.text,show:t.loading.show,mpcomid:"227202ca-0"}}),a("graceAlert",{attrs:{show:t.alert.show,msg:t.alert.msg,msgtype:t.alert.msgtype,mpcomid:"227202ca-1"}})],1)},s=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return s})},deac:function(t,e,a){"use strict";a.r(e);var n=a("a383"),s=a("5d92");for(var i in s)"default"!==i&&function(t){a.d(e,t,function(){return s[t]})}(i);a("c35a");var o=a("2877"),r=Object(o["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},e089:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"graceLoading",props:{loadingType:{type:Number,default:0},loadingText:{type:Array,default:function(){return["上拉加载更多","加载中...","已经加载全部数据"]}},show:{type:Boolean,default:!0}}};e.default=n},e5cd:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.show?a("view",{staticClass:"grace-loading grace-ellipsis"},[1===t.loadingType?a("view",{staticClass:"grace-loading-icon"}):t._e(),a("text",[t._v(t._s(t.loadingText[t.loadingType]))])]):t._e()},s=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return s})},eb23:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"graceAlert",props:{msgtype:{type:String,default:"msg"},msg:{type:String,default:""},show:{type:Boolean,default:!1}}};e.default=n},f877:function(t,e,a){"use strict";var n=a("0c5a"),s=a.n(n);s.a}},[["056b","common/runtime","common/vendor"]]]);