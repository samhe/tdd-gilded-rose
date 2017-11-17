'use strict'
const TyphoonService = require('../service/typhoon.server.service');

exports.search = function(req, res) {
  let returnResult = function(result) {
    return res.json(result);
  };
  TyphoonService.getTheLatestTyphoon().then(returnResult).catch((err) => {
    console.log('[Typhoon] getLatestTyphoon error.', err);
    return res.json([]);
  });
};
