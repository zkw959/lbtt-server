// 连接数据库
require('./conn')
// 引入express
const express = require('express')
// 引入lbttsModel
const lbttsModel = require('./Model/lbtts')
// 引入交易日
const openDatePromise = require('./openDate')


// 赋值app
const app = express()

// 服务器配置

app.get(`/lbtts`, async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*")
    // res.setHeader("Access-Control-Allow-Headers", "*")
    const date = req.query.date
    const openDateArr = await openDatePromise
    if (!(openDateArr.includes(date))) {
        res.send({ msg: "Not a trading day",code:-1})
    } else {
        lbttsModel.find({ "date": date })
            .exec((err, docs) => {
                if (!err) {
                    if (docs.length === 0) {
                        res.send({ msg: "result is empty" ,code:0})
                    } else {
                        res.send({data:docs[0].data,msg:"success",code:1})
                    }
                }
            })
    }


})
app.use((request, response, next) => {
    console.log('有人请求3000服务器了');
    next()
})
app.use(express.static(__dirname + "/dist"))

app.listen(3000, (err) => {
    if (!err) console.log('服务器已成功开启...,地址为：http://127.0.0.1:3000');
})

    


