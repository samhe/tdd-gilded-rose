'use strict';
var typhoonCtrl = require('../controller/typhoon.server.controller');

module.exports = function(app) {
  app.route('/api/typhoon')
    .get(typhoonCtrl.search);
};
