import { readdirSync, statSync } from 'fs';
import { platform } from 'os';
import { join } from 'path';

/**
 * 注入控制器
 * Add by Jason.Song on 2020/01/16
 */
export default (router, dir, debug = false) => {
  /** 具体控制器目录路径 */
  let controllers_dir = dir || '../src/controllers';
  /** 注入指定目录下的所有控制器 */
  injectControllers(router, join(__dirname, '/', controllers_dir), debug);
};

/**
 * 注入指定目录下的所有控制器
 * Add by Jason.Song on 2020/01/16
 * @param {object}  router    路由
 * @param {string}  dir       目录
 * @param {boolean} debug     打印日志
 * @param {string}  tempPath  子目录
 */
function injectControllers(router, dir, debug, tempPath) {
  readdirSync(dir).forEach((file) => {
    if (debug) {
      console.log('file:', file);
    }
    /** 控制器完整路径 */
    let fullPath = join(dir, file);
    if (debug) {
      console.log('fullPath:', fullPath);
    }
    /** 针对制定的规则进行匹配 */
    // let regTxt = /(.*)\.([a-z]+)\.js/;
    let regTxt = /(.*)\.js$/;
    if (regTxt.test(file)) {
      if (debug) {
        console.log('----------- Begin -----------');
      }

      let m = file.match(regTxt);
      // 控制器名称
      let controllerName = m[1];
      if (debug) {
        console.log('controllerName:', controllerName);
      }
      // 控制器路径
      let controllerPath = tempPath ? join('/', tempPath, controllerName) : join('/', controllerName);

      // 判断是否是win环境
      if (platform() === 'win32') {
        controllerPath = controllerPath.replace(/\\/g, '/');
      }
      if (debug) {
        console.log('controllerPath:', controllerPath);
      }
      // 加载具体方法
      let handle = require(fullPath);
      if (debug) {
        console.log('handle:', handle);
      }
      // 绑定至路由
      if (handle instanceof Function) {
        // console.log('controllerPath: ', controllerPath);
          router.all(controllerPath, handle);
      }

      if (debug) {
        console.log('----------- End -------------');
      }
    } else {
      /** 判断当前地址是否为文件夹 */
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        let tempSubPath = tempPath ? join(tempPath, file) : file;
        if (debug) {
          console.log('tempSubPath:', tempSubPath);
        }

        /** 遍历子目录下的控制器 */
        injectControllers(router, fullPath, debug, tempSubPath);
      }
    }
  });
}
