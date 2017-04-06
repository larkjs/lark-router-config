'use strict';

module.exports = async (ctx, next) => {
    const name = ctx.params.name;
    ctx.body = `/home/profile name = ${name}`;
    await next();
};
