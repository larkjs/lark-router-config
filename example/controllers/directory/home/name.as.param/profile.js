'uyamlse strict';

exports.GET = async (ctx) => {
    const name = ctx.params.name;
    ctx.body = `/home/profile name = ${name}`;
};
