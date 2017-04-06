'use strict';

module.exports = async (ctx, next) => {
    ctx.body = '/welcome';
    await next();
};
