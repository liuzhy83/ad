var logger = require('../common/logger');
var config = require('../config');
var crypto = require('crypto-js');
var eventproxy= require('eventproxy');
var _ = require('lodash');

var decrypt = function(ciphertext, key) {
            var keyHex = crypto.enc.Utf8.parse(key);
            // direct decrypt ciphertext
            var decrypted = crypto.DES.decrypt({
                ciphertext: crypto.enc.Base64.parse(ciphertext)
            }, keyHex, {
                mode: crypto.mode.ECB,
                padding: crypto.pad.Pkcs7
            });
            return decrypted.toString(crypto.enc.Utf8);
        };
var findFirmsSecret = function(appkey){
      var key = _.findKey(config.apps, { 'appkey': appkey});
      if(key){
         return config.apps[key].secret;
      }else{
        return null;
      }
};
exports = module.exports = function (req, res, next) {
    if(_.endsWith(req.path,".js")||_.endsWith(req.path,".css")||_.endsWith(req.path,".png")){
         next();
    }
    if(req.path==="/ad/"){
        res.render("security",{});
        return;
    }
    var appkey = req.query.appkey;
    var sign = req.query.sign;
    var timestamp = req.query.timestamp;
    var ep = new eventproxy();
    ep.all('faild',function(msg){

       res.send('签名验证过程失败!\r\n原因:'+msg);
    });
    var secret = findFirmsSecret(appkey);
    if(secret==null){
        ep.emit('faild','appkey错误,请核对.');
    }
    try{
        var result = decrypt(sign,secret);
        if(result){
            var arr = result.split('_');
            if(arr.length!==5){
                ep.emit('faild','原始签名串错误,格式应为appkey_timestamp_phone_idcard+4位随机数');
            }
            var ak = arr[0];
            if(ak!==appkey){
                ep.emit('faild','原始签名串错误,签名中appkey错误');
            }
            //todo 暂时不验证时间戳
            //var t = arr[1];
            //if(((new Date()).getTime()-t)>config.security.interval){
            //     ep.emit('faild','无效签名,因为签名串已失效,请重新签名');
            //}
            if(arr[3].length!==18||arr[3].length!==15){
                //todo身份证号暂时不强制要求
                //ep.emit('原始签名串中身份证号错误,身份证应为15或18位数字');
            }
            if(arr[2].length!==11){
                ep.emit('faild','原始签名串中手机号错误,手机号应为11位数字');
            }
            req.query.idcard=arr[3];
            req.query.phone=arr[2];
            next();
        }
    }catch(e){
        ep.emit('faild','签名解析错误,请核对加密算法');
    }
};
