/**
 * Example of lark-router-config
 **/
'use strict';
process.mainModule = module;

const Koa           = require('koa');
const LarkRouter    = require('lark-router');
const RouterConfig  = require('..');

const app    = new Koa();
const router = new LarkRouter();

const routes = new RouterConfig();
routes.use('routes.yaml');
routes.use('controllers');
routes.inject(RouterConfig.PROXY(router));

module.exports = app.use(router.routes()).listen(3000);
