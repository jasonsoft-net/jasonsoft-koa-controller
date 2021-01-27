
/**
 * 注入控制器
 * Add by Jason.Song on 2020/01/16
 * 
 * 示例：
`

import Koa from 'koa';

import Router from '@koa/router';

import controller from 'jasonsoft-koa-controller';

const app = new Koa();

const router = new Router();

// 注入控制器 默认路由控制器路径 'src/controllers'

controller(router);

// 注入控制器 自定义路径

controller(router, 'src/controllers');

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);

`
 * 
 * @param router  @koa/router or koa-router
 * @param dir     控制器目录路径，默认'src/controllers'
 * @param debug   打印日志，默认不打印 false
 */
export default function controller(router: any, dir?: string, debug?: boolean): void;