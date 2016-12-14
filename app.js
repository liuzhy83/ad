var config = require('./config');
require('colors');
var express = require('express');
process.env.PORT=config.server.port;
var app = express();
var logger = require('./common/logger');
//logger.use(app);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var routes = require('./routes/index');
require('./middleware/mongooselog'); //打印mongodb 查询日志
var requestLog = require('./middleware/request_log');
var renderMiddleware = require('./middleware/render');
path.join();

//使用laytpl模版
//var laytpl = require('laytpl');
//app.engine('.html', laytpl.__express);

// view engine setup,使用ejs的模版
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(requestLog);

if (config.logger.level=='DEBUG') {
   // 渲染时间
   app.use(renderMiddleware.render);
}
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//解析JSON格式的数据
app.use(bodyParser.json());
//解析UTF8格式的数据
app.use(bodyParser.urlencoded({extended: false}));
//解析cookie
app.use(cookieParser());
//静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
