lark-router-config
========

Config lark routers in an easy way

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![NPM downloads][downloads-image]][npm-url]
[![Node.js dependencies][david-image]][david-url]

## install 

```
$ npm install lark-router-config
```

## config router with a config file (.yaml or .json)

```
const Koa           = require('koa');
const Router        = require('koa-router');
const RouterConfig  = requrie('lark-router-config');

const app = new Koa();
const router = new Router();

const routes = new RouterConfig('routes.yaml');
routes.inject(RouterConfig.PROXY(router, { directory: 'routes' });

app.use(router.routes()).listen(3000);
```

Config file: _./routes.yaml_

```
welcome:    GET   /yaml/welcome
home:
  user:     GET   /yaml/home/:name
  profile:  GET   /yaml/home/:name/profile
article:
  read:     GET   /yaml/article/:title
  comment:  POST  /yaml/article/:title/comment
```

Directory _./routes_:

```
welcome.js
home/
  user.js
  profile.js
article/
  read.js
  comment.js
```
`LarkRouter` will load all files and add them into route rules.

## config router with a directory directly

```
const Koa           = require('koa');
const Router        = require('koa-router');
const RouterConfig  = requrie('lark-router-config');

const app = new Koa();
const router = new Router();

const routes = new RouterConfig('controllers');
routes.inject(RouterConfig.PROXY(router, { param: '.as.param', asterisk: '.as.asterisk' });

app.use(router.routes()).listen(3000);
```

Directory _./controllers_:

```
welcome.js                => /welcome
home/
  user.as.param.js        => /home/:user
  name.as.param/
    profile.js            => /home/:name/profile
article/
  read.as.asterisk.js     => /article/:read*
  title.as.asterisk/
    comment.js            => /article/:title*/comment
```

in _welcome.js_

```
exports.GET = async (ctx, next) => {...}
exports.POST = async (ctx, next) => {...}
```

[npm-image]: https://img.shields.io/npm/v/lark-router-config.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lark-router-config
[travis-image]: https://img.shields.io/travis/larkjs/lark-router-config/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/larkjs/lark-router-config
[downloads-image]: https://img.shields.io/npm/dm/lark-router-config.svg?style=flat-square
[david-image]: https://img.shields.io/david/larkjs/lark-router-config.svg?style=flat-square
[david-url]: https://david-dm.org/larkjs/lark-router-config
[coveralls-image]: https://img.shields.io/codecov/c/github/larkjs/lark-router-config.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/larkjs/lark-router-config
