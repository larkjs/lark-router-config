'use strict';

module.exports = async (ctx, next) => {
    const name = ctx.params.name;
    ctx.body = `/home/user name = ${name}`;
    await next();
};
