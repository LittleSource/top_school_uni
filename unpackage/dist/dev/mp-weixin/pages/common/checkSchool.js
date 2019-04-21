(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/common/checkSchool"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\checkSchool.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/checkSchool.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _vuex = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");



var _dialog = _interopRequireDefault(__webpack_require__(/*! ../../components/dialog.vue */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\components\\dialog.vue"));
var _qqmapWxJssdkMin = _interopRequireDefault(__webpack_require__(/*! ../../common/qqmap-wx-jssdk.min.js */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\common\\qqmap-wx-jssdk.min.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var qqmapsdk = new _qqmapWxJssdkMin.default({
  key: "7YDBZ-4ATCD-5GM4Z-HCI5B-4ECM6-PPBXO" });var _default =

{
  components: {
    simpleDialog: _dialog.default },

  data: function data() {
    return {
      parameter: {},
      schoolList: [],
      nowSchool: {} };

  },
  computed: (0, _vuex.mapState)(['selectSchool']),
  onLoad: function onLoad(parameter) {
    this.parameter = parameter;
    this.nowSchool = this.selectSchool;
  },
  onNavigationBarSearchInputChanged: function onNavigationBarSearchInputChanged(e) {
    if (e.text === "") {
      this.schoolList = [];
      return;
    }
    var _self = this;
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.text, //用户输入的关键词
      filter: 'category=大学,中学',
      success: function success(res) {//搜索成功后的回调
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            id: res.data[i].id,
            title: res.data[i].title,
            addr: res.data[i].address });

        }
        _self.schoolList = sug;
      },
      fail: function fail(error) {
        console.error(JSON.stringify(error));
      } });

  },
  methods: _objectSpread({},
  (0, _vuex.mapMutations)(['checkSchool']), {
    setSchool: function setSchool(school) {
      this.nowSchool = school;
      this.$refs.simpleDialog2.confirm({
        title: '提示',
        message: '确定切换到' + school.title + "吗？ 学校位置:" + school.addr });

      //静默上传到学校表
      uni.request({
        url: this.GLOBAL.serverSrc + 'common/school/getSchool',
        method: 'POST',
        data: {
          'id': school.id,
          'title': school.title,
          'addr': school.addr } });


    },
    confirmButton: function confirmButton() {
      this.checkSchool(this.nowSchool);
      if (this.parameter.market) {
        uni.redirectTo({
          url: '../index/market/index' });

      } else if (this.parameter.index) {
        uni.switchTab({
          url: '../index/index' });

      } else {
        uni.navigateBack();
      }

    } }) };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\checkSchool.vue?vue&type=template&id=a98e2698&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/checkSchool.vue?vue&type=template&id=a98e2698& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "view",
    [
      _vm.schoolList.length === 0
        ? _c(
            "view",
            {
              staticClass: "grace-center",
              staticStyle: { "font-size": "32rpx", color: "#2F2F2F" }
            },
            [_vm._v("当前学校:" + _vm._s(_vm.nowSchool.title))]
          )
        : _vm._e(),
      _vm.schoolList.length > 0
        ? _c(
            "view",
            { staticClass: "grace-list" },
            _vm._l(_vm.schoolList, function(school, index) {
              return _c(
                "view",
                {
                  key: index,
                  staticClass: "items",
                  attrs: { eventid: "691dc3db-0-" + index },
                  on: {
                    click: function($event) {
                      _vm.setSchool(_vm.schoolList[index])
                    }
                  }
                },
                [
                  _c("view", { staticClass: "title" }, [
                    _vm._v(_vm._s(school.title))
                  ]),
                  _c("view", { staticClass: "arrow-right" })
                ]
              )
            })
          )
        : _vm._e(),
      _c("simpleDialog", {
        ref: "simpleDialog2",
        attrs: { eventid: "691dc3db-1", mpcomid: "691dc3db-0" },
        on: { confirmButton: _vm.confirmButton }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\main.js?{\"page\":\"pages%2Fcommon%2FcheckSchool\"}":
/*!****************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/main.js?{"page":"pages%2Fcommon%2FcheckSchool"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages.json");
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js"));
var _checkSchool = _interopRequireDefault(__webpack_require__(/*! ./pages/common/checkSchool.vue */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\checkSchool.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_checkSchool.default));

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\checkSchool.vue":
/*!*********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/checkSchool.vue ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _checkSchool_vue_vue_type_template_id_a98e2698___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkSchool.vue?vue&type=template&id=a98e2698& */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\checkSchool.vue?vue&type=template&id=a98e2698&");
/* harmony import */ var _checkSchool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkSchool.vue?vue&type=script&lang=js& */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\checkSchool.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _checkSchool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _checkSchool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _checkSchool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _checkSchool_vue_vue_type_template_id_a98e2698___WEBPACK_IMPORTED_MODULE_0__["render"],
  _checkSchool_vue_vue_type_template_id_a98e2698___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/checkSchool.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\checkSchool.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/checkSchool.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_checkSchool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./checkSchool.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\checkSchool.vue?vue&type=script&lang=js&");
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_checkSchool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_checkSchool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_checkSchool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_checkSchool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_checkSchool_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\checkSchool.vue?vue&type=template&id=a98e2698&":
/*!****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/checkSchool.vue?vue&type=template&id=a98e2698& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_checkSchool_vue_vue_type_template_id_a98e2698___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./checkSchool.vue?vue&type=template&id=a98e2698& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\checkSchool.vue?vue&type=template&id=a98e2698&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_checkSchool_vue_vue_type_template_id_a98e2698___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_checkSchool_vue_vue_type_template_id_a98e2698___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\main.js?{\"page\":\"pages%2Fcommon%2FcheckSchool\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/common/checkSchool.js.map