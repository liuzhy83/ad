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
    //外部APP的相关信息
    apps: {
        jkzs:{
            appkey:'531ab9a0ac8f11e68ab58ba03d062ad4',
            secret:'29232EA6DU98JG0F'
        },
        gg: {
            appkey: '86cddfd688474137aae4cae43518113b',
            secret: 'c2b05b36381a41fe87d680fed382b881'
        }
    },

    security:{
       //调用相差间隔
       interval:5000
    }

};
