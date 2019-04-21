(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/login/binding"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\login\\binding.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/schoolJiangHu/pages/login/binding.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


























var _vuex = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


var graceChecker = __webpack_require__(/*! ../../graceUI/graceChecker.js */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\graceUI\\graceChecker.js");var _default =
{
  data: function data() {
    return {
      key: '' };

  },
  computed: (0, _vuex.mapState)(['user']),
  methods: _objectSpread({},
  (0, _vuex.mapMutations)(['login']), {
    bindNow: function bindNow(e) {var _this = this;
      // 表单验证
      var rule = [{
        name: "phone",
        checkType: "phoneno",
        errorMsg: "请输入正确的手机号" },
      {
        name: "password",
        checkType: "string",
        checkRule: "8,20",
        errorMsg: "密码长度应为8-20个字符" }];

      var formData = e.detail.value;
      var checkRes = graceChecker.check(formData, rule);
      // 验证通过
      if (checkRes) {
        this.btnLoading = true;
        var reqData = e.detail.value;
        reqData.openId = this.user.openId;
        reqData.type = this.user.type;
        uni.request({
          url: this.GLOBAL.serverSrc + 'common/login/binding',
          method: 'POST',
          data: reqData,
          success: function success(res) {
            console.log(JSON.stringify(res));
            if (res.data.status === 200) {
              _this.login(res.data);
              uni.showToast({
                title: '绑定成功' });

              uni.reLaunch({
                url: '../index/index' });

            } else {
              uni.showToast({
                title: res.data.msg,
                icon: "none" });

            }
          },
          fail: function fail(e) {
            _this.GLOBAL.requestFail(e);
          },
          complete: function complete() {
            _this.btnLoading = false;
          } });

      } else {
        uni.showToast({
          title: graceChecker.error,
          icon: "none" });

      }
    } }) };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\login\\binding.vue?vue&type=template&id=e3dab65a&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/schoolJiangHu/pages/login/binding.vue?vue&type=template&id=e3dab65a& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c("view", [
    _c(
      "view",
      {
        staticClass: "grace-padding",
        staticStyle: { "background-color": "#fffcfa" }
      },
      [
        _c(
          "view",
          {
            staticClass: "grace-form",
            staticStyle: { width: "95%", margin: "0 auto" }
          },
          [
            _c(
              "form",
              { attrs: { eventid: "6cb9909c-2" }, on: { submit: _vm.bindNow } },
              [
                _c("view", { staticClass: "grace-items  item-border" }, [
                  _c("view", { staticClass: "grace-label" }, [
                    _c("view", { staticClass: "iconfont icon-shouji" })
                  ]),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.phoneno,
                        expression: "phoneno"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      type: "number",
                      name: "phone",
                      placeholder: "请输入手机号",
                      maxlength: "11",
                      eventid: "6cb9909c-0"
                    },
                    domProps: { value: _vm.phoneno },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.phoneno = $event.target.value
                      }
                    }
                  })
                ]),
                _c("view", { staticClass: "grace-items  item-border" }, [
                  _c("view", { staticClass: "grace-label" }, [
                    _c("view", { staticClass: "iconfont icon-mima1" })
                  ]),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.password,
                        expression: "password"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      type: "text",
                      password: "",
                      name: "password",
                      placeholder: "请输入密码",
                      maxlength: "20",
                      eventid: "6cb9909c-1"
                    },
                    domProps: { value: _vm.password },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.password = $event.target.value
                      }
                    }
                  })
                ]),
                _c(
                  "button",
                  {
                    staticStyle: {
                      background: "linear-gradient(to right,#fc6666,#ff8c55)",
                      "margin-top": "30px"
                    },
                    attrs: {
                      loading: _vm.btnLoading,
                      "form-type": "submit",
                      type: "primary"
                    }
                  },
                  [
                    _vm._v("开始绑定"),
                    _c("text", {
                      staticClass: "grace-iconfont icon-arrow-right"
                    })
                  ]
                )
              ],
              1
            )
          ],
          1
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\main.js?{\"page\":\"pages%2Flogin%2Fbinding\"}":
/*!***********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/main.js?{"page":"pages%2Flogin%2Fbinding"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages.json");
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js"));
var _binding = _interopRequireDefault(__webpack_require__(/*! ./pages/login/binding.vue */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\login\\binding.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_binding.default));

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\login\\binding.vue":
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/pages/login/binding.vue ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _binding_vue_vue_type_template_id_e3dab65a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding.vue?vue&type=template&id=e3dab65a& */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\login\\binding.vue?vue&type=template&id=e3dab65a&");
/* harmony import */ var _binding_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binding.vue?vue&type=script&lang=js& */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\login\\binding.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _binding_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _binding_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _binding_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _binding_vue_vue_type_template_id_e3dab65a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _binding_vue_vue_type_template_id_e3dab65a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "C:/Users/Administrator/Desktop/schoolJiangHu/pages/login/binding.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\login\\binding.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/pages/login/binding.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_binding_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./binding.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\login\\binding.vue?vue&type=script&lang=js&");
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_binding_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_binding_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_binding_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_binding_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_binding_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\login\\binding.vue?vue&type=template&id=e3dab65a&":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/pages/login/binding.vue?vue&type=template&id=e3dab65a& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_binding_vue_vue_type_template_id_e3dab65a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./binding.vue?vue&type=template&id=e3dab65a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\login\\binding.vue?vue&type=template&id=e3dab65a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_binding_vue_vue_type_template_id_e3dab65a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_binding_vue_vue_type_template_id_e3dab65a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\main.js?{\"page\":\"pages%2Flogin%2Fbinding\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/binding.js.map