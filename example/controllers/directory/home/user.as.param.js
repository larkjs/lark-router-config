'use strict';

exports.GET = async (ctx, next) => {
    const name = ctx.params.user;
    ctx.body = `/home/user name = ${name}`;
    await next();
};
