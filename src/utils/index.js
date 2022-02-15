import FileSaver from 'file-saver';

/**
 * 常用工具类
 */
export default class CommonUtils {
  /**
   * 获取localstorage
   * @param { String } key
   * @return { }
   */
  static getLocalStorage(key) {
    const storage = window.localStorage;
    if (!storage) {
      window.alert('您的浏览器不支持localstorage');
      return false;
    }
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : false;
  }

  /**
   * 设置localstorage
   * @param { String } key
   * @param { String } value
   * @return {}
   */
  static setLocalStorage(key, value) {
    const storage = window.localStorage;
    if (!storage) {
      window.alert('您的浏览器不支持localstorage');
      return false;
    }

    storage.setItem(key, JSON.stringify(value));
  }

  /**
   * 清除localstorage
   * @param { String } key
   * @return {}
   */
  static removeLocalStorage(key) {
    const storage = window.localStorage;
    if (!storage) {
      window.alert('您的浏览器不支持localstorage');
      return false;
    }

    storage.removeItem(key);
  }

  /**
   * 保存数据到本地
   * @param {Object} options
   */
  static saveFileToLocal(options) {
    const { content, type, name } = options;
    const _type = type || 'text/plain;charset=utf-8';
    FileSaver.saveAs(new Blob([content], { type: _type }), name);
  }

  /**
   * 生成guid
   */
  static createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      let v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * 获取当前时间戳后几位
   * @param {Number} n
   */
  static getDateNum(n) {
    return (Date.now() + '').slice(-(n || 2));
  }

  /**
   * 导出文本字符串为本地文件
   * @param {String} content
   * @param {String} name
   */
  static exportStringToFile(content, name) {
    const eleLink = document.createElement('a');
    eleLink.download = name;
    eleLink.style.display = 'none';
    const blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  }

  /**
   * 颜色字符串转对象
   * @param {String} str
   */
  static getRgbaNumber(str) {
    let arr = (str || '').replace(/\s/g, '').match(/(\d+),(\d+),(\d+),(.+)\)/) || [0, 255, 255, 255, 1];
    arr[4] = parseInt(arr[4] * 255);
    arr = arr.map((c) => +c);
    return arr.slice(1);
  }

  /**
   * 颜色对象转字符串
   * @param {Object} obj 对象转字符串
   */
  static getRgbaNumber2(obj) {
    let { red, green, blue, alpha } = obj || {
      red: 255,
      green: 255,
      blue: 255,
      alpha: 255,
    };
    alpha = (alpha / 255).toFixed(2);
    return `rgba(${red},${green},${blue},${alpha})`;
  }

  /**
   * 获取rgba中的数值
   * @param {String} str 透明度为255
   */
  static getRgbaNumber3(str) {
    return this.getRgbaNumber(str);
  }

  /**
   * 地址token切换 [用户令牌]
   * @param url
   * @param token
   * @return {void | string | *}
   */
  static urlRegexpToken(url, token) {
    // eslint-disable-next-line no-useless-escape
    url = url.replace(/\[[^\)]*\]/g, token);
    return url;
  }

  /**
   * 下载json数据
   * @param {Object} data
   * @param {String} filename
   * @param {Boolean} isDownload
   * @returns
   */
  static saveJSON(data, filename, isDownload = true) {
    if (!data) {
      alert('保存的数据为空');
      return;
    }
    if (!filename) filename = 'json.json';
    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 2);
    }
    // 要创建一个 blob 数据
    const blob = new Blob([data], { type: 'text/json' });
    if (isDownload === false) return blob;
    const a = document.createElement('a');
    a.download = filename;

    // 将blob转换为地址
    // 创建 URL 的 Blob 对象
    a.href = window.URL.createObjectURL(blob);

    // 标签 data- 嵌入自定义属性  屏蔽后也可正常下载
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');

    // 添加鼠标事件
    const event = new MouseEvent('click', {});

    // 向一个指定的事件目标派发一个事件
    a.dispatchEvent(event);
    a.remove();
  }

  /**
   * 防抖 首次不执行
   * @param {Function} fn
   * @param {Number} time
   * @returns
   */
  static debounce(fn, time) {
    let timeout;

    return function (...args) {
      const context = this;
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        fn.apply(context, args);
        timeout = null;
      }, time);
    };
  }

  /**
   * vue防抖
   * @param fnName
   * @param time
   * @return {function(...[*]=)}
   * @constructor
   */
  static VueDebounce(fnName, time) {
    let timeout = null;
    return function () {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        this[fnName]();
      }, time);
    };
  }
}
