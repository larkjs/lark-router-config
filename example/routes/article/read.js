'use strict';

module.exports = async (ctx, next) => {
    ctx.body = '/article/read';
    await next();
};
