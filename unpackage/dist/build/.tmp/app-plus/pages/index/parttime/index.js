(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/parttime/index"],{"51b0":function(t,e,a){"use strict";a.r(e);var i=a("75b7"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},"75b7":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(a("08f2")),n=a("2f62");function s(t){return t&&t.__esModule?t:{default:t}}var o={components:{graceLoading:i.default},data:function(){return{categories:[{cateid:0,name:"全部"},{cateid:1,name:"日结"},{cateid:2,name:"短期"},{cateid:3,name:"长期"}],cateCurrentIndex:0,jobList:[],loading:{show:!0,nextPages:2,totalPages:2,type:0,text:["加载更多","loading ......","已加载全部"]}}},computed:(0,n.mapState)(["selectSchool"]),onLoad:function(){this.jobList=t.getStorageSync("jobList"),t.startPullDownRefresh()},onPullDownRefresh:function(){this.getList(),setTimeout(function(){t.stopPullDownRefresh()},1e3)},onReachBottom:function(){var e=this;1!==this.loading.type&&(this.loading.nextPages>this.loading.totalPages?this.loading.type=2:(this.loading.type=1,t.request({url:this.GLOBAL.serverSrc+"job/job/getjoblist",method:"POST",data:{page:this.loading.nextPages,type:this.categories[this.cateCurrentIndex].name,id:this.selectSchool.id},success:function(a){200===a.data.status?e.jobList=e.jobList.concat(a.data.jobList):t.showToast({title:a.data.msg,icon:"none"})},fail:function(t){e.GLOBAL.requestFail(t)},complete:function(){e.loading.type=0,e.loading.nextPages++}})))},methods:{getList:function(){var e=this;t.showLoading({title:"加载中..."}),t.request({url:this.GLOBAL.serverSrc+"job/job/getjoblist",method:"POST",data:{page:1,type:this.categories[this.cateCurrentIndex].name,id:this.selectSchool.id},success:function(a){200===a.data.status?(e.loading.totalPages=a.data.totalPages,e.jobList=a.data.jobList,0===e.cateCurrentIndex&&t.setStorage({key:"jobList",data:e.jobList})):t.showToast({title:a.data.msg,icon:"none"})},fail:function(t){e.GLOBAL.requestFail(t)},complete:function(){e.loading.nextPages=2,t.hideLoading()}})},tabChange:function(t){var e=t.currentTarget.dataset.index;this.cateCurrentIndex=e,this.getList()}}};e.default=o}).call(this,a("6e42")["default"])},7993:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("scroll-view",{staticClass:"grace-tab-title grace-center",attrs:{"scroll-x":"true",id:"grace-tab-title"}},t._l(t.categories,function(e,i){return a("view",{key:i,class:[t.cateCurrentIndex==i?"grace-tab-current":""],attrs:{"data-cateid":e.cateid,"data-index":i,eventid:"72c5eee7-0-"+i},on:{tap:t.tabChange}},[t._v(t._s(e.name))])})),a("view",{staticClass:"content"},t._l(t.jobList,function(e,i){return a("navigator",{key:i,staticClass:"parttime-card",attrs:{url:"./details?id="+e.id}},[a("view",{staticClass:"parttime-card-img"},[a("image",{staticClass:"parttime-card-imge",attrs:{src:e.img,mode:"scaleToFill"}})]),a("view",{staticClass:"text-one grace-ellipsis"},[t._v(t._s(e.jobtitle))]),a("view",{staticClass:"text-two"},[t._v(t._s(e.treatment))]),a("view",{staticClass:"text-three"},[t._v(t._s(e.site))]),a("view",{staticClass:"text-four"},[a("text",{staticStyle:{margin:"5rpx"}},[t._v(t._s(e.type))])]),a("view",{staticClass:"text-four"},[a("text",{staticStyle:{margin:"5rpx"}},[t._v(t._s(e.validtime))])])])})),a("graceLoading",{attrs:{loadingType:t.loading.type,loadingText:t.loading.text,show:t.loading.show,mpcomid:"72c5eee7-0"}})],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},"866e":function(t,e,a){"use strict";var i=a("dbb5"),n=a.n(i);n.a},b18d:function(t,e,a){"use strict";a("7f79");var i=s(a("b0ce")),n=s(a("becd"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(n.default))},becd:function(t,e,a){"use strict";a.r(e);var i=a("7993"),n=a("51b0");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("866e");var o=a("2877"),r=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},dbb5:function(t,e,a){}},[["b18d","common/runtime","common/vendor"]]]);