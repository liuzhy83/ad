var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var config = require('../config');
var logger = require('../common/logger');

var connect = mongoose.connect(config.mongodb.url, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        logger.error('connect to %s error: ', config.mongodb.url, err.message);
        process.exit(1);
    }else{

    }
});

require('./LinkStatistics');
require('./LinkedLog');

exports.LinkStatistics = mongoose.model('LinkStatistics');
exports.LinkedLog = mongoose.model('LinkedLog');