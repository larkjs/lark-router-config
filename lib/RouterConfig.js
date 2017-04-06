/**
 * Lark Router Config
 **/
'use strict';

const assert        = require('assert');
const extend        = require('extend');
const escapeRegexp  = require('escape-string-regexp');
const misc          = require('vi-misc');
const path          = require('path');
const LarkConfig    = require('lark-config')

class RouterConfig {

    constructor(...args) {
        this.config = new LarkConfig();
        this.use(...args);
    }

    use(config) {
        this.config.use(config);
        return this;
    }

    inject(processor) {
        assert(processor instanceof Function, 'Injector must be a function');
        each(processor, this.config.config);
    }

    static PROXY(router, options = {}) {
        return ({ route, item, key, prefix }) => {
            switch (true) {
            case 'string' === typeof item:
                return proxyConfig(router, { route, item }, options);
            case item instanceof Function:
            default:
                return proxyHandler(router, { route, item, key, prefix }, options);
            }
        };
    }
}

function proxyConfig(router, {route, item}, options) {
    const directory = options.directory || 'routes';
    const filepath = route;
    item = item.trim().split(/\s+/);
    const method = item[0];
    route  = item[1];
    router.route(method, route, require(misc.path.absolute(path.join(directory, filepath))));
}

function proxyHandler(router, { route, item, key, prefix }, options) {
    const method = key;
    const paramMark = escapeRegexp(options.param || '.as.param');
    const asteriskMark = escapeRegexp(options.asterisk || '.as.asterisk');
    route = misc.path.split(prefix)
                .map(routeItem => routeItem.replace(new RegExp(`^(.*)${paramMark}$`), ':$1'))
                .map(routeItem => routeItem.replace(new RegExp(`^(.*)${asteriskMark}$`), ':$1*'))
                .join('/');
    route = '/' + route;
    router.route(method, route, item);
}

function each(processor, object, prefix = null) {
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
