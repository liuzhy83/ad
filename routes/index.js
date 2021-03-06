var express = require('express');
var logger = require('../common/logger');
var router = express.Router();
var models = require('../models');
var persistence = require('../persistence');
var _ = require('lodash');
var uuid = require('node-uuid');
var eventproxy = require('eventproxy');
var config = require('../config');
var valsign = require('../middleware/valsign');

/* GET home page. */
router.get('*',valsign);

var getSex$Age = function(idcard){
  var birthday = idcard.substring(6, 10) + "-" + idcard.substring(10, 12) + "-" + idcard.substring(12, 14);
  var sex;
  if (parseInt(idcard.substr(16, 1)) % 2 == 1) {
       sex = 1;
   } else {
       sex = 2;
   }
   return {'birthday':birthday,'sex':sex};
};
var wapEncode = function (appkey, appSecret, keyLen) {
    var chuo = (new Date()).getTime();
    var m = chuo % 10;
    var str1 = (new Buffer(appSecret)).toString('base64');
    str1 = str1.substring(0, m) + appkey + str1.substring(m) + chuo;
    return (new Buffer(str1)).toString('base64');
};
//访问高歌医生的首页
router.get('/ad/ggys',function (req, res, next) {
    var phone = req.query.phone;
    var userid = req.query.userid;
    var name = req.query.name;
    var idcard=req.query.idcard;
    var appkey = req.query.appkey;
    //------------------------------访问高歌医生拼接参数---------
    //手机号加密串
    var gor_enstr = wapEncode(config.apps.gg.appkey,phone,11);

    var s$a = idcard?getSex$Age(idcard):{sex:0,birthday:null};
    //0 未知 1男 2女
    var sex = s$a.sex;
    //yyyy-MM-dd类型
    var birthday = s$a.birthday;
    //name 账户姓名
    var name = req.query.name;
    //访问高歌医生　
    res.redirect('http://www.gorgonor.com/partner/jkzs/home?sex='+sex+'&birthday='+birthday+'&name='+name+'&gor_enstr='+gor_enstr);
    name = decodeURI(decodeURI(name));
    persistence.saveLinkedLog('10000000002','高歌医生',userid,name,phone,sex,idcard);
});
//查看高歌医生名医文章链接
router.get('/ad/ggys/eduLists',function (req, res, next) {
    var phone = req.query.phone;
    var userid = req.query.userid;
    var name = req.query.name;
    var idcard=req.query.idcard;
    var appkey = req.query.appkey;
    //增加了provices字段
    var provinces = req.query.provinces;
    //------------------------------访问高歌医生拼接参数---------
    //手机号加密串
    var gor_enstr = wapEncode(config.apps.gg.appkey,phone,11);

    var s$a = idcard?getSex$Age(idcard):{sex:0,birthday:null};
    //0 未知 1男 2女
    var sex = s$a.sex;
    //yyyy-MM-dd类型
    var birthday = s$a.birthday;
    //name 账户姓名
    var name = req.query.name;
    ///partner/edu/eduLists?provinces=广东&name=&medicaldesc=&partnerkey=&birthday=&sex=&gor_enstr=
    //访问高歌医生　
    res.redirect('http://www.gorgonor.com/partner/edu/eduLists?provinces='+provinces+'&birthday='+birthday+'&name='+name+'&gor_enstr='+gor_enstr);
    name = decodeURI(decodeURI(name));
    persistence.saveLinkedLog('10000000003','高歌医生名医文章',userid,name,phone,sex,idcard);
});


//访问我的健康的宣传首页
router.get('/ad/myh',function(req,res,next){
    var phone = req.query.phone;
    var userid = req.query.userid;
    var name = req.query.name;
    var idcard=req.query.idcard;
    var appkey = req.query.appkey;
    var s$a = idcard?getSex$Age(idcard):{sex:0,birthday:null};
    //0 未知 1男 2女
    var sex = s$a.sex;
    //yyyy-MM-dd类型
    var birthday = s$a.birthday;
    res.render('myh/index',{});
    persistence.saveLinkedLog('10000000001','我的健康',userid,name,phone,sex,idcard);
});

module.exports = router;
