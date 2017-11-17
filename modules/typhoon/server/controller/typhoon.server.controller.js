'use strict'
const TyphoonService = require('../service/typhoon.server.service');

exports.search = function(req, res) {
  let returnResult = function(err, result) {
    if(err) {
      console.log('[Typhoon] getLatestBatch error.', err);
      return res.json([]);
    } else {
      return res.json(result);
    }
  };
  TyphoonService.getTheLatestTyphoon(returnResult);
};
