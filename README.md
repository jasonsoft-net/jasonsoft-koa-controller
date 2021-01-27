![Project Icon][project-icon] jasonsoft-koa-controller
=================
@koa/router or koa-router extension controller

[![NPM version][npm-img]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]
[![License][license-img]][license-url]

[![NPM](https://nodei.co/npm/jasonsoft-koa-controller.png?stars&downloads)](https://nodei.co/npm/jasonsoft-koa-controller/)
[![NPM](https://nodei.co/npm-dl/jasonsoft-koa-controller.png)](https://nodei.co/npm/jasonsoft-koa-controller/)

### Installation

```sh
$ npm install jasonsoft-koa-controller --save-prod
```

**Example**  
Basic usage:

```javascript
import Koa from 'koa';
import Router from '@koa/router';
import controller from 'jasonsoft-koa-controller';

const app = new Koa();
const router = new Router();

// 注入控制器 默认路由控制器路径 'src/controllers'
controller(router);

// 注入控制器 自定义路径
// controller(router, 'src/controllers');

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
```

Create a test controller: 
```javascript
// 新建控制器 src/controllers/test.js

/** 
 * 请求方式： get post put del all 
 * 这里如果不指定请求方式，默认为 all 
 */
export const method = 'all'; 

/**
 * 测试API
 * http://localhost:3000/test
 * Added by Jason.Song on 2021/01/11 19:48:39
 */
export default (ctx, next) => {
  ctx.body = '测试API';
};
```
### [完整示例 Example](https://github.com/JasonSoft-Net/jasonsoft-koa-controller/tree/main/example)

### License

MIT


[npm-img]: https://img.shields.io/npm/v/jasonsoft-koa-controller.svg?style=flat-square

[npm-url]: https://npmjs.org/package/jasonsoft-koa-controller

[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square

[license-url]: LICENSE


[downloads-image]: https://img.shields.io/npm/dt/jasonsoft-koa-controller.svg?style=flat-square

[project-icon]: https://avatars2.githubusercontent.com/u/22167571?s=40&v=4