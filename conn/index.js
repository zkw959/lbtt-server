const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/stock')
mongoose.connection.once("open",()=>{console.log("数据库连接成功。。。")})