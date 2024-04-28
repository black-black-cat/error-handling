import { AjaxError, ConsoleError, JsError, PromiseError, ResourceError, VueError } from './error';
import { AjaxLibEnum } from './base/baseConfig.js';
import './utils/extends';

class MonitorJS {
    constructor() {
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
    init(options) {
        options = options || {};
        this.jsError = !(options.jsError === false);
        this.promiseError = !(options.promiseError === false);
        this.resourceError = !(options.resourceError === false);
        this.ajaxError = !(options.ajaxError === false);
        this.consoleError = options.consoleError === true; //显式配置
        this.vueError = options.vueError === true; //显式配置
        let reportUrl = options.url; //上报错误地址
        let extendsInfo = options.extendsInfo || {}; //扩展信息（一般用于系统个性化分析）
        const callback = options.callback;
        let param = { reportUrl, extendsInfo, callback };
        if (this.jsError) {
            new JsError(param).handleError();
        }
        if (this.promiseError) {
            new PromiseError(param).handleError();
        }
        if (this.resourceError) {
            new ResourceError(param).handleError();
        }
        if (this.ajaxError) {
            new AjaxError(param).handleError(AjaxLibEnum.DEFAULT);
        }
        if (this.consoleError) {
            new ConsoleError(param).handleError();
        }
        if (this.vueError && options.vue) {
            new VueError(param).handleError(options.vue);
        }
    }
}

export default MonitorJS;
