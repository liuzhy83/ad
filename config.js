var path = require('path');

module.exports = {
    //全局配置
    debug: true,
    //服务器配置
    server: {
        host: '0.0.0.0',
        port: '3001'
    },
    logger:{
       level:'DEBUG'
    },
    //redis配置
    redis: {
        host: '192.168.188.73',
        port: '6379',
        db: '',
        password: ''
    },
    //mongoDB配置
    mongodb: {
        loglevel:'DEBUG',
        url: 'mongodb://lifesea:lifesea@127.0.0.1:27017/myhealth'
    },

    apps: {
        gg: {
            appkey: '86cddfd688474137aae4cae43518113b',
            secret: 'c2b05b36381a41fe87d680fed382b881'
        }
    }

};
