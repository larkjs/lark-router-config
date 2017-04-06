'use strict';

exports.GET = async (ctx, next) => {
    ctx.body = '/welcome';
    await next();
};
