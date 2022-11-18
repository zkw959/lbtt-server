// 连接数据库
require('../conn')
const mongoose = require("mongoose");
const {Schema} = mongoose;
const lbttsSchema = new Schema({
    "date": String,
    "data": [
        {
            'stk-code': String,
            'stk-name': String,
            'trading-day': Number
        }
    ]
});

const lbttsModel = mongoose.model("lbtts", lbttsSchema);

module.exports = lbttsModel;