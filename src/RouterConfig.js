/**
 * Lark Router Config
 **/
'use strict';

const assert        = require('assert');
const debug         = require('debug')('lark-router-config');
const escapeRegexp  = require('escape-string-regexp');
const misc          = require('vi-misc');
const path          = require('path');
const LarkConfig    = require('lark-config');

class RouterConfig {

    constructor(options = {}) {
        debug('construct');
        assert(options instanceof Object, 'Invalid options, should be an object');
        this.config = new LarkConfig({ sep: path.sep });
    }

    async use(config, tags = []) {
        debug('using config');
        await this.config.use(config, tags);
        return this;
    }

    inject(router, options = {}) {
        debug('inject router');
        const processor = this._proxy(router, options);
        each(processor, this.config.config);
    }

    _proxy(router, options) {
        debug('proxy router');
        return ({ route, item, key, prefix }) => {
            switch (true) {
            case 'string' === typeof item:
                return this._proxyConfig(router, { route, item }, options);
            case item instanceof Function:
            default:
                return this._proxyHandler(router, { route, item, key, prefix }, options);
            }
        };
    }
    _proxyConfig(router, {route, item}, options) {
        debug('proxy config');
        const directory = options.directory || '';
        const filepath = route;
        item = item.trim().split(/\s+/);
        const method = item[0].toLowerCase();
        route  = item[1];
        let handler = require(misc.path.absolute(path.join(directory, filepath)));
        handler = options.proxy instanceof Function ? options.proxy(handler) : handler;
        router[method](route, handler);
    }
    _proxyHandler(router, { route, item, key, prefix }, options) {
        debug('proxy handler');
        const method = key.toLowerCase();
        const paramMark = escapeRegexp(options.param || '.as.param');
        const asteriskMark = escapeRegexp(options.asterisk || '.as.asterisk');
        debug('original', route);
        route = misc.path.split(prefix)
            .map(routeItem => routeItem.replace(new RegExp(`^(.*)${paramMark}$`), ':$1'))
            .map(routeItem => routeItem.replace(new RegExp(`^(.*)${asteriskMark}$`), ':$1*'))
            .join('/');
        route = '/' + route;
        let handler = item;
        handler = options.proxy instanceof Function ? options.proxy(handler) : handler;
        debug(`add [${method}] ${route}`);
        router[method](route, handler);
    }
}

function each(processor, object, prefix = '') {
    const keys = Object.keys(object);
    for (let key of keys) {
        const route = prefix ? path.join(prefix, key) : key;
        const item = object[key];
        if (item instanceof Object && item.constructor.name === 'Object') {
            each(processor, item, route);
            continue;
        }
        processor({ route, item, key, prefix });
    }
}

module.exports = RouterConfig;
