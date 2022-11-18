# 连板天梯小程序

>为连板个股复盘进行指定策略的小程序

## 技术栈

### 前端

vue2.0 + vuex + axios
 
### 后端

node.js + express + mongoose

## 文件介绍
conn ----数据库连接配置

Model ----mongoose模型

openDate ----Tushare接口判断是否是交易日

stock_pachong ----爬虫相关

lbtts.json ----数据集（2012年1月6日-2022年11月17日）

server.js ----主程序入口

## 使用方法

安装依赖：

```
npm install 
```

启动：

```
node server.js 
```


