(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("monitorjs", [], factory);
	else if(typeof exports === 'object')
		exports["monitorjs"] = factory();
	else
		root["monitorjs"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(31)('wks');
var uid = __webpack_require__(24);
var Symbol = __webpack_require__(5).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(55);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(0);
var ctx = __webpack_require__(27);
var hide = __webpack_require__(10);
var has = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(40);
var toPrimitive = __webpack_require__(28);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AjaxLibEnum = exports.ErrorLevelEnum = exports.ErrorCategoryEnum = undefined;

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 错误类型枚举
 */
var ErrorCategoryEnum = exports.ErrorCategoryEnum = function () {
  function ErrorCategoryEnum() {
    (0, _classCallCheck3.default)(this, ErrorCategoryEnum);
  }

  (0, _createClass3.default)(ErrorCategoryEnum, null, [{
    key: "JS_ERROR",

    /**
     * js 错误
     */
    get: function get() {
      return "js_error";
    }

    /**
     * 资源引用错误
     */

  }, {
    key: "RESOURCE_ERROR",
    get: function get() {
      return "resource_error";
    }

    /**
     * Vue错误
     */

  }, {
    key: "VUE_ERROR",
    get: function get() {
      return "vue_error";
    }

    /**
     * promise 错误
     */

  }, {
    key: "PROMISE_ERROR",
    get: function get() {
      return "promise_error";
    }

    /**
     * ajax异步请求错误
     */

  }, {
    key: "AJAX_ERROR",
    get: function get() {
      return "ajax_error";
    }

    /**
     * 控制台错误console.info
     */

  }, {
    key: "CONSOLE_INFO",
    get: function get() {
      return "console_info";
    }

    /**
     * 控制台错误console.warn
     */

  }, {
    key: "CONSOLE_WARN",
    get: function get() {
      return "console_warn";
    }

    /**
     * 控制台错误console.error
     */

  }, {
    key: "CONSOLE_ERROR",
    get: function get() {
      return "console_error";
    }

    /**
     * 跨域js错误
     */

  }, {
    key: "CROSS_SCRIPT_ERROR",
    get: function get() {
      return "cross_srcipt_error";
    }

    /**
     * 未知异常
     */

  }, {
    key: "UNKNOW_ERROR",
    get: function get() {
      return "unknow_error";
    }

    /**
     * 性能上报
     */

  }, {
    key: "PERFORMANCE",
    get: function get() {
      return "performance";
    }

    /**
     * 网速上报
     */

  }, {
    key: "NETWORK_SPEED",
    get: function get() {
      return "network_speed";
    }
  }]);
  return ErrorCategoryEnum;
}();

/**
 * 错误level枚举
 */


var ErrorLevelEnum = exports.ErrorLevelEnum = function () {
  function ErrorLevelEnum() {
    (0, _classCallCheck3.default)(this, ErrorLevelEnum);
  }

  (0, _createClass3.default)(ErrorLevelEnum, null, [{
    key: "ERROR",

    /**
     * 错误信息
     */
    get: function get() {
      return "Error";
    }

    /**
     * 警告信息
     */

  }, {
    key: "WARN",
    get: function get() {
      return "Warning";
    }

    /**
     * 日志信息
     */

  }, {
    key: "INFO",
    get: function get() {
      return "Info";
    }
  }]);
  return ErrorLevelEnum;
}();

/**
 * Ajax库枚举
 */


var AjaxLibEnum = exports.AjaxLibEnum = function () {
  function AjaxLibEnum() {
    (0, _classCallCheck3.default)(this, AjaxLibEnum);
  }

  (0, _createClass3.default)(AjaxLibEnum, null, [{
    key: "AXIOS",
    get: function get() {
      return 'axios';
    }
  }, {
    key: "DEFAULT",
    get: function get() {
      return 'default';
    }
  }]);
  return AjaxLibEnum;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(19);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(43);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(48);
var defined = __webpack_require__(29);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(87);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(91);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(43);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(94);

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = __webpack_require__(20);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _baseConfig = __webpack_require__(8);

var _device = __webpack_require__(99);

var _device2 = _interopRequireDefault(_device);

var _utils = __webpack_require__(101);

var _utils2 = _interopRequireDefault(_utils);

var _taskQueue = __webpack_require__(102);

var _taskQueue2 = _interopRequireDefault(_taskQueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 监控基类
 */
var BaseMonitor = function () {
    /**
     * 上报错误地址
     * @param {*} params { reportUrl,extendsInfo }
     */
    function BaseMonitor(params) {
        (0, _classCallCheck3.default)(this, BaseMonitor);

        this.category = _baseConfig.ErrorCategoryEnum.UNKNOW_ERROR; //错误类型
        this.level = _baseConfig.ErrorLevelEnum.INFO; //错误等级
        this.msg = ''; //错误信息
        this.url = ''; //错误信息地址
        this.line = ''; //行数
        this.col = ''; //列数
        this.errorObj = ''; //错误堆栈

        this.reportUrl = params.reportUrl; //上报错误地址
        this.extendsInfo = params.extendsInfo; //扩展信息
        this.callback = params.callback;
    }

    /**
     * 记录错误信息
     */


    (0, _createClass3.default)(BaseMonitor, [{
        key: 'recordError',
        value: function recordError() {
            this.handleRecordError();
            //延迟记录日志
            setTimeout(function () {
                //基于消息队列方式控制消息上报频率，防止消息阻塞
                _taskQueue2.default.isStop && _taskQueue2.default.fire(); //停止则fire
            }, 100);
        }

        /**
         * 统一处理记录日志
         */

    }, {
        key: 'handleRecordError',
        value: function handleRecordError() {
            try {
                if (!this.msg) {
                    return;
                }
                //过滤掉错误上报地址
                if (this.reportUrl && this.url && this.url.toLowerCase().indexOf(this.reportUrl.toLowerCase()) >= 0) {
                    console.log('统计错误接口异常', this.msg);
                    return;
                }
                var errorInfo = this.handleErrorInfo();

                console.log('\n````````````````````` ' + this.category + ' `````````````````````\n', errorInfo);

                //记录日志
                _taskQueue2.default.add(this.callback, errorInfo);
            } catch (error) {
                console.log(error);
            }
        }

        /**
         * 统一处理错误信息
         */

    }, {
        key: 'handleErrorInfo',
        value: function handleErrorInfo() {
            var temp = {};
            var txt = '错误类别: ' + this.category + '\r\n';
            txt += '日志信息: ' + this.msg + '\r\n';
            txt += 'url: ' + encodeURIComponent(this.url) + '\r\n';
            switch (this.category) {
                case _baseConfig.ErrorCategoryEnum.JS_ERROR:
                    txt += '错误行号: ' + this.line + '\r\n';
                    txt += '错误列号: ' + this.col + '\r\n';
                    if (this.errorObj && this.errorObj.stack) {
                        txt += '错误栈: ' + this.errorObj.stack + '\r\n';
                    }
                    temp = {
                        line: this.line,
                        col: this.col,
                        error: this.errorObj && this.errorObj.stack
                    };
                    break;
                default:
                    txt += '其他错误: ' + (0, _stringify2.default)(this.errorObj) + '\r\n';
                    temp = {
                        error: (0, _stringify2.default)(this.errorObj)
                    };
                    break;
            }
            var deviceInfo = this.getDeviceInfo();
            txt += '设备信息: ' + deviceInfo; //设备信息
            var extendsInfo = this.getExtendsInfo();
            var recordInfo = extendsInfo;
            recordInfo.category = this.category; //错误分类
            recordInfo.logType = this.level; //错误级别
            // recordInfo.logMessage = txt; //错误信息
            recordInfo.logInfo = (0, _extends3.default)({
                errorType: this.category,
                msg: this.msg,
                file: this.url
            }, temp);
            recordInfo.deviceInfo = deviceInfo; //设备信息
            return recordInfo;
        }

        /**
         * 获取扩展信息
         */

    }, {
        key: 'getExtendsInfo',
        value: function getExtendsInfo() {
            try {
                var ret = {};
                var extendsInfo = this.extendsInfo || {};
                var dynamicParams = void 0;
                if (_utils2.default.isFunction(extendsInfo.getDynamic)) {
                    dynamicParams = extendsInfo.getDynamic(); //获取动态参数
                }
                //判断动态方法返回的参数是否是对象
                if (_utils2.default.isObject(dynamicParams)) {
                    extendsInfo = (0, _extends3.default)({}, extendsInfo, dynamicParams);
                }
                //遍历扩展信息，排除动态方法
                for (var key in extendsInfo) {
                    if (!_utils2.default.isFunction(extendsInfo[key])) {
                        //排除获取动态方法
                        ret[key] = extendsInfo[key];
                    }
                }
                return ret;
            } catch (error) {
                console.log('call getExtendsInfo error', error);
                return {};
            }
        }

        /**
         * 获取设备信息
         */

    }, {
        key: 'getDeviceInfo',
        value: function getDeviceInfo() {
            try {
                var deviceInfo = _device2.default.getDeviceInfo();
                return deviceInfo;
            } catch (error) {
                console.log(error);
                return '';
            }
        }
    }]);
    return BaseMonitor;
}();

exports.default = BaseMonitor;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(29);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(47);
var enumBugKeys = __webpack_require__(35);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(58);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(12);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(31)('keys');
var uid = __webpack_require__(24);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(23) ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(11);
var dPs = __webpack_require__(69);
var enumBugKeys = __webpack_require__(35);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(41)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(72).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(9);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(23);
var wksExt = __webpack_require__(37);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(41)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9);
var toObject = __webpack_require__(21);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(65);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(77);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(67)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(45)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(23);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(46);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(22);
var $iterCreate = __webpack_require__(68);
var setToStringTag = __webpack_require__(36);
var getPrototypeOf = __webpack_require__(42);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(16);
var arrayIndexOf = __webpack_require__(70)(false);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(34);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(32);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(47);
var hiddenKeys = __webpack_require__(35).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(26);
var createDesc = __webpack_require__(19);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(28);
var has = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(40);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(53);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorJS = undefined;

var _monitorjs = __webpack_require__(54);

var _monitorjs2 = _interopRequireDefault(_monitorjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.MonitorJS = _monitorjs2.default;


window.MonitorJS = _monitorjs2.default;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _error = __webpack_require__(59);

var _baseConfig = __webpack_require__(8);

__webpack_require__(118);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MonitorJS = function () {
    function MonitorJS() {
        (0, _classCallCheck3.default)(this, MonitorJS);

        this.jsError = true;
        this.promiseError = true;
        this.resourceError = true;
        this.ajaxError = true;
        this.consoleError = false; //console.error默认不处理
        this.vueError = false;
    }

    /**
     * 处理异常信息初始化
     * @param {*} options
     */


    (0, _createClass3.default)(MonitorJS, [{
        key: 'init',
        value: function init(options) {
            options = options || {};
            this.jsError = !(options.jsError === false);
            this.promiseError = !(options.promiseError === false);
            this.resourceError = !(options.resourceError === false);
            this.ajaxError = !(options.ajaxError === false);
            this.consoleError = options.consoleError === true; //显式配置
            this.vueError = options.vueError === true; //显式配置
            var reportUrl = options.url; //上报错误地址
            var extendsInfo = options.extendsInfo || {}; //扩展信息（一般用于系统个性化分析）
            var callback = options.callback;
            var param = { reportUrl: reportUrl, extendsInfo: extendsInfo, callback: callback };
            if (this.jsError) {
                new _error.JsError(param).handleError();
            }
            if (this.promiseError) {
                new _error.PromiseError(param).handleError();
            }
            if (this.resourceError) {
                new _error.ResourceError(param).handleError();
            }
            if (this.ajaxError) {
                new _error.AjaxError(param).handleError(_baseConfig.AjaxLibEnum.DEFAULT);
            }
            if (this.consoleError) {
                new _error.ConsoleError(param).handleError();
            }
            if (this.vueError && options.vue) {
                new _error.VueError(param).handleError(options.vue);
            }
        }
    }]);
    return MonitorJS;
}();

exports.default = MonitorJS;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VueError = exports.ResourceError = exports.PromiseError = exports.JsError = exports.ConsoleError = exports.AjaxError = undefined;

var _ajaxError = __webpack_require__(60);

var _ajaxError2 = _interopRequireDefault(_ajaxError);

var _consoleError = __webpack_require__(103);

var _consoleError2 = _interopRequireDefault(_consoleError);

var _jsError = __webpack_require__(114);

var _jsError2 = _interopRequireDefault(_jsError);

var _promiseError = __webpack_require__(115);

var _promiseError2 = _interopRequireDefault(_promiseError);

var _resourceError = __webpack_require__(116);

var _resourceError2 = _interopRequireDefault(_resourceError);

var _vueError = __webpack_require__(117);

var _vueError2 = _interopRequireDefault(_vueError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AjaxError = _ajaxError2.default;
exports.ConsoleError = _consoleError2.default;
exports.JsError = _jsError2.default;
exports.PromiseError = _promiseError2.default;
exports.ResourceError = _resourceError2.default;
exports.VueError = _vueError2.default;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(20);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(14);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = __webpack_require__(15);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _baseMonitor = __webpack_require__(18);

var _baseMonitor2 = _interopRequireDefault(_baseMonitor);

var _baseConfig = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ajax error异常
 */
var AjaxError = function () {
    function AjaxError(params) {
        (0, _classCallCheck3.default)(this, AjaxError);

        this.params = params;
    }
    /**
     * 处理错误
     * @param type {*} ajax库类型
     * @param error{*} 错误信息
     */


    (0, _createClass3.default)(AjaxError, [{
        key: "handleError",
        value: function handleError(type, err) {
            switch (type) {
                case _baseConfig.AjaxLibEnum.AXIOS:
                    new AxiosError(this.params).handleError(err);
                    break;
                default:
                    new XHRError(this.params).handleError();
                    break;
            }
        }
    }]);
    return AjaxError;
}();

exports.default = AjaxError;

/**
 * Axios类库 错误信息处理(如果不配置，可以统一通过XHR接受错误信息)
 */

var AxiosError = function (_BaseMonitor) {
    (0, _inherits3.default)(AxiosError, _BaseMonitor);

    function AxiosError(params) {
        (0, _classCallCheck3.default)(this, AxiosError);
        return (0, _possibleConstructorReturn3.default)(this, (AxiosError.__proto__ || (0, _getPrototypeOf2.default)(AxiosError)).call(this, params));
    }

    (0, _createClass3.default)(AxiosError, [{
        key: "handleError",
        value: function handleError(error) {
            if (error && error.config && error.config.url) {
                this.url = error.config.url;
            }
            this.level = _baseConfig.ErrorLevelEnum.WARN;
            this.category = _baseConfig.ErrorCategoryEnum.AJAX_ERROR;
            this.msg = (0, _stringify2.default)(error);
            this.recordError();
        }
    }]);
    return AxiosError;
}(_baseMonitor2.default);

/**
 * 获取HTTP错误信息
 */


var XHRError = function (_BaseMonitor2) {
    (0, _inherits3.default)(XHRError, _BaseMonitor2);

    function XHRError(params) {
        (0, _classCallCheck3.default)(this, XHRError);
        return (0, _possibleConstructorReturn3.default)(this, (XHRError.__proto__ || (0, _getPrototypeOf2.default)(XHRError)).call(this, params));
    }

    /**
     * 获取错误信息
     */


    (0, _createClass3.default)(XHRError, [{
        key: "handleError",
        value: function handleError() {
            var _this3 = this;

            if (!window.XMLHttpRequest) {
                return;
            }
            var xhrSend = XMLHttpRequest.prototype.send;
            var _handleEvent = function _handleEvent(event) {
                try {
                    if (event && event.currentTarget && event.currentTarget.status !== 200) {
                        _this3.level = _baseConfig.ErrorLevelEnum.WARN;
                        _this3.category = _baseConfig.ErrorCategoryEnum.AJAX_ERROR;
                        _this3.msg = event.target.response;
                        _this3.url = event.target.responseURL;
                        _this3.errorObj = {
                            status: event.target.status,
                            statusText: event.target.statusText
                        };
                        _this3.recordError();
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            XMLHttpRequest.prototype.send = function () {
                if (this.addEventListener) {
                    this.addEventListener('error', _handleEvent);
                    this.addEventListener('load', _handleEvent);
                    this.addEventListener('abort', _handleEvent);
                } else {
                    var tempStateChange = this.onreadystatechange;
                    this.onreadystatechange = function (event) {
                        tempStateChange.apply(this, arguments);
                        if (this.readyState === 4) {
                            _handleEvent(event);
                        }
                    };
                }
                return xhrSend.apply(this, arguments);
            };
        }
    }]);
    return XHRError;
}(_baseMonitor2.default);

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(21);
var $getPrototypeOf = __webpack_require__(42);

__webpack_require__(64)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4);
var core = __webpack_require__(0);
var fails = __webpack_require__(13);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(73);
module.exports = __webpack_require__(37).f('iterator');


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32);
var defined = __webpack_require__(29);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(33);
var descriptor = __webpack_require__(19);
var setToStringTag = __webpack_require__(36);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(11);
var getKeys = __webpack_require__(25);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(49);
var toAbsoluteIndex = __webpack_require__(71);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(5).document;
module.exports = document && document.documentElement;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
var global = __webpack_require__(5);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(22);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(75);
var step = __webpack_require__(76);
var Iterators = __webpack_require__(22);
var toIObject = __webpack_require__(16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(45)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
__webpack_require__(84);
__webpack_require__(85);
__webpack_require__(86);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(5);
var has = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(46);
var META = __webpack_require__(80).KEY;
var $fails = __webpack_require__(13);
var shared = __webpack_require__(31);
var setToStringTag = __webpack_require__(36);
var uid = __webpack_require__(24);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(37);
var wksDefine = __webpack_require__(38);
var enumKeys = __webpack_require__(81);
var isArray = __webpack_require__(82);
var anObject = __webpack_require__(11);
var isObject = __webpack_require__(12);
var toObject = __webpack_require__(21);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(28);
var createDesc = __webpack_require__(19);
var _create = __webpack_require__(33);
var gOPNExt = __webpack_require__(83);
var $GOPD = __webpack_require__(51);
var $GOPS = __webpack_require__(39);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(25);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(50).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(26).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(23)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(24)('meta');
var isObject = __webpack_require__(12);
var has = __webpack_require__(9);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(13)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(25);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(26);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(34);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(16);
var gOPN = __webpack_require__(50).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 84 */
/***/ (function(module, exports) {



/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('asyncIterator');


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('observable');


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(89);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(4);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(90).set });


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(12);
var anObject = __webpack_require__(11);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(27)(Function.call, __webpack_require__(51).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(93);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(33) });


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(95);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(98) });


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(7);
var getKeys = __webpack_require__(25);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(26);
var toObject = __webpack_require__(21);
var IObject = __webpack_require__(48);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(13)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _device = __webpack_require__(100);

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _device2.default;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var DeviceInfo = function () {
    var root = typeof self !== 'undefined' ? self : this;
    var _window = root || {};
    // 变量库
    var VariableLibrary = {
        navigator: typeof root.navigator != 'undefined' ? root.navigator : {},
        // 信息map
        infoMap: {
            engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
            browser: ['Safari', 'Chrome', 'Edge', 'IE', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle', 'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', 'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi'],
            os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
            device: ['Mobile', 'Tablet', 'iPad']
        }
        // 方法库
    };var MethodLibrary = function () {
        return {
            // 获取匹配库
            getMatchMap: function getMatchMap(u) {
                return {
                    // 内核
                    Trident: u.indexOf('Trident') > -1 || u.indexOf('NET CLR') > -1,
                    Presto: u.indexOf('Presto') > -1,
                    WebKit: u.indexOf('AppleWebKit') > -1,
                    Gecko: u.indexOf('Gecko/') > -1,
                    // 浏览器
                    Safari: u.indexOf('Safari') > -1,
                    Chrome: u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1,
                    IE: u.indexOf('MSIE') > -1 || u.indexOf('Trident') > -1,
                    Edge: u.indexOf('Edge') > -1,
                    Firefox: u.indexOf('Firefox') > -1 || u.indexOf('FxiOS') > -1,
                    'Firefox Focus': u.indexOf('Focus') > -1,
                    Chromium: u.indexOf('Chromium') > -1,
                    Opera: u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1,
                    Vivaldi: u.indexOf('Vivaldi') > -1,
                    Yandex: u.indexOf('YaBrowser') > -1,
                    Arora: u.indexOf('Arora') > -1,
                    Lunascape: u.indexOf('Lunascape') > -1,
                    QupZilla: u.indexOf('QupZilla') > -1,
                    'Coc Coc': u.indexOf('coc_coc_browser') > -1,
                    Kindle: u.indexOf('Kindle') > -1 || u.indexOf('Silk/') > -1,
                    Iceweasel: u.indexOf('Iceweasel') > -1,
                    Konqueror: u.indexOf('Konqueror') > -1,
                    Iceape: u.indexOf('Iceape') > -1,
                    SeaMonkey: u.indexOf('SeaMonkey') > -1,
                    Epiphany: u.indexOf('Epiphany') > -1,
                    '360': u.indexOf('QihooBrowser') > -1 || u.indexOf('QHBrowser') > -1,
                    '360EE': u.indexOf('360EE') > -1,
                    '360SE': u.indexOf('360SE') > -1,
                    UC: u.indexOf('UC') > -1 || u.indexOf(' UBrowser') > -1,
                    QQBrowser: u.indexOf('QQBrowser') > -1,
                    QQ: u.indexOf('QQ/') > -1,
                    Baidu: u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1,
                    Maxthon: u.indexOf('Maxthon') > -1,
                    Sogou: u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1,
                    LBBROWSER: u.indexOf('LBBROWSER') > -1,
                    '2345Explorer': u.indexOf('2345Explorer') > -1,
                    TheWorld: u.indexOf('TheWorld') > -1,
                    XiaoMi: u.indexOf('MiuiBrowser') > -1,
                    Quark: u.indexOf('Quark') > -1,
                    Qiyu: u.indexOf('Qiyu') > -1,
                    Wechat: u.indexOf('MicroMessenger') > -1,
                    Taobao: u.indexOf('AliApp(TB') > -1,
                    Alipay: u.indexOf('AliApp(AP') > -1,
                    Weibo: u.indexOf('Weibo') > -1,
                    Douban: u.indexOf('com.douban.frodo') > -1,
                    Suning: u.indexOf('SNEBUY-APP') > -1,
                    iQiYi: u.indexOf('IqiyiApp') > -1,
                    // 系统或平台
                    Windows: u.indexOf('Windows') > -1,
                    Linux: u.indexOf('Linux') > -1 || u.indexOf('X11') > -1,
                    'Mac OS': u.indexOf('Macintosh') > -1,
                    Android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
                    Ubuntu: u.indexOf('Ubuntu') > -1,
                    FreeBSD: u.indexOf('FreeBSD') > -1,
                    Debian: u.indexOf('Debian') > -1,
                    'Windows Phone': u.indexOf('IEMobile') > -1 || u.indexOf('Windows Phone') > -1,
                    BlackBerry: u.indexOf('BlackBerry') > -1 || u.indexOf('RIM') > -1,
                    MeeGo: u.indexOf('MeeGo') > -1,
                    Symbian: u.indexOf('Symbian') > -1,
                    iOS: u.indexOf('like Mac OS X') > -1,
                    'Chrome OS': u.indexOf('CrOS') > -1,
                    WebOS: u.indexOf('hpwOS') > -1,
                    // 设备
                    Mobile: u.indexOf('Mobi') > -1 || u.indexOf('iPh') > -1 || u.indexOf('480') > -1,
                    Tablet: u.indexOf('Tablet') > -1 || u.indexOf('Nexus 7') > -1,
                    iPad: u.indexOf('iPad') > -1
                };
            },
            // 在信息map和匹配库中进行匹配
            matchInfoMap: function matchInfoMap(_this) {
                var u = VariableLibrary.navigator.userAgent || {};
                var match = MethodLibrary.getMatchMap(u);
                for (var s in VariableLibrary.infoMap) {
                    for (var i = 0; i < VariableLibrary.infoMap[s].length; i++) {
                        var value = VariableLibrary.infoMap[s][i];
                        if (match[value]) {
                            _this[s] = value;
                        }
                    }
                }
            },
            // 获取当前操作系统
            getOS: function getOS() {
                var _this = this;
                MethodLibrary.matchInfoMap(_this);
                return _this.os;
            },
            // 获取操作系统版本
            getOSVersion: function getOSVersion() {
                var _this = this;
                var u = VariableLibrary.navigator.userAgent || {};
                _this.osVersion = '';
                // 系统版本信息
                var osVersion = {
                    Windows: function Windows() {
                        var v = u.replace(/^.*Windows NT ([\d.]+);.*$/, '$1');
                        var oldWindowsVersionMap = {
                            '6.4': '10',
                            '6.3': '8.1',
                            '6.2': '8',
                            '6.1': '7',
                            '6.0': 'Vista',
                            '5.2': 'XP',
                            '5.1': 'XP',
                            '5.0': '2000'
                        };
                        return oldWindowsVersionMap[v] || v;
                    },
                    Android: function Android() {
                        return u.replace(/^.*Android ([\d.]+);.*$/, '$1');
                    },
                    iOS: function iOS() {
                        return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
                    },
                    Debian: function Debian() {
                        return u.replace(/^.*Debian\/([\d.]+).*$/, '$1');
                    },
                    'Windows Phone': function WindowsPhone() {
                        return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2');
                    },
                    'Mac OS': function MacOS() {
                        return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.');
                    },
                    WebOS: function WebOS() {
                        return u.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1');
                    }
                };
                if (osVersion[_this.os]) {
                    _this.osVersion = osVersion[_this.os]();
                    if (_this.osVersion == u) {
                        _this.osVersion = '';
                    }
                }
                return _this.osVersion;
            },
            // 获取横竖屏状态
            getOrientationStatu: function getOrientationStatu() {
                var orientationStatus = '';
                var orientation = window.matchMedia('(orientation: portrait)');
                if (orientation.matches) {
                    orientationStatus = '竖屏';
                } else {
                    orientationStatus = '横屏';
                }
                return orientationStatus;
            },
            // 获取设备类型
            getDeviceType: function getDeviceType() {
                var _this = this;
                _this.device = 'PC';
                MethodLibrary.matchInfoMap(_this);
                return _this.device;
            },
            // 获取网络状态
            getNetwork: function getNetwork() {
                var netWork = navigator && navigator.connection && navigator.connection.effectiveType;
                return netWork;
            },
            // 获取当前语言
            getLanguage: function getLanguage() {
                var _this = this;
                _this.language = function () {
                    var language = VariableLibrary.navigator.browserLanguage || VariableLibrary.navigator.language;
                    var arr = language.split('-');
                    if (arr[1]) {
                        arr[1] = arr[1].toUpperCase();
                    }
                    return arr.join('_');
                }();
                return _this.language;
            },
            // 生成浏览器指纹
            createFingerprint: function createFingerprint(domain) {
                var fingerprint;
                function bin2hex(s) {
                    var i,
                        l,
                        n,
                        o = '';
                    s += '';
                    for (i = 0, l = s.length; i < l; i++) {
                        n = s.charCodeAt(i).toString(16);
                        o += n.length < 2 ? '0' + n : n;
                    }
                    return o;
                }
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var txt = domain || window.location.host;
                ctx.textBaseline = 'top';
                ctx.font = "14px 'Arial'";
                ctx.textBaseline = 'tencent';
                ctx.fillStyle = '#f60';
                ctx.fillRect(125, 1, 62, 20);
                ctx.fillStyle = '#069';
                ctx.fillText(txt, 2, 15);
                ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
                ctx.fillText(txt, 4, 17);
                var b64 = canvas.toDataURL().replace('data:image/png;base64,', '');
                var bin = atob(b64);
                var crc = bin2hex(bin.slice(-16, -12));
                fingerprint = crc;
                return fingerprint;
            },
            // 浏览器信息
            getBrowserInfo: function getBrowserInfo() {
                var _this = this;
                MethodLibrary.matchInfoMap(_this);

                var u = VariableLibrary.navigator.userAgent || {};

                var _mime = function _mime(option, value) {
                    var mimeTypes = VariableLibrary.navigator.mimeTypes;
                    for (var key in mimeTypes) {
                        if (mimeTypes[key][option] == value) {
                            return true;
                        }
                    }
                    return false;
                };

                var match = MethodLibrary.getMatchMap(u);

                var is360 = false;
                if (_window.chrome) {
                    var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
                    if (chrome_vision > 36 && _window.showModalDialog) {
                        is360 = true;
                    } else if (chrome_vision > 45) {
                        is360 = _mime('type', 'application/vnd.chromium.remoting-viewer');
                    }
                }
                if (match['Baidu'] && match['Opera']) {
                    match['Baidu'] = false;
                }
                if (match['Mobile']) {
                    match['Mobile'] = !(u.indexOf('iPad') > -1);
                }
                if (is360) {
                    if (_mime('type', 'application/gameplugin')) {
                        match['360SE'] = true;
                    } else if (VariableLibrary.navigator && typeof VariableLibrary.navigator['connection']['saveData'] == 'undefined') {
                        match['360SE'] = true;
                    } else {
                        match['360EE'] = true;
                    }
                }
                if (match['IE'] || match['Edge']) {
                    var navigator_top = window.screenTop - window.screenY;
                    switch (navigator_top) {
                        case 71:
                            // 无收藏栏,贴边
                            break;
                        case 74:
                            // 无收藏栏,非贴边
                            break;
                        case 99:
                            // 有收藏栏,贴边
                            break;
                        case 102:
                            // 有收藏栏,非贴边
                            match['360EE'] = true;
                            break;
                        case 75:
                            // 无收藏栏,贴边
                            break;
                        case 74:
                            // 无收藏栏,非贴边
                            break;
                        case 105:
                            // 有收藏栏,贴边
                            break;
                        case 104:
                            // 有收藏栏,非贴边
                            match['360SE'] = true;
                            break;
                        default:
                            break;
                    }
                }

                var browerVersionMap = {
                    Safari: function Safari() {
                        return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
                    },
                    Chrome: function Chrome() {
                        return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1');
                    },
                    IE: function IE() {
                        return u.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1');
                    },
                    Edge: function Edge() {
                        return u.replace(/^.*Edge\/([\d.]+).*$/, '$1');
                    },
                    Firefox: function Firefox() {
                        return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1');
                    },
                    'Firefox Focus': function FirefoxFocus() {
                        return u.replace(/^.*Focus\/([\d.]+).*$/, '$1');
                    },
                    Chromium: function Chromium() {
                        return u.replace(/^.*Chromium\/([\d.]+).*$/, '$1');
                    },
                    Opera: function Opera() {
                        return u.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1');
                    },
                    Vivaldi: function Vivaldi() {
                        return u.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1');
                    },
                    Yandex: function Yandex() {
                        return u.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1');
                    },
                    Arora: function Arora() {
                        return u.replace(/^.*Arora\/([\d.]+).*$/, '$1');
                    },
                    Lunascape: function Lunascape() {
                        return u.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1');
                    },
                    QupZilla: function QupZilla() {
                        return u.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1');
                    },
                    'Coc Coc': function CocCoc() {
                        return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1');
                    },
                    Kindle: function Kindle() {
                        return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
                    },
                    Iceweasel: function Iceweasel() {
                        return u.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1');
                    },
                    Konqueror: function Konqueror() {
                        return u.replace(/^.*Konqueror\/([\d.]+).*$/, '$1');
                    },
                    Iceape: function Iceape() {
                        return u.replace(/^.*Iceape\/([\d.]+).*$/, '$1');
                    },
                    SeaMonkey: function SeaMonkey() {
                        return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1');
                    },
                    Epiphany: function Epiphany() {
                        return u.replace(/^.*Epiphany\/([\d.]+).*$/, '$1');
                    },
                    '360': function _() {
                        return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1');
                    },
                    '360SE': function SE() {
                        var hash = {
                            '63': '10.0',
                            '55': '9.1',
                            '45': '8.1',
                            '42': '8.0',
                            '31': '7.0',
                            '21': '6.3'
                        };
                        var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
                        return hash[chrome_vision] || '';
                    },
                    '360EE': function EE() {
                        var hash = {
                            '69': '11.0',
                            '63': '9.5',
                            '55': '9.0',
                            '50': '8.7',
                            '30': '7.5'
                        };
                        var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
                        return hash[chrome_vision] || '';
                    },
                    Maxthon: function Maxthon() {
                        return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1');
                    },
                    QQBrowser: function QQBrowser() {
                        return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1');
                    },
                    QQ: function QQ() {
                        return u.replace(/^.*QQ\/([\d.]+).*$/, '$1');
                    },
                    Baidu: function Baidu() {
                        return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1');
                    },
                    UC: function UC() {
                        return u.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1');
                    },
                    Sogou: function Sogou() {
                        return u.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1');
                    },
                    LBBROWSER: function LBBROWSER() {
                        var hash = {
                            '57': '6.5',
                            '49': '6.0',
                            '46': '5.9',
                            '42': '5.3',
                            '39': '5.2',
                            '34': '5.0',
                            '29': '4.5',
                            '21': '4.0'
                        };
                        var chrome_vision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1');
                        return hash[chrome_vision] || '';
                    },
                    '2345Explorer': function Explorer() {
                        return u.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1');
                    },
                    TheWorld: function TheWorld() {
                        return u.replace(/^.*TheWorld ([\d.]+).*$/, '$1');
                    },
                    XiaoMi: function XiaoMi() {
                        return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1');
                    },
                    Quark: function Quark() {
                        return u.replace(/^.*Quark\/([\d.]+).*$/, '$1');
                    },
                    Qiyu: function Qiyu() {
                        return u.replace(/^.*Qiyu\/([\d.]+).*$/, '$1');
                    },
                    Wechat: function Wechat() {
                        return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1');
                    },
                    Taobao: function Taobao() {
                        return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1');
                    },
                    Alipay: function Alipay() {
                        return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1');
                    },
                    Weibo: function Weibo() {
                        return u.replace(/^.*weibo__([\d.]+).*$/, '$1');
                    },
                    Douban: function Douban() {
                        return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1');
                    },
                    Suning: function Suning() {
                        return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1');
                    },
                    iQiYi: function iQiYi() {
                        return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1');
                    }
                };
                _this.browserVersion = '';
                if (browerVersionMap[_this.browser]) {
                    _this.browserVersion = browerVersionMap[_this.browser]();
                    if (_this.browserVersion == u) {
                        _this.browserVersion = '';
                    }
                }

                if (_this.browser == 'Edge') {
                    _this.engine = 'EdgeHTML';
                }
                if (_this.browser == 'Chrome' && parseInt(_this.browserVersion) > 27) {
                    _this.engine = 'Blink';
                }
                if (_this.browser == 'Opera' && parseInt(_this.browserVersion) > 12) {
                    _this.engine = 'Blink';
                }
                if (_this.browser == 'Yandex') {
                    _this.engine = 'Blink';
                }

                return _this.browser + '（版本: ' + _this.browserVersion + '&nbsp;&nbsp;内核: ' + _this.engine + '）';
            }
        };
    }();
    // 逻辑层
    var LogicLibrary = function () {
        return {
            DeviceInfoObj: function DeviceInfoObj(params) {
                params = params || { domain: '' };
                var info = {
                    deviceType: MethodLibrary.getDeviceType(), // 设备类型
                    OS: MethodLibrary.getOS(), // 操作系统
                    OSVersion: MethodLibrary.getOSVersion(), // 操作系统版本
                    screenHeight: _window.screen.height, // 屏幕高
                    screenWidth: _window.screen.width, // 屏幕宽
                    language: MethodLibrary.getLanguage(), // 当前使用的语言-国家
                    netWork: MethodLibrary.getNetwork(), // 联网类型
                    orientation: MethodLibrary.getOrientationStatu(), // 横竖屏
                    browserInfo: MethodLibrary.getBrowserInfo(), // 浏览器信息
                    fingerprint: MethodLibrary.createFingerprint(params.domain), // 浏览器指纹
                    userAgent: VariableLibrary.navigator.userAgent // 包含 appCodeName,appName,appVersion,language,platform 等
                };
                if (!params.info || params.info.length == 0) {
                    return info;
                }
                var infoTemp = {};
                for (var i in info) {
                    params.info.forEach(function (item) {
                        if (item.toLowerCase() == i.toLowerCase()) {
                            item = i;
                            infoTemp[item] = info[item];
                        }
                    });
                }
                return infoTemp;
            }
        };
    }();
    // 对外暴露方法
    return {
        getDeviceInfo: function getDeviceInfo(params) {
            return LogicLibrary.DeviceInfoObj(params);
        }
    };
}();

exports.default = DeviceInfo;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(20);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    type: function type(obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    },
    isFunction: function isFunction(func) {
        return this.type(func) === "Function";
    },
    isArray: function isArray(list) {
        return this.type(list) === 'Array';
    },


    /**
     * 是否为null
     * @param {String} str 
     */
    isNull: function isNull(str) {
        return str == undefined || str == '' || str == null;
    },


    /**
     * 对象是否为空
     * @param {*} obj 
     */
    objectIsNull: function objectIsNull(obj) {
        return (0, _stringify2.default)(obj) === "{}";
    },


    /**
     * 是否是对象
     * @param {*} obj 
     */
    isObject: function isObject(obj) {
        return this.type(obj) === "Object";
    }
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// import API from './api.js';

/**
 * 消息队列
 */
var TaskQueue = {
  /**
   * 是否停止fire
   */
  isStop: true,

  /**
   * 待处理消息列表
   */
  queues: [],

  /**
   * 添加消息
   * @param {*} reportUrl 上报url
   * @param {*} data 上报数据
   */
  add: function add(callback, data) {
    this.queues.push({ callback: callback, data: data });
  },

  /**
   * 统一上报
   */
  fire: function fire() {
    if (!this.queues || this.queues.length === 0) {
      this.isStop = true;
      return;
    }
    this.isStop = false;
    var item = this.queues[0];
    // item.reportUrl && new API(item.reportUrl).report(item.data);
    item.callback && item.callback(item.data);
    this.queues.splice(0, 1);
    this.fire(); //递归
  }
};

exports.default = TaskQueue;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(104);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(14);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(15);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _baseMonitor = __webpack_require__(18);

var _baseMonitor2 = _interopRequireDefault(_baseMonitor);

var _baseConfig = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * console.error异常
 */
var ConsoleError = function (_BaseMonitor) {
    (0, _inherits3.default)(ConsoleError, _BaseMonitor);

    function ConsoleError(params) {
        (0, _classCallCheck3.default)(this, ConsoleError);
        return (0, _possibleConstructorReturn3.default)(this, (ConsoleError.__proto__ || (0, _getPrototypeOf2.default)(ConsoleError)).call(this, params));
    }

    /**
     * 处理console事件
     */


    (0, _createClass3.default)(ConsoleError, [{
        key: "handleError",
        value: function handleError() {
            this.registerInfo();
            this.registerWarn();
            this.registerError();
        }

        /**
         * 处理信息
         */

    }, {
        key: "registerInfo",
        value: function registerInfo() {
            var t = this;
            console.tInfo = function () {
                t.handleLog(_baseConfig.ErrorLevelEnum.INFO, _baseConfig.ErrorCategoryEnum.CONSOLE_INFO, arguments);
            };
        }

        /**
         * 处理警告
         */

    }, {
        key: "registerWarn",
        value: function registerWarn() {
            var t = this;
            console.tWarn = function () {
                t.handleLog(_baseConfig.ErrorLevelEnum.WARN, _baseConfig.ErrorCategoryEnum.CONSOLE_WARN, arguments);
            };
        }

        /**
         * 处理错误
         */

    }, {
        key: "registerError",
        value: function registerError() {
            var t = this;
            console.tError = function () {
                t.handleLog(_baseConfig.ErrorLevelEnum.ERROR, _baseConfig.ErrorCategoryEnum.CONSOLE_ERROR, arguments);
            };
        }

        /**
         * 处理日志
         */

    }, {
        key: "handleLog",
        value: function handleLog(level, category, args) {
            try {
                this.level = level;
                var params = [].concat((0, _toConsumableArray3.default)(args));
                this.msg = params.join("\r\n"); //换行符分割
                this.url = location.href; //当前地址
                this.category = category;
                this.recordError();
            } catch (error) {
                console.log("console统计错误异常", level, error);
            }
        }
    }]);
    return ConsoleError;
}(_baseMonitor2.default);

/**
 * 初始化console事件
 */


(function () {
    //创建空console对象，避免JS报错  
    if (!window.console) {
        window.console = {};
    }
    var funcs = ['tInfo', 'tWarn', 'tError'];
    funcs.forEach(function (func, index) {
        if (!console[func]) {
            console[func] = function () {};
        }
    });
})();

exports.default = ConsoleError;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(105);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(107);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(27);
var $export = __webpack_require__(4);
var toObject = __webpack_require__(21);
var call = __webpack_require__(108);
var isArrayIter = __webpack_require__(109);
var toLength = __webpack_require__(49);
var createProperty = __webpack_require__(110);
var getIterFn = __webpack_require__(111);

$export($export.S + $export.F * !__webpack_require__(113)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(11);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(22);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(6);
var createDesc = __webpack_require__(19);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(112);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(22);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(34);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(14);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(15);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _baseMonitor = __webpack_require__(18);

var _baseMonitor2 = _interopRequireDefault(_baseMonitor);

var _baseConfig = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 捕获JS错误
 */
var JSError = function (_BaseMonitor) {
    (0, _inherits3.default)(JSError, _BaseMonitor);

    function JSError(params) {
        (0, _classCallCheck3.default)(this, JSError);
        return (0, _possibleConstructorReturn3.default)(this, (JSError.__proto__ || (0, _getPrototypeOf2.default)(JSError)).call(this, params));
    }

    /**
     * 注册onerror事件
     */


    (0, _createClass3.default)(JSError, [{
        key: "handleError",
        value: function handleError() {
            var _this2 = this;

            window.onerror = function (msg, url, line, col, error) {
                try {
                    _this2.level = _baseConfig.ErrorLevelEnum.WARN;
                    _this2.category = _baseConfig.ErrorCategoryEnum.JS_ERROR;
                    _this2.msg = msg;
                    _this2.url = url;
                    _this2.line = line;
                    _this2.col = col;
                    _this2.errorObj = error;
                    _this2.recordError();
                } catch (error) {
                    console.log("js错误异常", error);
                }
            };
        }
    }]);
    return JSError;
}(_baseMonitor2.default);

exports.default = JSError;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(14);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(15);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _baseMonitor = __webpack_require__(18);

var _baseMonitor2 = _interopRequireDefault(_baseMonitor);

var _baseConfig = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 捕获未处理的Promise异常
 */
var PromiseError = function (_BaseMonitor) {
    (0, _inherits3.default)(PromiseError, _BaseMonitor);

    function PromiseError(params) {
        (0, _classCallCheck3.default)(this, PromiseError);
        return (0, _possibleConstructorReturn3.default)(this, (PromiseError.__proto__ || (0, _getPrototypeOf2.default)(PromiseError)).call(this, params));
    }

    /**
     * 处理错误
     */


    (0, _createClass3.default)(PromiseError, [{
        key: "handleError",
        value: function handleError() {
            var _this2 = this;

            window.addEventListener('unhandledrejection', function (event) {
                try {
                    if (!event || !event.reason) {
                        return;
                    }
                    //判断当前被捕获的异常url，是否是异常处理url，防止死循环
                    if (event.reason.config && event.reason.config.url) {
                        _this2.url = event.reason.config.url;
                    }
                    _this2.level = _baseConfig.ErrorLevelEnum.WARN;
                    _this2.category = _baseConfig.ErrorCategoryEnum.PROMISE_ERROR;
                    _this2.msg = event.reason;
                    _this2.recordError();
                } catch (error) {
                    console.log(error);
                }
            }, true);
        }
    }]);
    return PromiseError;
}(_baseMonitor2.default);

exports.default = PromiseError;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(14);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(15);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _baseMonitor = __webpack_require__(18);

var _baseMonitor2 = _interopRequireDefault(_baseMonitor);

var _baseConfig = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 资源加载错误
 */
var ResourceError = function (_BaseMonitor) {
    (0, _inherits3.default)(ResourceError, _BaseMonitor);

    function ResourceError(params) {
        (0, _classCallCheck3.default)(this, ResourceError);
        return (0, _possibleConstructorReturn3.default)(this, (ResourceError.__proto__ || (0, _getPrototypeOf2.default)(ResourceError)).call(this, params));
    }

    /**
     * 注册onerror事件
     */


    (0, _createClass3.default)(ResourceError, [{
        key: "handleError",
        value: function handleError() {
            var _this2 = this;

            window.addEventListener('error', function (event) {
                try {
                    if (!event) {
                        return;
                    }
                    _this2.category = _baseConfig.ErrorCategoryEnum.RESOURCE_ERROR;
                    var target = event.target || event.srcElement;
                    var isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
                    if (!isElementTarget) {
                        return; // js error不再处理
                    }
                    _this2.level = target.tagName.toUpperCase() === 'IMG' ? _baseConfig.ErrorLevelEnum.WARN : _baseConfig.ErrorLevelEnum.ERROR;
                    _this2.msg = "加载 " + target.tagName + " 资源错误";
                    _this2.url = target.src || target.href;
                    _this2.errorObj = target;
                    _this2.recordError();
                } catch (error) {
                    console.log("资源加载收集异常", error);
                }
            }, true);
        }
    }]);
    return ResourceError;
}(_baseMonitor2.default);

exports.default = ResourceError;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(20);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(14);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(15);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _baseMonitor = __webpack_require__(18);

var _baseMonitor2 = _interopRequireDefault(_baseMonitor);

var _baseConfig = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * vue错误
 */
var VueError = function (_BaseMonitor) {
    (0, _inherits3.default)(VueError, _BaseMonitor);

    function VueError(params) {
        (0, _classCallCheck3.default)(this, VueError);
        return (0, _possibleConstructorReturn3.default)(this, (VueError.__proto__ || (0, _getPrototypeOf2.default)(VueError)).call(this, params));
    }

    /**
     * 处理Vue错误提示
     */


    (0, _createClass3.default)(VueError, [{
        key: "handleError",
        value: function handleError(Vue) {
            var _this2 = this;

            if (!Vue) {
                return;
            }
            Vue.config.errorHandler = function (error, vm, info) {
                try {
                    var metaData = {
                        message: error.message,
                        stack: error.stack,
                        info: info
                    };
                    if (Object.prototype.toString.call(vm) === '[object Object]') {
                        metaData.componentName = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
                        metaData.propsData = vm.$options.propsData;
                    }
                    _this2.level = _baseConfig.ErrorLevelEnum.WARN;
                    _this2.msg = (0, _stringify2.default)(metaData);
                    _this2.category = _baseConfig.ErrorCategoryEnum.VUE_ERROR;
                    _this2.recordError();
                } catch (error) {
                    console.log("vue错误异常", error);
                }
            };
        }
    }]);
    return VueError;
}(_baseMonitor2.default);

exports.default = VueError;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(20);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 * Date()).format("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份         
        "d+": this.getDate(), //日         
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
        "H+": this.getHours(), //小时         
        "m+": this.getMinutes(), //分         
        "s+": this.getSeconds(), //秒         
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
        "S": this.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468" : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return fmt;
};

exports.default = {
    type: function type(obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    },
    isFunction: function isFunction(func) {
        return this.type(func) === "Function";
    },
    isArray: function isArray(list) {
        return this.type(list) === 'Array';
    },


    /**
     * 是否为null
     * @param {String} str 
     */
    isNull: function isNull(str) {
        return str == undefined || str == '' || str == null;
    },


    /**
     * 对象是否为空
     * @param {*} obj 
     */
    objectIsNull: function objectIsNull(obj) {
        return (0, _stringify2.default)(obj) === "{}";
    },


    /**
     * 是否是对象
     * @param {*} obj 
     */
    isObject: function isObject(obj) {
        return this.type(obj) === "Object";
    }
};

/***/ })
/******/ ]);
});