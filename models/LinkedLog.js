var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoinc = require('mongoose-auto-increment');

//点击日志明细表

var LinkedLog = new Schema({
    //创建时间
    create_at: {type: Date, default: Date.now},
    column_id: {type: String},
    column_name: {type: String},
    xh: {type: Number},
    user: {type: String},
    phone: {type: String},
    sex: {type: String}
});

autoinc.initialize(mongoose);
LinkedLog.plugin(autoinc.plugin, {
    model: 'LinkedLog',
    field: 'xh',
    startAt: 1,
    incrementBy: 1
});

LinkedLog.index({create_at: -1});
LinkedLog.index({user: -1});
LinkedLog.index({xh: -1});

mongoose.model('LinkedLog', LinkedLog);