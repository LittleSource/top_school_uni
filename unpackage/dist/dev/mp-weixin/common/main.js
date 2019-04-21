(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\App.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/schoolJiangHu/App.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vuex = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =



{
  computed: (0, _vuex.mapState)(['msgList']),
  methods: _objectSpread({},
  (0, _vuex.mapMutations)(['appOnLunch', 'addMsg', 'onMessage'])),

  onLaunch: function onLaunch() {
    var user = uni.getStorageSync('user');
    if (user.hasLogin === true) {
      this.appOnLunch(user);
      uni.connectSocket({
        url: this.GLOBAL.serverChat });

      this.onMessage();
    }














  },
  onShow: function onShow() {
    // 			uni.showModal({
    // 				title: '提示',
    // 				content: '此版本为源梦团队内部测试版本，未经允许禁止发布到互联网！www.ym998.cn',
    // 				showCancel: false
    // 			});
  },
  onHide: function onHide() {
    uni.connectSocket({
      url: this.GLOBAL.serverChat });

    this.onMessage();
    uni.request({
      url: this.GLOBAL.serverSrc + 'message/top_chat/recordlist',
      method: 'POST',
      data: {
        'msgList': this.msgList } });


    console.log('App Hide');
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\global.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/schoolJiangHu/global.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;





//全局配置文件
var serverChat = 'ws://118.24.124.19:8282';
var serverSrc = 'https://apii.ym998.cn/'; //https://apii.ym998.cn/
var _default = {
  serverSrc: serverSrc, //服务器地址
  serverChat: serverChat,
  requestFail: function requestFail(e) {
    if (e.statusCode === 0) {
      uni.showToast({
        title: '网络错误, 请确保设备处在联网状态',
        icon: 'none' });

    } else {
      uni.showToast({
        title: '发生网络错误啦！错误码：' + e.statusCode,
        icon: 'none' });

    }
  },
  tokenFail: function tokenFail() {
    uni.showToast({
      title: '身份验证失效，请重新登录！',
      icon: "none" });

    uni.removeStorage({
      key: 'user' });

    uni.removeStorage({
      key: 'market' });

    uni.redirectTo({
      url: '/pages/login/login' });

  },
  checkUpdater: function checkUpdater(currentId, updaterPage) {
    uni.request({
      url: serverSrc + 'common/check_update/update',
      method: 'GET',
      success: function success(res) {
        if (res.statusCode === 200) {
          if (currentId != res.data.version) {//检测到更新
            uni.showModal({
              title: '发现新版本',
              content: '有新版本可用，请问您是否更新？',
              success: function success(res) {
                if (res.confirm) {
                  uni.navigateTo({
                    url: updaterPage });

                }
              } });

          }
        }
      } });

  },
  playMessage: function playMessage() {
    var innerAudioContext = uni.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    innerAudioContext.src = this.serverSrc + 'static/music/message.mp3';
    innerAudioContext.onPlay(function () {

    });
    innerAudioContext.onError(function (res) {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\App.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/schoolJiangHu/App.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\global.vue?vue&type=template&id=00533818&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/schoolJiangHu/global.vue?vue&type=template&id=00533818& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\App.vue":
/*!************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/App.vue ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\App.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\App.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns





/* normalize component */

var component = Object(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "C:/Users/Administrator/Desktop/schoolJiangHu/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\App.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\App.vue?vue&type=script&lang=js&");
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\App.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/App.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\App.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\global.vue":
/*!***************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/global.vue ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global_vue_vue_type_template_id_00533818___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.vue?vue&type=template&id=00533818& */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\global.vue?vue&type=template&id=00533818&");
/* harmony import */ var _global_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.vue?vue&type=script&lang=js& */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\global.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _global_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _global_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _global_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _global_vue_vue_type_template_id_00533818___WEBPACK_IMPORTED_MODULE_0__["render"],
  _global_vue_vue_type_template_id_00533818___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "C:/Users/Administrator/Desktop/schoolJiangHu/global.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\global.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/global.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./global.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\global.vue?vue&type=script&lang=js&");
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\global.vue?vue&type=template&id=00533818&":
/*!**********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/global.vue?vue&type=template&id=00533818& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_template_id_00533818___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./global.vue?vue&type=template&id=00533818& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\global.vue?vue&type=template&id=00533818&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_template_id_00533818___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_template_id_00533818___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\main.js":
/*!************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/main.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages.json");
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue/index.js"));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\App.vue"));
var _global = _interopRequireDefault(__webpack_require__(/*! ./global */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\global.vue"));
var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\store\\index.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //引用vuex配置文件

_vue.default.config.productionTip = false;
//全局变量文件挂载到Vue实例上面
_vue.default.prototype.GLOBAL = _global.default;
//vuex挂载到Vue实例上面
_vue.default.prototype.$store = _store.default;
_App.default.mpType = 'app';
var app = new _vue.default(_objectSpread({
  store: _store.default },
_App.default));

app.$mount();

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\store\\index.js":
/*!*******************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/store/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue/index.js"));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js"));
var _global = _interopRequireDefault(__webpack_require__(/*! ../global */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\global.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //引用全局变量文件
_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    user: {
      hasLogin: false, //是否登录
      id: 0,
      openId: '',
      type: -1, //第三方登录类型
      token: '', //token
      phone: '', //手机号
      avatar: '', //头像
      password: '', //密码
      userName: '', //昵称
      sex: 0, //性别
      merchant: 0 //是否商家
    },
    addressInfo: { //地址信息
      name: null,
      phone: null,
      city: null,
      adress: null },

    school: {
      id: '11853391869743621792',
      title: '',
      addr: '' },

    selectSchool: {
      id: '11853391869743621792',
      title: '',
      addr: '' },

    msgList: [{
      id: 69,
      to_id: 67,
      avatar: '../../../static/logo.png',
      name: "to源哥",
      msg: '你是肥蛇吗？',
      status: "未读",
      unread: 1 },
    {
      id: 67,
      to_id: 69,
      avatar: '../../../static/logo.png',
      name: "to蛇皮",
      msg: '源哥最帅',
      status: "未读",
      unread: 1 },

    {
      id: 111,
      to_id: 70,
      avatar: '../../../static/logo.png',
      name: "狸猫",
      msg: '怎么说呢',
      status: "未读",
      unread: 1 }],


    unreadCount: 3,
    historyMsg: {
      67: [{
        id: 100,
        name: "历史",
        face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png",
        ctype: 1,
        msg: "历史消息演示文本内容...",
        date: '2018 01-01 00:00' },
      {
        id: 100,
        name: "历史",
        face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png",
        ctype: 1,
        msg: "源哥最帅",
        date: '2018 01-01 00:00' }],

      189: [{
        id: 100,
        name: "to蛇皮",
        face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png",
        ctype: 1,
        msg: "历史消息演示文本内容...",
        date: '2018 01-01 00:00' }],

      70: [{
        id: 100,
        name: "to蛇皮",
        face: "https://staticimgs.oss-cn-beijing.aliyuncs.com/glogo.png",
        ctype: 1,
        msg: "怎么说呢",
        date: '2018 01-01 00:00' }] } },



  mutations: {
    regSetPhoneAndPass: function regSetPhoneAndPass(state, payload) {
      state.user.phone = payload.phone;
      state.user.password = payload.password;
    },
    regSetSex: function regSetSex(state, sex) {
      state.user.sex = sex;
    },
    regSetSchool: function regSetSchool(state, school) {
      state.school = school;
      state.selectSchool = school;
    },
    regSetAvatar: function regSetAvatar(state, avatar) {
      state.user.avatar = avatar;
    },
    regSetUserName: function regSetUserName(state, userName) {
      state.user.userName = userName;
    },
    regAfterLogin: function regAfterLogin(state, payload) {
      state.user.id = payload.user.user_id;
      state.user.phone = payload.user.phone;
      state.user.sex = payload.user.sex;
      state.user.userName = payload.user.user_name;
      state.user.avatar = payload.user.avatar;

      state.user.openId = payload.user.openId;
      state.user.token = payload.token;

      state.user.password = ''; //为了安全置空密码
      state.user.hasLogin = true;
      this.commit('loginAfterSetStorage');
    },
    login: function login(state, payload) {
      state.user.id = payload.user.user_id;
      state.user.phone = payload.user.phone;
      state.user.sex = payload.user.sex;
      state.user.userName = payload.user.user_name;
      state.user.avatar = payload.user.avatar;
      state.user.merchant = payload.user.merchant;
      state.user.openId = payload.user.openId;
      state.user.token = payload.token;

      state.school = payload.school;
      state.selectSchool = state.school; //登陆后选择的学校默认是自己的学校

      state.addressInfo = payload.addressInfo; //同步地址信息
      state.user.hasLogin = true;
      this.commit('loginAfterSetStorage');
    },
    logOut: function logOut(state) {
      state.hasLogin = false;
      uni.clearStorage();
    },
    loginAfterSetStorage: function loginAfterSetStorage(state) {
      uni.setStorage({
        key: 'user',
        data: state.user });

      uni.setStorage({
        key: 'school',
        data: state.school });

      uni.setStorage({
        key: 'selectSchool',
        data: state.selectSchool });

      uni.setStorage({
        key: 'addressInfo',
        data: state.addressInfo });

    },
    setOpenId: function setOpenId(state, playload) {
      state.user.openId = playload.openId;
      state.user.type = playload.type;
    },
    checkSchool: function checkSchool(state, payload) {
      state.selectSchool = payload;
      uni.setStorage({
        key: 'selectSchool',
        data: payload,
        fail: function fail() {
          uni.showModal({
            title: '提示',
            content: '学校切换失败！',
            showCancel: false });

        } });

    },
    changeAddressInfo: function changeAddressInfo(state, addressInfo) {
      state.addressInfo = addressInfo;
      uni.setStorage({
        key: 'addressInfo',
        data: state.addressInfo });

    },
    appOnLunch: function appOnLunch(state, user) {
      state.user = user;
      state.school = uni.getStorageSync('school');
      state.selectSchool = uni.getStorageSync('selectSchool');
      state.addressInfo = uni.getStorageSync('addressInfo');
      uni.setTabBarBadge({
        index: 2,
        text: state.unreadCount.toString() });

      //暂时注释掉  个人详情开发完毕再搞
      //state.msgList = uni.getStorageSync('msgList');
      //state.historyMsg = uni.getStorageSync('historyMsg');
    },
    onMessage: function onMessage(state) {
      var _self = this;
      uni.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！');
        var initDate = {
          ctype: 'init',
          id: state.user.id };

        uni.sendSocketMessage({
          data: JSON.stringify(initDate) });

        uni.onSocketMessage(function (res) {
          _global.default.playMessage(); //播放通知音乐
          var newMsg = JSON.parse(res.data); //消息json转换为对象
          console.log(JSON.stringify(newMsg));
          var payload = new Object(); //准备载荷
          payload.newMsg = newMsg;
          //准备消息列表的消息文本
          var msgListText = '';
          switch (newMsg.ctype) {//根据newMsg.ctype转换为正确的消息列表的消息文本
            case 2:
              msgListText = '[图片]';
              break;
            case 3:
              msgListText = '[语音]';
              break;
            case 4:
              msgListText = '[系统通知]';
              break;
            default:
              msgListText = newMsg.msg;}

          //准备消息列表对象
          payload.msgObj = {
            id: state.user.id,
            to_id: newMsg.id,
            avatar: newMsg.face,
            name: newMsg.name,
            msg: msgListText,
            status: "未读",
            unread: 1 };

          _self.commit('addMsg', payload); //提交载荷到addMsg处理
        });
      });
    },
    addMsg: function addMsg(state, payload) {
      var hasMsg = false; //检测消息列表是否有相同的人
      for (var i = 0; i < state.msgList.length; i++) {
        if (state.msgList[i].to_id === payload.msgObj.to_id) {
          hasMsg = true;
          break;
        }
      }
      if (hasMsg) {
        state.historyMsg[payload.newMsg.id].push(payload.newMsg); //将消息放在历史记录
        state.msgList[i].msg = payload.msgObj.msg; //更新消息列表消息内容
        state.msgList[i].unread += 1; //未读数量+1
      } else {
        state.historyMsg[payload.newMsg.to_id] = []; //新建历史记录数组 索引为对方id
        state.historyMsg[payload.newMsg.to_id].push(payload.newMsg); //将此信息添加进刚新建的历史记录
        state.msgList.unshift(payload.msgObj); //将消息列表对象添加进消息列表，并且置顶
        console.log(JSON.stringify(state.historyMsg));
      }
      uni.setTabBarBadge({
        index: 2,
        text: state.unreadCount.toString() });


      this.commit('setMsgStorage');
    },
    sendMsg: function sendMsg(state, newMsg) {
      uni.sendSocketMessage({
        data: JSON.stringify(newMsg) });

      var hasMsg = false; //消息列表是否有相同的人
      for (var i = 0; i < state.msgList.length; i++) {
        if (state.msgList[i].to_id == newMsg.to_id) {
          hasMsg = true;
          break;
        }
      }
      //准备消息列表的消息文本
      var msgListText = '';
      switch (newMsg.ctype) {//根据newMsg.ctype转换为正确的消息列表的消息文本
        case 2:
          msgListText = '[图片]';
          break;
        case 3:
          msgListText = '[语音]';
          break;
        case 4:
          msgListText = '[系统通知]';
          break;
        default:
          msgListText = newMsg.msg;}

      if (hasMsg) {
        state.historyMsg[newMsg.to_id].push(newMsg); //添加历史记录
        state.msgList[i].msg = msgListText; //更新消息列表消息文本
      } else {
        //创建消息列表对象
        var msgListObj = {
          id: state.user.id,
          to_id: newMsg.id,
          avatar: newMsg.face,
          name: newMsg.name,
          msg: msgListText,
          status: "已读",
          unread: 0 };

        state.historyMsg[newMsg.to_id] = []; //创建聊天历史记录数组
        state.historyMsg[newMsg.to_id].push(newMsg); //添加此条消息到历史记录
        state.msgList.unshift(msgListObj); //将消息列表对象添加进消息列表，并且置顶
      }
      this.commit('setMsgStorage');
    },
    changeMsg: function changeMsg(state, index) {
      //设置tabbar的小红点
      state.unreadCount -= state.msgList[index].unread;
      if (state.unreadCount !== 0) {
        uni.setTabBarBadge({
          index: 2,
          text: state.unreadCount.toString() });

      } else {
        uni.removeTabBarBadge({
          index: 2 });

      }

      state.msgList[index].unread = 0;
      state.msgList[index].status = "已读";
      this.commit('setMsgStorage');
    },
    delMsg: function delMsg(state, index) {
      state.msgList.splice(index, 1);
      this.commit('setMsgStorage');
    },
    setMsgStorage: function setMsgStorage(state) {//本地缓存消息列表和消息历史记录
      uni.setStorage({
        key: 'msgList',
        data: state.msgList });

      uni.setStorage({
        key: 'historyMsg',
        data: state.historyMsg });

    } } });var _default =



store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ })

},[["C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\main.js","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map