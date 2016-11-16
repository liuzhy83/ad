var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;


//点击之后的统计表

var LinkStatistics = new Schema({
    column_id: {type: ObjectId},
    column_name: {type: String},
    count: {type: Number}
});

mongoose.model('LinkStatistics', LinkStatistics);