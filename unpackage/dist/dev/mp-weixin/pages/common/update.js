(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/common/update"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/update.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =







































{
  data: function data() {

    return {
      info: '正在加载', // 主标题显示版本号
      Minfo: '未知', // 副标题显示版本类型
      Mtip: '', // 小提示标语
      updateInfo: '无', // 更新摘要

      latest: null, // 版本信息
      packgeSize: null, // 更新包大小
      packgePath: null, // 更新包的文件地址
      downloadTask: null, // 下载任务
      downloadProgress: 0, // 下载进度

      buttonLoading: false, // 加载 - 标记
      installed: false, // 是否执行了安装 - 标记
      startProgress: false, // 下载进行 - 标记
      currentIsLatest: true // 当前版本就是最新版本 - 标记
    };
  },
  onReady: function onReady() {
    this.getLatest();
    var updated = uni.getStorageSync('updated');
    if (updated) {
      this.packgePath = updated.packgePath;
    }
  },
  // 如果用户下载后没有完成安装，却回到app，则执行这里
  onShow: function onShow() {
    if (this.installed === true && this.packgePath) {
      this.installed = false;
      this.haveDownloaded();
    }
  },
  // 用户关闭页面时检查是否存在下载任务
  onUnload: function onUnload() {
    if (this.downloadTask) {
      this.closeTask();
      this.showToast('更新被取消');
    }
  },
  // 下拉刷新更新
  onPullDownRefresh: function onPullDownRefresh() {
    this.getLatest();
    uni.stopPullDownRefresh();
  },
  methods: {
    // 封装个Toast方便用
    showToast: function showToast(text) {
      uni.showToast({
        title: text,
        duration: 3000,
        icon: 'none' });

    },
    // 已经下载了更新包但是没有安装
    haveDownloaded: function haveDownloaded() {var _this = this;
      uni.showModal({
        title: '更新尚未完成',
        content: '您已下载更新包，但是还没有完成安装，请问是否要继续安装更新包呢？',
        success: function success(res) {
          if (res.confirm) {
            plus.runtime.install(_this.packgePath, {
              force: true });

            _this.installed = true;
          } else if (res.cancel) {
            _this.showToast('更新被取消');
          }
        } });

    },
    // 取得最新版本及其所有信息
    getLatest: function getLatest() {var _this2 = this;
      this.info = '正在加载'; // 主标题显示版本号
      this.Minfo = '未知'; // 副标题显示版本类型
      this.updateInfo = '无'; // 更新摘要

      this.buttonLoading = true;
      this.latest = null;

      uni.request({
        url: this.GLOBAL.serverSrc + 'common/check_update/update',
        method: 'GET',
        success: function success(res) {
          if (res.statusCode === 200) {
            _this2.latest = res.data;
            _this2.buttonLoading = false;
            _this2.checkLatest();
          }
        } });

    },
    // 检查版本
    checkLatest: function checkLatest() {
      if (!this.latest.version) {
        this.Mtip = '未找到发行版本';
      } else if (plus.runtime.version != this.latest.version) {// 当前版本与新版本不符（$current在main.js里）
        this.currentIsLatest = false;
        this.Mtip = '发现新版本';
        this.info = this.latest.name + ' ' + this.latest.version; //名称 版本号
        this.updateInfo = this.latest.info;
        this.packgeSize = (this.latest.packgeSize / 1048576).toFixed(2) + 'MB'; // 请求取得的packgeSize是字节大小，转换为保留两位小数的MB
        this.setMinfo(this.latest.type);
      } else {
        this.showToast('当前是最新版了');
        this.currentIsLatest = true;
        this.Mtip = '当前是最新版';
        this.info = this.latest.name + ' ' + this.latest.version; //名称 版本号
        this.updateInfo = this.latest.info;
        this.setMinfo(this.latest.type);
      }
    },
    // 根据英文版本类型选择中文版本类型
    setMinfo: function setMinfo(type) {
      switch (type) {
        case 'base':
          this.Minfo = '结构版';
          break;
        case 'alpha':
          this.Minfo = '内测版';
          break;
        case 'beta':
          this.Minfo = '公测版';
          break;
        case 'rc':
          this.Minfo = '终测版';
          break;
        case 'release':
          this.Minfo = '正式版';
          break;
        default:
          this.Minfo = '未知';}

    },
    // 关闭下载任务
    closeTask: function closeTask() {
      this.downloadTask.abort();
      this.downloadTask = null;
      this.startProgress = false;
    },
    // 开始下载任务
    createTask: function createTask() {var _this3 = this;
      //判断是否已经存在任务
      if (this.packgePath) {
        this.haveDownloaded();
      } else {
        this.downloadProgress = 0;
        this.startProgress = true;
        // 创建下载任务对象
        this.downloadTask = uni.downloadFile({
          url: this.latest.downloadLink,
          success: function success(res) {
            if (res.statusCode === 200) {
              // 保存下载的安装包
              uni.saveFile({
                tempFilePath: res.tempFilePath,
                success: function success(res) {
                  _this3.packgePath = res.savedFilePath;
                  // 进行安装
                  plus.runtime.install(_this3.packgePath, {
                    force: true });

                  _this3.installed = true;
                  // 保存更新记录到stroage，方便下次启动app时删除安装包
                  uni.setStorage({
                    key: 'updated',
                    data: {
                      completed: true,
                      packgePath: _this3.packgePath },

                    success: function success(res) {
                      console.log('成功保存更新记录');
                    } });

                  // 任务完成，关闭下载任务
                  _this3.closeTask();
                } });

            }
          } });

        // 进度条更新
        this.downloadTask.onProgressUpdate(function (res) {
          _this3.downloadProgress = res.progress;
        });
      }
    },
    handleUpdate: function handleUpdate() {
      // 判断系统类型
      if (plus.os.name.toLowerCase() === 'android') {
        if (this.latest.downloadLink && this.latest.downloadLink !== '#') {// 我这里默认#也是没有地址，请根据业务自行修改
          // 安卓：创建下载任务
          this.createTask();
        } else {
          this.showToast('未找到下载地址');
        }
      } else {
        if (this.latest.iosLink && this.latest.iosLink !== '#') {// 我这里默认#也是没有地址，请根据业务自行修改
          // 苹果：打开商店链接
          plus.runtime.openURL(this.latest.iosLink);
        } else {
          this.showToast('未找到ios商店地址');
        }
      }
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/update.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=template&id=f96c653e&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/update.vue?vue&type=template&id=f96c653e& ***!
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
  return _c("view", { staticClass: "flex-column" }, [
    _c("view", { staticClass: "content" }, [
      _c("image", {
        staticClass: "logo",
        attrs: { src: "../../static/logo.png" }
      }),
      _c("view", { staticClass: "mainInfo" }, [
        _c("text", { staticClass: "title" }, [
          _vm._v(_vm._s(_vm.info) + " | " + _vm._s(_vm.Minfo))
        ]),
        _c("text", { staticClass: "tip" }, [_vm._v("\\n" + _vm._s(_vm.Mtip))])
      ]),
      _c("text", { staticClass: "line" })
    ]),
    _c("view", [
      _vm._m(0),
      _c("view", { staticClass: "infoContent" }, [
        _c("text", { staticClass: "updateInfo" }, [
          _vm._v(_vm._s(_vm.updateInfo))
        ])
      ])
    ]),
    !_vm.currentIsLatest
      ? _c("view", [
          _vm._m(1),
          _c("view", { staticClass: "infoContent" }, [
            _c("text", { staticClass: "updateInfo" }, [
              _vm._v(_vm._s(_vm.packgeSize))
            ])
          ])
        ])
      : _vm._e(),
    _c(
      "view",
      { staticClass: "minorContent bottom_aera" },
      [
        _vm.startProgress && !_vm.currentIsLatest
          ? _c(
              "view",
              { staticClass: "smallTitle" },
              [
                _c("text", [
                  _vm._v("下载进度:" + _vm._s(_vm.downloadProgress) + "%")
                ]),
                _c("progress", {
                  attrs: { percent: _vm.downloadProgress, "stroke-width": "4" }
                })
              ],
              1
            )
          : _vm._e(),
        !_vm.startProgress && !_vm.currentIsLatest
          ? _c(
              "button",
              {
                staticStyle: { "background-color": "#fc4243" },
                attrs: { type: "primary", eventid: "0807302a-0" },
                on: {
                  click: function($event) {
                    _vm.handleUpdate()
                  }
                }
              },
              [_vm._v("立即更新")]
            )
          : _vm._e(),
        _vm.currentIsLatest
          ? _c(
              "button",
              {
                staticStyle: { "background-color": "#fc4243" },
                attrs: {
                  loading: _vm.buttonLoading,
                  type: "primary",
                  eventid: "0807302a-1"
                },
                on: {
                  click: function($event) {
                    _vm.getLatest()
                  }
                }
              },
              [_vm._v("检查更新")]
            )
          : _vm._e()
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "infoContentTitle" }, [
      _c("text", { staticClass: "infoPic iconfont icon-info-circle" }),
      _c("text", { staticClass: "infoTitle" }, [_vm._v("更新摘要")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "infoContentTitle" }, [
      _c("text", { staticClass: "infoPic iconfont icon-tags" }),
      _c("text", { staticClass: "infoTitle" }, [_vm._v("更新大小")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\main.js?{\"page\":\"pages%2Fcommon%2Fupdate\"}":
/*!***********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/main.js?{"page":"pages%2Fcommon%2Fupdate"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages.json");
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js"));
var _update = _interopRequireDefault(__webpack_require__(/*! ./pages/common/update.vue */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_update.default));

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue":
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/update.vue ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _update_vue_vue_type_template_id_f96c653e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./update.vue?vue&type=template&id=f96c653e& */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=template&id=f96c653e&");
/* harmony import */ var _update_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./update.vue?vue&type=script&lang=js& */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _update_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _update_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _update_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./update.vue?vue&type=style&index=0&lang=css& */ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _update_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _update_vue_vue_type_template_id_f96c653e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _update_vue_vue_type_template_id_f96c653e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/update.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/update.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./update.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=script&lang=js&");
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_project_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/update.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./update.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_project_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_E_project_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=template&id=f96c653e&":
/*!***********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/schoolJiangHu/pages/common/update.vue?vue&type=template&id=f96c653e& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_template_id_f96c653e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./update.vue?vue&type=template&id=f96c653e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\pages\\common\\update.vue?vue&type=template&id=f96c653e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_template_id_f96c653e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_project_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_project_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_update_vue_vue_type_template_id_f96c653e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["C:\\Users\\Administrator\\Desktop\\schoolJiangHu\\main.js?{\"page\":\"pages%2Fcommon%2Fupdate\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/common/update.js.map