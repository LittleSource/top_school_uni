(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/common/search"],{1172:function(t,e,o){"use strict";o.r(e);var s=o("3816"),i=o("2f63");for(var r in i)"default"!==r&&function(t){o.d(e,t,function(){return i[t]})}(r);o("1f67");var a=o("2877"),n=Object(a["a"])(i["default"],s["a"],s["b"],!1,null,null,null);e["default"]=n.exports},"1f67":function(t,e,o){"use strict";var s=o("d112"),i=o.n(s);i.a},"2f63":function(t,e,o){"use strict";o.r(e);var s=o("d36b"),i=o.n(s);for(var r in s)"default"!==r&&function(t){o.d(e,t,function(){return s[t]})}(r);e["default"]=i.a},3816:function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("view",[t._m(0),o("view",{staticClass:"content"},[o("view",{staticClass:"search-box"},[o("view",{staticClass:"input-box"},[o("view",{staticClass:"grace-iconfont icon-arrow-left",attrs:{eventid:"04015d09-0"},on:{click:function(e){t.back()}}}),o("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],attrs:{focus:"",type:"text",placeholder:t.hotKeywordList[0],"placeholder-class":"placeholder-class","confirm-type":"search",eventid:"04015d09-1"},domProps:{value:t.keyword},on:{input:[function(e){e.target.composing||(t.keyword=e.target.value)},t.inputChange],confirm:function(e){t.doSearch(!1)}}})]),o("view",{staticClass:"search-btn",attrs:{eventid:"04015d09-2"},on:{tap:function(e){t.doSearch(!1)}}},[t._v("搜索")])]),o("view",{staticClass:"search-keyword",attrs:{eventid:"04015d09-9"},on:{touchstart:t.blur}},[o("scroll-view",{directives:[{name:"show",rawName:"v-show",value:t.isShowKeywordList,expression:"isShowKeywordList"}],staticClass:"keyword-list-box",attrs:{"scroll-y":""}},t._l(t.keywordList,function(e,s){return o("view",{key:e.keyword,staticClass:"keyword-entry",attrs:{"hover-class":"keyword-entry-tap"}},[o("view",{staticClass:"keyword-text",attrs:{eventid:"04015d09-3-"+s},on:{tap:function(o){t.doSearch(e.keyword)}}},[o("rich-text",{attrs:{nodes:e.htmlStr,mpcomid:"04015d09-0-"+s}})],1),o("view",{staticClass:"keyword-img",attrs:{eventid:"04015d09-4-"+s},on:{tap:function(o){t.setkeyword(e)}}},[o("image",{attrs:{src:"../../static/search/back.png"}})])])})),o("scroll-view",{directives:[{name:"show",rawName:"v-show",value:!t.isShowKeywordList,expression:"!isShowKeywordList"}],staticClass:"keyword-box",attrs:{"scroll-y":""}},[t.oldKeywordList.length>0?o("view",{staticClass:"keyword-block"},[o("view",{staticClass:"keyword-list-header"},[o("view",[t._v("历史搜索")]),o("view",[o("image",{attrs:{src:"../../static/search/delete.png",eventid:"04015d09-5"},on:{tap:t.oldDelete}})])]),o("view",{staticClass:"keyword"},t._l(t.oldKeywordList,function(e,s){return o("view",{key:e,attrs:{eventid:"04015d09-6-"+s},on:{tap:function(o){t.doSearch(e)}}},[t._v(t._s(e))])}))]):t._e(),o("view",{staticClass:"keyword-block"},[o("view",{staticClass:"keyword-list-header"},[o("view",[t._v("热门搜索")]),o("view",[o("image",{attrs:{src:"../../static/search/attention"+t.forbid+".png",eventid:"04015d09-7"},on:{tap:t.hotToggle}})])]),""==t.forbid?o("view",{staticClass:"keyword"},t._l(t.hotKeywordList,function(e,s){return o("view",{key:e,attrs:{eventid:"04015d09-8-"+s},on:{tap:function(o){t.doSearch(e)}}},[t._v(t._s(e))])})):o("view",{staticClass:"hide-hot-tis"},[o("view",[t._v("当前搜热门搜索已隐藏")])])])])],1)])])},i=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("view",{staticClass:"header"},[o("view",{staticClass:"status-bar"})])}];o.d(e,"a",function(){return s}),o.d(e,"b",function(){return i})},ad48:function(t,e,o){"use strict";o("859d");var s=r(o("b0ce")),i=r(o("1172"));function r(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))},d112:function(t,e,o){},d36b:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{keyword:"",oldKeywordList:[],hotKeywordList:[],keywordList:[],forbid:"",isShowKeywordList:!1}},onLoad:function(){this.init()},methods:{back:function(){t.navigateBack()},init:function(){this.loadOldKeyword(),this.loadHotKeyword()},blur:function(){t.hideKeyboard()},loadOldKeyword:function(){var e=this;t.getStorage({key:"OldKeys",success:function(t){var o=JSON.parse(t.data);e.oldKeywordList=o}})},loadHotKeyword:function(){this.hotKeywordList=["键盘","鼠标","显示器","电脑主机","蓝牙音箱","笔记本电脑","鼠标垫","USB","USB3.0"]},inputChange:function(e){var o=this,s=e.detail?e.detail.value:e;if(!s)return this.keywordList=[],void(this.isShowKeywordList=!1);this.isShowKeywordList=!0,t.request({url:"https://suggest.taobao.com/sug?code=utf-8&q="+s,success:function(t){o.keywordList=o.drawCorrelativeKeyword(t.data.result,s)}})},drawCorrelativeKeyword:function(t,e){for(var o=t.length,s=[],i=0;i<o;i++){var r=t[i],a=r[0].replace(e,"<span style='color: #9f9f9f;'>"+e+"</span>");a="<div>"+a+"</div>";var n={keyword:r[0],htmlStr:a};s.push(n)}return s},setkeyword:function(t){this.keyword=t.keyword},oldDelete:function(){var e=this;t.showModal({content:"确定清除历史搜索记录？",success:function(o){o.confirm?(console.log("用户点击确定"),e.oldKeywordList=[],t.removeStorage({key:"OldKeys"})):o.cancel&&console.log("用户点击取消")}})},hotToggle:function(){this.forbid=this.forbid?"":"_forbid"},doSearch:function(e){e=e||(this.keyword?this.keyword:this.defaultKeyword),this.keyword=e,this.saveKeyword(e),t.showToast({title:e,icon:"none",duration:2e3}),plus.runtime.openURL(encodeURI("taobao://s.taobao.com/search?q="+e))},saveKeyword:function(e){var o=this;t.getStorage({key:"OldKeys",success:function(s){console.log(s.data);var i=JSON.parse(s.data),r=i.indexOf(e);-1==r?i.unshift(e):(i.splice(r,1),i.unshift(e)),i.length>10&&i.pop(),t.setStorage({key:"OldKeys",data:JSON.stringify(i)}),o.oldKeywordList=i},fail:function(s){var i=[e];t.setStorage({key:"OldKeys",data:JSON.stringify(i)}),o.oldKeywordList=i}})}}};e.default=o}).call(this,o("649d")["default"])}},[["ad48","common/runtime","common/vendor"]]]);