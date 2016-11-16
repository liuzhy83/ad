var logger = require('../common/logger').logger;
require('colors');

exports = module.exports = function (req, res, next) {

  var t = new Date();
  logger.info('Started', 'method:'+req.method, 'url:'+req.url, 'ip:'+req.ip);

  res.on('finish', function () {
    var duration = ((new Date()) - t);
    logger.info('Completed', res.statusCode, ('(' + duration + 'ms)').green);
  });
  next();
};
