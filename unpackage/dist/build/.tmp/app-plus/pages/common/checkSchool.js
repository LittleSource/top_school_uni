(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/common/checkSchool"],{"0998":function(t,e,o){"use strict";o.r(e);var n=o("986a"),i=o.n(n);for(var c in n)"default"!==c&&function(t){o.d(e,t,function(){return n[t]})}(c);e["default"]=i.a},"45fc":function(t,e,o){"use strict";o("859d");var n=c(o("b0ce")),i=c(o("5303"));function c(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},5303:function(t,e,o){"use strict";o.r(e);var n=o("81e7"),i=o("0998");for(var c in i)"default"!==c&&function(t){o.d(e,t,function(){return i[t]})}(c);var r=o("2877"),a=Object(r["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=a.exports},"81e7":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("view",[0===t.schoolList.length?o("view",{staticClass:"grace-center",staticStyle:{"font-size":"32rpx",color:"#2F2F2F"}},[t._v("当前学校:"+t._s(t.nowSchool.title))]):t._e(),t.schoolList.length>0?o("view",{staticClass:"grace-list"},t._l(t.schoolList,function(e,n){return o("view",{key:n,staticClass:"items",attrs:{eventid:"691dc3db-0-"+n},on:{click:function(e){t.setSchool(t.schoolList[n])}}},[o("view",{staticClass:"title"},[t._v(t._s(e.title))]),o("view",{staticClass:"arrow-right"})])})):t._e(),o("simpleDialog",{ref:"simpleDialog2",attrs:{eventid:"691dc3db-1",mpcomid:"691dc3db-0"},on:{confirmButton:t.confirmButton}})],1)},i=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return i})},"986a":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o("2f62"),i=r(o("eab9")),c=r(o("1d8d"));function r(t){return t&&t.__esModule?t:{default:t}}function a(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},n=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(o).filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable}))),n.forEach(function(e){l(t,e,o[e])})}return t}function l(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var s=new c.default({key:"7YDBZ-4ATCD-5GM4Z-HCI5B-4ECM6-PPBXO"}),u={components:{simpleDialog:i.default},data:function(){return{schoolList:[],nowSchool:{}}},computed:(0,n.mapState)(["selectSchool"]),onLoad:function(){this.nowSchool=this.selectSchool},onNavigationBarSearchInputChanged:function(t){if(""!==t.text){var e=this;s.getSuggestion({keyword:t.text,filter:"category=大学,中学",success:function(t){for(var o=[],n=0;n<t.data.length;n++)o.push({id:t.data[n].id,title:t.data[n].title,addr:t.data[n].address});e.schoolList=o},fail:function(t){console.error(JSON.stringify(t))}})}else this.schoolList=[]},methods:a({},(0,n.mapMutations)(["checkSchool"]),{setSchool:function(e){this.nowSchool=e,this.$refs.simpleDialog2.confirm({title:"提示",message:"确定切换到"+e.title+"吗？ 学校位置:"+e.addr}),t.request({url:this.GLOBAL.serverSrc+"common/school/getSchool",method:"POST",data:{id:e.id,title:e.title,addr:e.addr}})},confirmButton:function(){this.checkSchool(this.nowSchool),t.switchTab({url:"/pages/index/index"})}})};e.default=u}).call(this,o("649d")["default"])}},[["45fc","common/runtime","common/vendor"]]]);