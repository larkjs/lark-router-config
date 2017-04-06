'use strict';

exports.POST = async (ctx, next) => {
    ctx.body = '/article/comment on ' + ctx.params.title;
    await next();
};
