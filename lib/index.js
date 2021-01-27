const fs = require('fs');
const os = require('os');
const path = require('path');


/**
 * 注入控制器
 * Add by Jason.Song on 2020/01/16
 * @param {any}     router  @koa/router or koa-router
 * @param {string}  dir     控制器目录路径，默认'src/controllers'
 * @param {boolean} debug   打印日志，默认不打印 false
 */
function controller(router, dir = 'src/controllers', debug = false) {
  /** 项目根目录路径 */
  let project_dir = path.resolve();
  if (debug) {
    console.log('project_dir:', project_dir);
  }
  /** 注入指定目录下的所有控制器 */
  injectControllers(router, path.join(project_dir, dir), debug);
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
  fs.readdirSync(dir).forEach((file) => {
    if (debug) {
      console.log('file:', file);
    }
    /** 控制器完整路径 */
    let fullPath = path.join(dir, file);
    if (debug) {
      console.log('fullPath:', fullPath);
    }
    /** 针对制定的规则进行匹配 */
    let regTxt = /(.*)\.(j|t)s$/;
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
      let controllerPath = tempPath ? path.join('/', tempPath, controllerName) : path.join('/', controllerName);

      // 判断是否是win环境
      if (os.platform() === 'win32') {
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
      if (handle.default instanceof Function) {
        let method = handle.method || 'all';
        router[method](controllerPath, handle.default);
      }

      if (debug) {
        console.log('----------- End -------------');
      }
    } else {
      /** 判断当前地址是否为文件夹 */
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        let tempSubPath = tempPath ? path.join(tempPath, file) : file;
        if (debug) {
          console.log('tempSubPath:', tempSubPath);
        }

        /** 遍历子目录下的控制器 */
        injectControllers(router, fullPath, debug, tempSubPath);
      }
    }
  });
}


module.exports = controller;