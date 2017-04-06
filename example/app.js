/**
 * Example of lark-router-config
 **/
'use strict';
process.mainModule = module;

const Koa           = require('koa');
const Router        = require('koa-router');
const RouterConfig  = require('..');

const app     = new Koa();
const router  = new Router();
const router2 = new Router();

const routes = new RouterConfig();
routes.use('routes.yaml');
routes.use('controllers');

routes.inject(router, {
    execute: (handler) => async (ctx) => {
        if (handler.isClass) {
            handler = new handler();
            return await handler.main(ctx);
        }
        await handler(ctx);
    }
});
routes.inject(router2);

module.exports = app.use(router.routes()).listen(3000);
