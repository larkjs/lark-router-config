'use strict';

exports.GET = async (ctx) => {
    ctx.body = '/article/read title = ' + ctx.params.read;
};
