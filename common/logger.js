var config = require('../config');
var log4js = require('log4js');
log4js.configure({
    appenders: [
        {type: 'console'},
        {
        type: 'dateFile',
        filename: 'logs/lifesea.log',
        pattern:'_yyyy-MM-dd',
        maxLogSize:5120,
        alwaysIncludePattern:false,
        backups:20,
        category: 'lifesea'
      }
    ],
   replaceConsole: true,   //替换console.log
   levels:{
      dateFileLog: config.logger.level
   }
});
var logger  = log4js.getLogger('lifesea');
module.exports = logger;
//exports.use = function(app){
    //页面请求日志,用auto的话,默认级别是WARN
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));
    //app.use(log4js.connectLogger(logger, {level:config.logger.level, format:':method :url'}));
//};
