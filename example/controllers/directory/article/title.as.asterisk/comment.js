'use strict';

exports.POST = async (ctx) => {
    ctx.body = '/article/comment on ' + ctx.params.title;
};
