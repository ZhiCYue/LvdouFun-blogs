'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async click() {
    const { ctx } = this;
    ctx.body = {
      total: 233
    }
    // ctx.status = 200
  }
}

module.exports = HomeController;
