var models = require('../models');
var logger = require('../common/logger');
var LinkedLog = models.LinkedLog;
exports.saveLinkedLog = function (c_id, c_name, user, phone, sex) {
    var log = new LinkedLog({
        column_id: c_id,
        column_name: c_name,
        user: user,
        phone: phone,
        sex: sex
    });
    log.save(function (err) {
        if (err) {
            logger.error('save failed:' + err.message);
        }
    });
};
