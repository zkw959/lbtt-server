// 引入 axios
const axios = require('axios')
// 引入lbttsModel
const lbttsModel = require('./Models/lbtts')
// 引入交易日
const openDatePromise = require('./openDate')
// 引入hexin-v
const get_hexinV = require('./hexinV/get_hexinV')




main()
// 遍历交易日
async function main() {
    try {
        const openDateArr = await openDatePromise
        const len = openDateArr.length
        for (let i = 0; i < len; i++) {
            /* 
                延迟防止被封ip
            */
            const random = Math.random() * 100 + i
            console.log(`延迟${random}毫秒`);
            await delay(random)

            /* 
                请求股票数据并且写入数据库
            */
            const response = await getStockInfo(openDateArr[i], 0)
            console.log("股票数据请求成功。。。");
            let res = response.data.data.result.result
            await writeDB(openDateArr[i], format(res))

            console.log(`已插入第${i+1}个，完成进度：${(i+1) / len * 100}%`);
            console.log("--------------------------------------------------------");
        }
        return;
    } catch (error) {
        console.log("错误：" + error);
        return;
    }

    // 延迟函数
    function delay(random) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(random)
            }, random)

        })

    }
    // 格式化数据
    function format(arr) {
        let arrObj = []
        for (let i in arr) {
            arrObj.push({
                'stk-code': arr[i][0],
                'stk-name': arr[i][1],
                'trading-day': arr[i][5],
            })
        }
        return arrObj
    }
}

// 获取股票数据
async function getStockInfo(date, index) {
    return axios({
        url: `https://www.iwencai.com/stockpick/load-data`,
        method: "GET",
        responseType: "JSON",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
            'Cookie': `v=${get_hexinV()}`
        },
        params: {
            typed: 1,
            ts: 1,
            f: 1,
            qs: 'result_rewrite',
            querytype: 'stock',
            tid: 'stockpick',
            w: `${date}非st和非停牌连板天梯，主板`
        }
    })
}



// 写入数据库
async function writeDB(date, data) {

    return new Promise((reslove, reject) => {


        lbttsModel.findOne({ "date": date }, (err, docs) => {
            if (!err) {
                if (docs) {
                    // 有数据,先删除
                    console.log("有数据，先删除...");
                    del(date)
                }

                insert(date, data)
                reslove()
            } else {
                reject()
                console.log('数据文档插入失败。。。' + err);
            }
        })
    })

    function del(date) {
        lbttsModel.deleteOne({ "date": date }, (err) => {
            if (!err) {
                console.log("删除成功");
            } else {
                console.log("删除失败");
            }
        })
    }
    function insert(date, data) {
        lbttsModel.insertMany({ "date": date, "data": data }, (err, docs) => {
            if (!err) {
                console.log(`${date}-数据文档插入成功。。。`);
                console.log(docs);
            } else {
                console.log("`${date}-数据文档插入失败。。。");
            }
        })
    }

}






