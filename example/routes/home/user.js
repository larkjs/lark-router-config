'use strict';

module.exports = async (ctx) => {
    const name = ctx.params.name;
    ctx.body = `/home/user name = ${name}`;
};
