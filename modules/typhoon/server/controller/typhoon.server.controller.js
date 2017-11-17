'use strict'
const TyphoonService = require('../service/typhoon.server.service');
const co = require('co');

exports.search = async function(req, res) {
  let result = [];
  try {
    result = await TyphoonService.getTheLatestTyphoon();
  } catch (error) {
    console.log('[Typhoon] getLatestTyphoon error.', error);
  } finally {
    res.json(result);
  }
};
