(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/parttime/details"],{"154d":function(t,a,i){"use strict";var s=i("d7d7"),e=i.n(s);e.a},"15b6":function(t,a,i){"use strict";i("7f79");var s=n(i("b0ce")),e=n(i("653a"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(e.default))},"653a":function(t,a,i){"use strict";i.r(a);var s=i("99d8"),e=i("fb6a");for(var n in e)"default"!==n&&function(t){i.d(a,t,function(){return e[t]})}(n);i("154d");var o=i("2877"),c=Object(o["a"])(e["default"],s["a"],s["b"],!1,null,null,null);a["default"]=c.exports},"99d8":function(t,a,i){"use strict";var s=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("view",[i("view",{staticClass:"img",staticStyle:{"background-image":"url('../../../static/parttime/hand.jpg')",opacity:"1"}},[i("view",{staticClass:"img-first"},[i("p",[t._v(t._s(t.job.jobtitle))])],1),i("view",{staticClass:"img-two"},[i("p",[t._v(t._s(t.job.treatment))])],1),i("view",{staticClass:"img-three"},[i("p",[t._v(t._s(t.job.county)+" | "+t._s(t.job.site))])],1)]),i("view",{staticClass:"claim"},[i("p",[t._v("招聘要求")]),i("view",{staticClass:"day"},[t._v(t._s(t.job.type))]),i("view",{staticClass:"nine"},[t._v("招九百人")]),i("view",{staticClass:"man"},[t._v("男女不限")])],1),i("view",{staticClass:"gray"}),i("view",{staticClass:"details"},[i("view",{staticClass:"work-title"},[t._v("工作福利")]),i("p",[t._v("·包吃")]),i("p",[t._v("·包住")]),i("p",[t._v("·交通补贴")]),i("p",[t._v("·有提成")]),i("p",[t._v("·免费培训")])],1),i("view",{staticClass:"gray"}),i("view",{staticClass:"details"},[i("view",{staticClass:"work-title"},[t._v("职位详情")]),i("p",[t._v(t._s(t.job.content))])],1),i("view",{staticClass:"gray"}),i("view",{staticClass:"details"},[i("view",{staticClass:"work-title"},[t._v("工作时间")]),i("p",[t._v("发布时间："+t._s(t.job.addtime))]),i("p",[t._v("报到时间：2019年-04-25")])],1)])},e=[];i.d(a,"a",function(){return s}),i.d(a,"b",function(){return e})},a049:function(t,a,i){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={data:function(){return{jobId:0,job:{}}},onLoad:function(a){var i=this;this.jobId=a.id,t.showLoading({title:"加载中..."}),t.request({url:this.GLOBAL.serverSrc+"/job/job/getjob",method:"POST",data:{id:this.jobId},success:function(a){200===a.data.status?i.job=a.data.job[0]:t.showToast({title:a.data.msg,icon:"none"})},fail:function(t){i.GLOBAL.requestFail(t)},complete:function(){t.hideLoading()}})}};a.default=i}).call(this,i("6e42")["default"])},d7d7:function(t,a,i){},fb6a:function(t,a,i){"use strict";i.r(a);var s=i("a049"),e=i.n(s);for(var n in s)"default"!==n&&function(t){i.d(a,t,function(){return s[t]})}(n);a["default"]=e.a}},[["15b6","common/runtime","common/vendor"]]]);