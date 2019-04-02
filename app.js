// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
const fs = require('fs');
//跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    // if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    // else 
    next();

});
// view engine setup
app.use(express.static('./'));
app.use(express.static(__dirname + './data'));
app.use(express.static(__dirname + './data/HLS-demo-master'));
console.log(__dirname);
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


var mongoose = require('mongoose'); // 加载mongoose模块
mongoose.connect('mongodb://localhost:27017/myData', function (err) {
    if (err) {
        // 连接mongodb本地数据库imovie
        console.log('MongoDB connection failed!')
    } else {
        // 连接mongodb本地数据库imovie
        console.log('MongoDB connection success!');
    }
});

var port = process.env.PORT || 5200; // 设置端口号：3000
var server = app.listen(port); // 监听 port[3000]端口
console.log('node_server start on port' + port);

var io = require('socket.io')(server);

var users = {}
var Message = require('./models/message.js')
var HomeWork = require('./models/homework.js')

const user = require('./models/user.js'); // 载入mongoose编译后的模型user
const control = require('./models/control.js');// 载入mongoose编译后的模型user
for(let i=0;i<=9;i++){
    user.create({user_id: 15070901+i,role: '学生',class: 9,account: 15070901+i,name: 'stu'+i,pw: '1234',tel: '131xxxxx',sex: '女',introduce: "我是学生"+i+'号',company: '山西首钢',position: '高级xxx开发'},err => {
        console.log(err)
    })
}
user.create()
app.post('/login', function (req, res) {
    console.log(req.query);
    /* user.findOne({account: req.query.account},function (err,doc) {
        console.log(doc);
        if(err || doc==null){
           console.log(err);
           res.end("failed");
        }else{
            if (req.query.pwd == doc.pw) {
                console.log("密码正确");
                res.json({'state':'success','name':doc.name});
              //  res.end("success");
            } else {
                console.log("密码错误");
                res.end("failed");
            }
        }
    }) */
    res.send({ "msg": "登录成功！", "data": { "email": "1012401749@163.com", "gender": "男", "isadmin": true, "jobid": 51, "password": "admin", "personid": 1, "realname": "章鱼xx", "telephone": "17786468646", "username": "Yang" }, "dept_id": 6, "organ_id": 2 })
});

app.get('/infoserver', function (req, res) {
    console.log(req);
    /* control.findOne({ index: 1 }, function (err, doc) {
        console.log(doc)
        res.json(doc);
        res.end();
    }) */
    res.send({
        "result": [
            { "hot": true, "infoname": "xxx院长", "inform_id": 15, "infotime": "2019-xx-xx   17:00:00", "infotitle": "山西省xx企业审核通过的通知", "keyword": "水平测试" },
            { "hot": false, "infoname": "xxx院长", "inform_id": 135, "infotime": "2019-xx-xx   17:00:00", "infotitle": "山西省xx企业审核通过的通知", "keyword": "人才引进" }, { "hot": false, "infoname": "xxx院长", "inform_id": 134, "infotime": "2019-xx-xx   17:00:00", "infotitle": "在新时代党的阳光照耀下前进 ——习近平总书记关心关怀青年和青年工作纪实", "keyword": "习近平" },
            { "hot": false, "infoname": "xxx院长", "inform_id": 133, "infotime": "2019-xx-xx   17:00:00", "infotitle": "山西省xx企业审核通过的通知", "keyword": "贺军科" }], "total": 8, "page": 1
    })
})

app.get('/newserver', (req, res) => {
    res.send({
        "result": [
            {
                "createtime": "2019-xx-xx   00:02:57",
                "hot": true, "news_id": 22,
                "newsauthor": "xxx",
                "newstitle": "请假模板下载"
            },
            {
                "createtime": "2019-xx-xx   00:02:08", "hot": true, "keyword": "乌鲁木齐", "news_id": 32, "newsauthor": "xxx", "newstitle": "XX企业资质文件下载"
            },
            { "createtime": "2018-08-26   17:03:50", "hot": true, "keyword": "中央", "news_id": 30, "newsauthor": "xxx", "newstitle": "实习相关文件下载" }],
            "total": 17, "page": 1
    })
})



