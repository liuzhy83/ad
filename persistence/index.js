var models = require('../models');
var logger = require('../common/logger');
var LinkedLog = models.LinkedLog;
exports.saveLinkedLog = function (c_id, c_name, userid,name,phone,sex,idcard) {
    var log = new LinkedLog({
        column_id: c_id,
        column_name: c_name,
        userid: userid,
        name:name,
        phone: phone,
        sex: sex,
        idcard:idcard
    });
    log.save(function (err) {
        if (err) {
            logger.error('save failed:' + err.message);
        }
    });
};
