'use strict';

const _ = require('lodash');
require('../model/typhoon.server.model');
const moment = require('moment');
const mongoose = require('mongoose');
const	Typhoon = mongoose.model('typhoon');
let latestBatchQuery = [
  {
    $match: {
      FEATURE: 'Tropicals',
      TIMEDAY: { $gte: moment.utc().subtract(480, 'h').format('YYYYMMDDHH') },
      END_DATE: { $gte: moment.utc().subtract(240, 'h').toDate() },
      $or: [{ 'VALID_TIME': { $exists: true } }, { 'isCurrent': true }]
    }
  },
  {
    $sort: {
      FEATURE: 1, TIMEDAY: 1
    }
  },
  {
    $group: {
      _id: '$WEATHER_VALUE',
      lastTimeDay: { $last: '$TIMEDAY' }
    }
  },
  {
    $group: {
      _id: null,
      result: { $push: { WEATHER_VALUE: '$_id', TIMEDAY: '$lastTimeDay' } }
    }
  }
];
function getDataAggrQuery(latestBatches) {
  let dataAggrQuery = [
    {
      $match: {
        'FEATURE': 'Tropicals',
        $and: [
          { $or: [] },
          { $or: [{ 'VALID_TIME': { $exists: true } }, { 'isCurrent': true }] }
        ]
      }
    },
    {
      $sort: {
        FEATURE: 1, TIMEDAY: 1, VALID_TIME: 1
      }
    },
    {
      $group: {
        _id: {
          name: '$WEATHER_VALUE',
          FEATURE: '$FEATURE',
          TIMEDAY: '$TIMEDAY'
        },
        points: {
          $push: {
            WEATHER_LAYER: '$WEATHER_LAYER',
            HTML_VALUE: '$HTML_VALUE',
            VALID_TIME: {
              $cond: {
                if: { $and: [{ $eq: ['$isCurrent', true] }, { $eq: [ {$ifNull: ['$VALID_TIME', 'NOT_FOUND']}, 'NOT_FOUND'] }] },
                then: '$END_DATE',
                else: '$VALID_TIME'
              }
            },
            isCurrent: '$isCurrent',
            COORDS: '$COORDS', geo: '$geo'
          }
        }
      }
    },
    {
      $project: {
        name: '$_id.name',
        FEATURE: '$_id.FEATURE',
        TIMEDAY: '$_id.TIMEDAY',
        points: '$points'
      }
    }
  ];
  dataAggrQuery[0].$match.$and[0].$or = latestBatches;
  return dataAggrQuery;
}

exports.getTheLatestTyphoon = function(returnResult) {
  Typhoon.aggregate(latestBatchQuery).exec(function(err, latestBatchQueryResult) {
    if(err) {
      returnResult(err, []);
    }
    let latestBatches = _.get(latestBatchQueryResult[0], 'result');
    if(!_.isEmpty(latestBatches)) {
      let query = getDataAggrQuery(latestBatches);
      Typhoon.aggregate(query).exec(function(err, dataAggrResult) {
        returnResult(err, dataAggrResult);
      });
    } else {
      returnResult(null, []);
    }
  });
};
