(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/confession/detail"],{"08bd":function(t,e,i){},4897:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.graceFullLoading?i("view",{staticClass:"grace-full-loading"},[i("view",[i("image",{attrs:{src:t.logoUrl,mode:"widthFix"}})])]):t._e()},a=[];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return a})},"4d3e":function(t,e,i){"use strict";i.r(e);var s=i("db49"),a=i.n(s);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);e["default"]=a.a},"57ec":function(t,e,i){"use strict";i.r(e);var s=i("4897"),a=i("7174");for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);i("ecc1");var c=i("2877"),o=Object(c["a"])(a["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports},7174:function(t,e,i){"use strict";i.r(e);var s=i("df06"),a=i.n(s);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);e["default"]=a.a},9874:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",[i("view",{staticClass:"grace-article-author-line",staticStyle:{"margin-top":"8px"}},[i("view",{staticClass:"grace-article-author"},[i("image",{attrs:{src:t.article.avatar,mode:"scaleToFill"}}),i("view",{staticClass:"author-name"},[t._v(t._s(t.article.user_name))])]),i("view",{staticClass:"btn",attrs:{eventid:"791d3cb5-0"},on:{click:function(e){t.guanzhu()}}},[t._v("+关注")])]),i("view",{staticClass:"grace-article-contents"},[i("block",[i("view",{staticClass:"text-item",staticStyle:{"line-height":"5px"}},[t._v(t._s(t.article.content))]),i("view",{staticClass:"grace-wrap grace-padding",attrs:{eventid:"791d3cb5-1"},on:{click:function(e){t.showImage()}}},t._l(t.article.images_list,function(t,e){return i("image",{key:e,staticStyle:{height:"300rpx",width:"48%",margin:"2px 1%"},attrs:{src:t,mode:"aspectFill"}})}))])],1),i("view",{staticClass:"grace-article-info-line",staticStyle:{"font-size":"50rpx",height:"60rpx"}},[i("view",{staticClass:"grace-iconfont icon-time"},[t._v(t._s(t.article.release_time))]),i("view",{staticClass:"iconfont icon-fire"},[t._v(t._s(t.article.reading_volume))]),1!==t.article.thumbs_up_status?i("view",{staticClass:"iconfont icon-heart",attrs:{eventid:"791d3cb5-3"},on:{click:t.thumbsUp}},[t._v(t._s(t.article.thumbs_up))]):i("view",{staticClass:"iconfont icon-heart1",attrs:{eventid:"791d3cb5-2"},on:{click:t.thumbsUp}},[t._v(t._s(t.article.thumbs_up))])]),t._m(0),t.commentAndReplyList.length>0?i("view",{staticClass:"grace-padding"},t._l(t.commentAndReplyList,function(e,s){return i("view",{key:s,staticClass:"grace-comment-list"},[i("view",{staticClass:"grace-comment-face",staticStyle:{width:"30px"}},[i("image",{staticStyle:{height:"30px"},attrs:{src:e.avatar}})]),i("view",{staticClass:"grace-comment-body"},[i("view",{staticClass:"grace-comment-top"},[i("text",[t._v(t._s(e.commentator_name))]),1!==e.thumbs_up_status?i("text",{staticClass:"grace-iconfont icon-zan",attrs:{eventid:"791d3cb5-5-"+s},on:{click:function(e){t.thumbsUpComment(s)}}},[t._v(t._s(e.thumbs_up))]):i("text",{staticClass:"iconfont icon-thumbs-up",attrs:{eventid:"791d3cb5-4-"+s},on:{click:function(e){t.thumbsUpComment(s)}}})]),i("view",{staticClass:"grace-comment-content",attrs:{eventid:"791d3cb5-6-"+s},on:{click:function(i){t.replyOne(e.commentator_name,e.commentator_id,e.comment_id)}}},[t._v(t._s(e.comment_content))]),i("view",{staticClass:"grace-comment-date"},[i("text",[t._v(t._s(e.comment_time))]),e.reply_list.length>0?i("text",{staticClass:"grace-comment-replay-btn",attrs:{eventid:"791d3cb5-7-"+s},on:{click:function(e){t.goComment()}}},[t._v(t._s(e.reply_list.length)+"回复")]):t._e()])])])})):t._e(),i("view",{staticClass:"grace-more-bottom"},[t.commentAndReplyList.length>0?i("navigator",{staticClass:"grace-border",attrs:{url:"../../common/comment?type=confession&articleId="+t.article.article_id}},[t._v(t._s(t.other)),i("text",{staticClass:"grace-iconfont icon-arrow-right"})]):i("view",{staticClass:"grace-border"},[t._v(t._s(t.other))])],1),i("view",{staticStyle:{height:"100rpx"}}),i("view",{staticClass:"grace-footer"},[i("view",{staticClass:"grace-input"},[i("view",{staticClass:"grace-input-icon grace-iconfont icon-write"}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticStyle:{padding:"5 0rpx"},attrs:{focus:t.focus,type:"text",placeholder:t.textPlaceholder,eventid:"791d3cb5-8"},domProps:{value:t.content},on:{blur:t.blur,input:function(e){e.target.composing||(t.content=e.target.value)}}})]),i("view",{staticClass:"grace-items",staticStyle:{padding:"0 20rpx"},attrs:{eventid:"791d3cb5-9"},on:{click:t.submit}},[t._v("发布")])]),i("graceFullLoading",{attrs:{graceFullLoading:t.graceFullLoading,logoUrl:"../../../static/index/love.png",mpcomid:"791d3cb5-0"}})],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"grace-title grace-border",staticStyle:{"margin-top":"60rpx"}},[i("view",{staticClass:"grace-h5 grace-blod"},[t._v("网友评论")])])}];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return a})},a6a9:function(t,e,i){"use strict";i.r(e);var s=i("9874"),a=i("4d3e");for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);var c=i("2877"),o=Object(c["a"])(a["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports},d92a:function(t,e,i){"use strict";i("7f79");var s=n(i("b0ce")),a=n(i("a6a9"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(a.default))},db49:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i("2f62"),a=n(i("57ec"));function n(t){return t&&t.__esModule?t:{default:t}}var c={components:{graceFullLoading:a.default},data:function(){return{articleId:0,graceFullLoading:!1,article:{},commentAndReplyList:[],other:"",textPlaceholder:"写评论",focus:!1,content:"",commentId:0,commentatorId:0}},computed:(0,s.mapState)(["user"]),onLoad:function(t){this.articleId=t.id,this.graceFullLoading=!0,this.getDetail()},onPullDownRefresh:function(){this.getDetail(),setTimeout(function(){t.stopPullDownRefresh()},2500)},methods:{getDetail:function(){var e=this;t.request({url:this.GLOBAL.serverSrc+"confession/article/getContent",method:"GET",data:{phone:this.user.phone,article_id:this.articleId},success:function(t){e.article=t.data.ArticleContent,e.commentAndReplyList=t.data.comment_list,e.other=t.data.other},fail:function(t){e.GLOBAL.requestFail(t)},complete:function(){e.graceFullLoading=!1}}),this.content=""},guanzhu:function(){},thumbsUpComment:function(e){var i=this;1!==this.commentList[e].thumbs_up_status?(this.commentList[e].thumbs_up_status=1,this.commentList[e].thumbs_up=this.commentList[e].thumbs_up+1):(this.commentList[e].thumbs_up_status=0,this.commentList[e].thumbs_up=this.commentList[e].thumbs_up-1),t.request({url:this.GLOBAL.serverSrc+"confession/article/addthumbsup",method:"POST",data:{phone:this.user.phone,token:this.user.token,comment_id:this.commentList[e].comment_id},success:function(t){410===t.status&&i.GLOBAL.tokenFail()}})},thumbsUp:function(){var e=this;console.log(this.article.thumbs_up_status),1!==this.article.thumbs_up_status?(this.article.thumbs_up=this.article.thumbs_up+1,this.article.thumbs_up_status=1):(this.article.thumbs_up=this.article.thumbs_up-1,this.article.thumbs_up_status=0),t.request({url:this.GLOBAL.serverSrc+"confession/article/addthumbsup",method:"POST",data:{phone:this.user.phone,token:this.user.token,article_id:this.articleId},success:function(t){410===t.status&&e.GLOBAL.tokenFail()}})},showImage:function(){t.previewImage({urls:this.article.images_list})},goComment:function(){t.navigateTo({url:"../../common/comment?type=confession&articleId="+this.article.article_id})},blur:function(){this.focus=!1},replyOne:function(t,e,i){this.commentatorId=e,this.commentId=i,this.textPlaceholder="@回复 "+t,this.focus=!0},submit:function(){var e=this;""!==this.content.trim()&&("写评论"===this.textPlaceholder?t.request({url:this.GLOBAL.serverSrc+"/confession/article/addcomment",method:"POST",data:{token:this.user.token,phone:this.user.phone,comment_content:this.content,article_id:this.articleId},success:function(i){200===i.data.status?e.getDetail():410===i.data.status?e.GLOBAL.tokenFail():t.showToast({title:i.data.msg,icon:"none"})},fail:function(t){e.GLOBAL.requestFail(t)}}):t.request({url:this.GLOBAL.serverSrc+"/confession/article/replyComment",method:"POST",data:{token:this.user.token,phone:this.user.phone,reply_content:this.content,comment_id:this.commentId,commentator_id:this.commentatorId},success:function(i){200===i.data.status?e.getDetail():410===i.data.status?e.GLOBAL.tokenFail():t.showToast({title:i.data.msg,icon:"none"})},fail:function(t){e.GLOBAL.requestFail(t)}}))}}};e.default=c}).call(this,i("6e42")["default"])},df06:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={name:"graceFullLoading",props:{graceFullLoading:{type:Boolean,default:!1},logoUrl:{type:String,default:""}}};e.default=s},ecc1:function(t,e,i){"use strict";var s=i("08bd"),a=i.n(s);a.a}},[["d92a","common/runtime","common/vendor"]]]);