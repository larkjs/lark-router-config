# lark-router-config
Config lark routers in an easy way

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
exports.DEL = async (ctx, next) => {...}
```
