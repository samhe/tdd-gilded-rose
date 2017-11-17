'use strict'
const TyphoonService = require('../service/typhoon.server.service');
const co = require('co');

exports.search = function(req, res) {
  co(function*() {
    let result = [];
    try {
      result = yield TyphoonService.getTheLatestTyphoon();
    } catch (error) {
      console.log('[Typhoon] getLatestTyphoon error.', err);
    } finally {
      res.json(result);
    }
  });
};
