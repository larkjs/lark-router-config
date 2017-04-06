'use strict';

exports.GET = async (ctx) => {
    const name = ctx.params.user;
    ctx.body = `/home/user name = ${name}`;
};
