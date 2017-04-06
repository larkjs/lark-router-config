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
