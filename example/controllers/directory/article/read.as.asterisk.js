'use strict';

exports.GET = async (ctx, next) => {
    ctx.body = '/article/read title = ' + ctx.params.read;
    await next();
};
