var express = require('express');
var logger = require('../common/logger');
var router = express.Router();
var models = require('../models');
var persistence = require('../persistence');
var _ = require('lodash');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index',{'title':'测试首页'});
});

router.get('/ad/ggys', function (req, res, next) {
    //手机号加密串
    var gor_enstr = req.query.gor_enstr;
    //0 未知 1男 2女
    var sex = req.query.sex;
    //yyyy-MM-dd类型
    var birthday = req.query.birthday;
    //partnerkey
    var partnerkey = req.query.partnerkey;
    //medicaldesc
    var medicaldesc = req.query.medicaldesc;
    //name  账户姓名
    var name = req.query.name;
    //访问高歌医生　
    res.redirect('http://ggtest.gorgonor.com/partner/jkzs/home?&sex='+sex+'&birthdat='+birthday+'&name='+name+'&gor_enstr='+gor_enstr);
    persistence.saveLinkedLog('10000000002','高歌医生',name,gor_enstr,sex);
});

router.get('/ad/myh',function(req,res,next){
    //手机号加密串
    var gor_enstr = req.params.gor_enstr;
    //0 未知 1男 2女
    var sex = req.params.sex;
    //yyyy-MM-dd类型
    var birthday = req.params.birthday;
    //partnerkey
    var partnerkey = req.params.partnerkey;
    //medicaldesc
    var medicaldesc = req.params.medicaldesc;
    //name  账户姓名
    var name = req.params.name;
    res.render('myh/index',{});
    persistence.saveLinkedLog('10000000001','我的健康',name,gor_enstr,sex);

});

module.exports = router;
