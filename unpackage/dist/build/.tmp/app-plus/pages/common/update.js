(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/common/update"],{"32a0":function(t,s,e){"use strict";var a=e("c362"),n=e.n(a);n.a},"4ec0":function(t,s,e){"use strict";e("7f79");var a=i(e("b0ce")),n=i(e("90e7"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(n.default))},"5d4d":function(t,s,e){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var e={data:function(){return{info:"正在加载",Minfo:"未知",Mtip:"",updateInfo:"无",latest:null,packgeSize:null,packgePath:null,downloadTask:null,downloadProgress:0,buttonLoading:!1,installed:!1,startProgress:!1,currentIsLatest:!0}},onReady:function(){this.getLatest();var s=t.getStorageSync("updated");s&&(this.packgePath=s.packgePath)},onShow:function(){!0===this.installed&&this.packgePath&&(this.installed=!1,this.haveDownloaded())},onUnload:function(){this.downloadTask&&(this.closeTask(),this.showToast("更新被取消"))},onPullDownRefresh:function(){this.getLatest(),t.stopPullDownRefresh()},methods:{showToast:function(s){t.showToast({title:s,duration:3e3,icon:"none"})},haveDownloaded:function(){var s=this;t.showModal({title:"更新尚未完成",content:"您已下载更新包，但是还没有完成安装，请问是否要继续安装更新包呢？",success:function(t){t.confirm?(plus.runtime.install(s.packgePath,{force:!0}),s.installed=!0):t.cancel&&s.showToast("更新被取消")}})},getLatest:function(){var s=this;this.info="正在加载",this.Minfo="未知",this.updateInfo="无",this.buttonLoading=!0,this.latest=null,t.request({url:this.GLOBAL.serverSrc+"common/check_update/update",method:"GET",success:function(t){200===t.statusCode&&(s.latest=t.data,s.buttonLoading=!1,s.checkLatest())}})},checkLatest:function(){this.latest.version?plus.runtime.version!=this.latest.version?(this.currentIsLatest=!1,this.Mtip="发现新版本",this.info=this.latest.name+" "+this.latest.version,this.updateInfo=this.latest.info,this.packgeSize=(this.latest.packgeSize/1048576).toFixed(2)+"MB",this.setMinfo(this.latest.type)):(this.showToast("当前是最新版了"),this.currentIsLatest=!0,this.Mtip="当前是最新版",this.info=this.latest.name+" "+this.latest.version,this.updateInfo=this.latest.info,this.setMinfo(this.latest.type)):this.Mtip="未找到发行版本"},setMinfo:function(t){switch(t){case"base":this.Minfo="结构版";break;case"alpha":this.Minfo="内测版";break;case"beta":this.Minfo="公测版";break;case"rc":this.Minfo="终测版";break;case"release":this.Minfo="正式版";break;default:this.Minfo="未知"}},closeTask:function(){this.downloadTask.abort(),this.downloadTask=null,this.startProgress=!1},createTask:function(){var s=this;this.packgePath?this.haveDownloaded():(this.downloadProgress=0,this.startProgress=!0,this.downloadTask=t.downloadFile({url:this.latest.downloadLink,success:function(e){200===e.statusCode&&t.saveFile({tempFilePath:e.tempFilePath,success:function(e){s.packgePath=e.savedFilePath,plus.runtime.install(s.packgePath,{force:!0}),s.installed=!0,t.setStorage({key:"updated",data:{completed:!0,packgePath:s.packgePath},success:function(t){console.log("成功保存更新记录")}}),s.closeTask()}})}}),this.downloadTask.onProgressUpdate(function(t){s.downloadProgress=t.progress}))},handleUpdate:function(){"android"===plus.os.name.toLowerCase()?this.latest.downloadLink&&"#"!==this.latest.downloadLink?this.createTask():this.showToast("未找到下载地址"):this.latest.iosLink&&"#"!==this.latest.iosLink?plus.runtime.openURL(this.latest.iosLink):this.showToast("未找到ios商店地址")}}};s.default=e}).call(this,e("6e42")["default"])},"606e":function(t,s,e){"use strict";e.r(s);var a=e("5d4d"),n=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(s,t,function(){return a[t]})}(i);s["default"]=n.a},"90e7":function(t,s,e){"use strict";e.r(s);var a=e("f9e9"),n=e("606e");for(var i in n)"default"!==i&&function(t){e.d(s,t,function(){return n[t]})}(i);e("32a0");var o=e("2877"),c=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,null,null);s["default"]=c.exports},c362:function(t,s,e){},f9e9:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{staticClass:"flex-column"},[e("view",{staticClass:"content"},[e("image",{staticClass:"logo",attrs:{src:"../../static/logo.png"}}),e("view",{staticClass:"mainInfo"},[e("text",{staticClass:"title"},[t._v(t._s(t.info)+" | "+t._s(t.Minfo))]),e("text",{staticClass:"tip"},[t._v("\\n"+t._s(t.Mtip))])]),e("text",{staticClass:"line"})]),e("view",[t._m(0),e("view",{staticClass:"infoContent"},[e("text",{staticClass:"updateInfo"},[t._v(t._s(t.updateInfo))])])]),t.currentIsLatest?t._e():e("view",[t._m(1),e("view",{staticClass:"infoContent"},[e("text",{staticClass:"updateInfo"},[t._v(t._s(t.packgeSize))])])]),e("view",{staticClass:"minorContent bottom_aera"},[t.startProgress&&!t.currentIsLatest?e("view",{staticClass:"smallTitle"},[e("text",[t._v("下载进度:"+t._s(t.downloadProgress)+"%")]),e("progress",{attrs:{percent:t.downloadProgress,"stroke-width":"4"}})],1):t._e(),t.startProgress||t.currentIsLatest?t._e():e("button",{staticStyle:{"background-color":"#fc4243"},attrs:{type:"primary",eventid:"76003286-0"},on:{click:function(s){t.handleUpdate()}}},[t._v("立即更新")]),t.currentIsLatest?e("button",{staticStyle:{"background-color":"#fc4243"},attrs:{loading:t.buttonLoading,type:"primary",eventid:"76003286-1"},on:{click:function(s){t.getLatest()}}},[t._v("检查更新")]):t._e()],1)])},n=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{staticClass:"infoContentTitle"},[e("text",{staticClass:"infoPic iconfont icon-info-circle"}),e("text",{staticClass:"infoTitle"},[t._v("更新摘要")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{staticClass:"infoContentTitle"},[e("text",{staticClass:"infoPic iconfont icon-tags"}),e("text",{staticClass:"infoTitle"},[t._v("更新大小")])])}];e.d(s,"a",function(){return a}),e.d(s,"b",function(){return n})}},[["4ec0","common/runtime","common/vendor"]]]);