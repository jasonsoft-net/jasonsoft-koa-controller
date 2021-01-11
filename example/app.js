import Koa from 'koa';
import Router from '@koa/router';
import controller from 'jasonsoft-koa-controller';
const app = new Koa();
const router = new Router();

/**
 * 注入控制器
 * Added by Jason.Song on 2021/01/11 19:53:10
 */
controller(router);
// 自定义路由控制器路径
// controller(router, 'src/controllers');
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);