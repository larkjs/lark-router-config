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

async function main() {
    const routes = new RouterConfig();
    await routes.use('routes.yaml');
    await routes.use('controllers');

    routes.inject(router, {
        proxy(handler) {
            return async (ctx) => {
                if (handler.isClass) {
                    handler = new handler();
                    return await handler.main(ctx);
                }
                await handler(ctx);
            };
        }
    });
    routes.inject(router2);

    return app.use(router.routes()).listen(3000);
}

module.exports = main;
