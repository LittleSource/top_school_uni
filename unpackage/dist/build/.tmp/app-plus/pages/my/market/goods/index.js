(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/market/goods/index"],{"32b0":function(t,e,a){"use strict";a.r(e);var i=a("850b"),s=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e["default"]=s.a},"6b66":function(t,e,a){"use strict";var i=a("8499"),s=a.n(i);s.a},8499:function(t,e,a){},"850b":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a("2f62"),s=n(a("100f"));function n(t){return t&&t.__esModule?t:{default:t}}var o=null,c=100,r={components:{simpleDialog:s.default},data:function(){return{popmenuShowX:!0,currentCateIndex:1,leftTo:"cate1",productListTo:"productList1",mainCate:[],allProducts:{},marketId:0,goodsCount:0,deleteGoodsId:0}},computed:(0,i.mapState)(["user"]),onLoad:function(e){t.getSystemInfo({success:function(t){c=t.windowHeight}});var a=t.getStorageSync("market");a.isMarket&&(this.marketId=a.marketId),this.getAllProducts()},onNavigationBarButtonTap:function(){t.navigateTo({url:"./edit?type=add&market_id="+this.marketId})},methods:{getAllProducts:function(){var e=this;t.request({url:this.GLOBAL.serverSrc+"market/product/select",method:"GET",data:{token:this.user.token,market_id:this.marketId},success:function(a){200===a.data.status?(e.allProducts=a.data.allProduct,e.mainCate=a.data.mainCate):t.showToast({title:a.data.msg,icon:"none"})},fail:function(t){e.GLOBAL.requestFail(t)}})},showImg:function(e){var a=[e];t.previewImage({urls:a})},changCate:function(t){var e=t.currentTarget.dataset.cateid;this.currentCateIndex=e,this.leftTo="cate"+e,this.productListTo="productList"+e},rscroll:function(t){var e=t.detail.scrollTop;null!=o&&clearTimeout(o),o=setTimeout(function(){this.getIndex(0,e)}.bind(this),80)},getIndex:function(t,e){var a=this,i=wx.createSelectorQuery();i.select("#productList"+this.mainCate[t].cateid).boundingClientRect(),i.selectViewport().scrollOffset(),i.exec(function(i){i[0].top+c/2>0?(a.currentCateIndex=a.mainCate[t].cateid,a.leftTo="cate"+a.mainCate[t].cateid):(t++,t<a.mainCate.length&&a.getIndex(t,e))})},editGoods:function(e){var a=e.currentTarget.dataset.product;t.navigateTo({url:"./edit?type=edit&product_id="+a.id})},deleteGoods:function(t){this.goodsCount++;var e=t.currentTarget.dataset.product;this.deleteGoodsId=e.id,this.$refs.simpleDialog2.confirm({title:"提示",message:"确定删除"+e.title+"吗?"})},confirmButton:function(){var e=this;t.request({url:this.GLOBAL.serverSrc+"market/management/productdel",method:"POST",data:{user_id:this.user.id,phone:this.user.phone,token:this.user.token,id:this.deleteGoodsId},success:function(a){200===a.data.status?(t.showToast({title:"删除成功"}),e.getAllProducts()):t.showToast({title:a.data.msg,icon:"none"})},fail:function(t){e.GLOBAL.requestFail(t)}})},showmenuX:function(){this.popmenuShowX=!this.popmenuShowX}}};e.default=r}).call(this,a("6e42")["default"])},"944e":function(t,e,a){"use strict";a("7f79");var i=n(a("b0ce")),s=n(a("a075"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(s.default))},a075:function(t,e,a){"use strict";a.r(e);var i=a("f9a8"),s=a("32b0");for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);a("6b66");var o=a("2877"),c=Object(o["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},f9a8:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticStyle:{height:"100%"}},[a("view",{staticClass:"grace-cate",staticStyle:{width:"100%",height:"calc(100%)"}},[a("scroll-view",{staticClass:"grace-cate-left",attrs:{"scroll-y":"","scroll-into-view":t.leftTo}},t._l(t.mainCate,function(e,i){return a("view",{key:i,class:["item",t.currentCateIndex==e.cateid?"current":""],attrs:{"data-cateid":e.cateid,id:"cate"+e.cateid,eventid:"e8f50e3c-0-"+i},on:{tap:t.changCate}},[t._v(t._s(e.title))])})),a("scroll-view",{staticClass:"grace-cate-right",attrs:{"scroll-y":"","scroll-into-view":t.productListTo,eventid:"e8f50e3c-4"},on:{scroll:t.rscroll}},t._l(t.mainCate,function(e,i){return a("block",{key:i},[a("view",{staticClass:"grace-title grace-nowrap grace-space-between",staticStyle:{"margin-top":"15px"},attrs:{id:"productList"+e.cateid}},[a("view",{staticClass:"grace-h5 grace-blod"},[t._v(t._s(e.title))])]),a("view",{staticClass:"grace-news-list"},t._l(t.allProducts["cateproducts"+e.cateid],function(e,s){return a("view",{key:s,staticClass:"grace-news-list-items"},[a("image",{staticClass:"grace-news-list-img grace-list-imgs-l",attrs:{src:e.img,mode:"scaleToFill",eventid:"e8f50e3c-1-"+i+"-"+s},on:{click:function(a){t.showImg(e.img)}}}),a("view",{staticClass:"grace-news-list-title"},[a("view",{staticClass:"grace-news-list-title-main"},[t._v(t._s(e.title))]),a("view",{staticClass:"price"},[t._v("￥"+t._s(e.price))]),a("view",[a("view",{staticClass:"grace-iconfont icon-remove",attrs:{"data-product":e,eventid:"e8f50e3c-2-"+i+"-"+s},on:{tap:t.deleteGoods}}),a("view",{staticClass:"grace-iconfont icon-write",staticStyle:{color:"#6F6F6F"},attrs:{"data-product":e,eventid:"e8f50e3c-3-"+i+"-"+s},on:{tap:t.editGoods}})])])])}))])}))],1),a("simpleDialog",{ref:"simpleDialog2",attrs:{eventid:"e8f50e3c-5",mpcomid:"e8f50e3c-0"},on:{confirmButton:t.confirmButton}})],1)},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})}},[["944e","common/runtime","common/vendor"]]]);