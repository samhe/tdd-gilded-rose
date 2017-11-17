'use strict';

import axios from 'axios';
import {
  getServer
} from '../../_express/server/server';
let {
  app,
  db,
  server
} = getServer().getInstance();
import should from 'should';

require('../server/model/typhoon.server.model');
const mongoose = require('mongoose');
const Typhoon = mongoose.model('typhoon');

describe('Typhoon Data Query Test', () => {
  before('init request', (done) => {
    require('../server/route/typhoon.server.route')(app);
    let docs = require('./data/typhoon.data');
    Typhoon.remove({}, () => {
      Typhoon.insertMany(docs, () => {
        done();
      });
    });
  });
  it('Typhoon search result should equal to the expected.', (done) => {
    axios.get('http://localhost:3000/api/typhoon?ID=12345')
      .then(function (response) {
        let expectedResult = require('./data/typhoon.result.data');
        should.equal(response.data.length, expectedResult.length);
        done();
      });
  });
});
