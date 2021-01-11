
/** 
 * 请求方式： get post put del all 
 * 这里如果不指定请求方式，默认为 all 
 * 如果需要指定把注释打开，修改成你要指定的请求方式
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