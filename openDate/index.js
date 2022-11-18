const axios = require('axios')
// 遍历交易日
function show(data) {
    const openDate = []
    for (let i in data) {
        if (data[i][2]) openDate.push(data[i][1]);
    }
    return openDate
}

// 获取getopenDate，返回promise对象
async function getopenDate() {

    let endDate = formatDate(new Date())
    try {       
        const Response = await axios.post('http://api.tushare.pro', {
            "api_name": "trade_cal",
            "token": "135bd10727f55b4e677c1558ed22e63f617cdf1f660d9a82b6cf1eba",
            "params": { "exchange": "", "start_date": "20120104", "end_date": `${endDate}` },
            "fields": ""
        })
        console.log("交易日历数据请求成功。。。");

        const openDate = await show(Response.data.data.items);
        return Promise.resolve(openDate)

    } catch (error) {
        console.log("交易日历数据请求错误。。。"+error);
    }

    function formatDate(date){
        
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        if(month < 10){
            month = "0" + month
        }
        if(day < 10){
            day = "0" + day
        }

        return '' + year + month + day
    }
}



module.exports = getopenDate();

// console.log(arguments)

