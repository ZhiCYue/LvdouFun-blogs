'use strict';

const Controller = require('egg').Controller;

let num = 201;

class ClickController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      total: num ++
    }
    ctx.status = 200
    ctx.set('Content-Type', 'application/json');
    
  }
}

module.exports = ClickController;
