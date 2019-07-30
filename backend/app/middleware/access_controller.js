'use strict';

module.exports = () => {
  return async function accessControl(ctx, next) {

    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);

    await next()
  };
};
