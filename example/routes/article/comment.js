'use strict';

module.exports = async (ctx, next) => {
    ctx.body = '/article/comment';
    await next();
};
