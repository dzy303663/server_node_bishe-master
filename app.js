// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

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
app.use(bodyParser.json());
app.use(express.static('./'));
app.use(express.static(__dirname + './data'));
app.use(express.static(__dirname + './data/HLS-demo-master'));
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
mongoose.connect('mongodb://localhost:27017/practiceManage', function (err) {
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

var io = require('socket.io')(server);

const user = require('./models/user.js'); // 载入mongoose编译后的模型user
const teacher = require('./models/teacher.js'); // 载入mongoose编译后的模型teacher
const msg = require('./models/msg.js'); // 载入mongoose编译后的模型teacher
const company = require('./models/company.js'); // 载入mongoose编译后的模型teacher
const department = require('./models/department.js') //载入mongoose编译后的模型department
const document = require('./models/document.js') //载入mongoose编译后的模型department

const initUser = require('./public/common/common.js'); // 载入mongoose编译后的模型user
// initUser(document)

app.use('/', require('./router/profile.js'))
app.use('/', require('./router/company.js'))
app.use('/', require('./router/upload'))
app.use('/', require('./router/document'))




app.post('/login', function (req, res) {
	let user_id = req.body.params.username;
	let pw = req.body.params.password;
	let res_data;
	let findUser = (entity) => {
		entity.findOne({
			user_id: user_id
		}, function (err, doc) {
			if (err || doc == null) {
				res_data = {
					code: 201,
					msg: "请正确检查用户名和密码",
				}
				res.send(res_data);
			} else {
				if (pw == doc.pw) {
					res_data = {
						code: 200,
						msg: "登录成功！",
						data: doc
					}
					res.cookie('user_id', user_id);
					res.send(res_data);
				} else {
					res_data = {
						code: 201,
						msg: "密码错误",
					}
					res.send(res_data);
				}
			}
		})
	}
	console.log(user_id.length)
	switch (user_id.length) {
		case 8:
			findUser(user);
			break;
		case 4:
			findUser(user);
			break;
		case 5:
			findUser(teacher);
			break;
		case 3:
			findUser(company);
			break;
		default:
			res.send('未找到')
	}
});
app.post('/sign', (req, res) => {
	console.log(req.cookies.user_id);
	let user_id = req.cookies.user_id
	let signTime = req.body.signTime;
	user.findOne({
		user_id
	}, (err, doc) => {
		doc.register.push(CurentTime(signTime));
		doc.save();
		res.send({msg: '签到成功'})
	})
})
app.get('/infoserver', function (req, res) {
	/* control.findOne({ index: 1 }, function (err, doc) {
			console.log(doc)
			res.json(doc);
			res.end();
	}) */
	res.send({
		"result": [{
				"hot": true,
				"infoname": "xxx院长",
				"inform_id": 15,
				"infotime": "2019-xx-xx   17:00:00",
				"infotitle": "山西省xx企业审核通过的通知",
				"keyword": "水平测试"
			},
			{
				"hot": false,
				"infoname": "xxx院长",
				"inform_id": 135,
				"infotime": "2019-xx-xx   17:00:00",
				"infotitle": "山西省xx企业审核通过的通知",
				"keyword": "人才引进"
			}, {
				"hot": false,
				"infoname": "xxx院长",
				"inform_id": 134,
				"infotime": "2019-xx-xx   17:00:00",
				"infotitle": "在新时代党的阳光照耀下前进 ——习近平总书记关心关怀青年和青年工作纪实",
				"keyword": "习近平"
			},
			{
				"hot": false,
				"infoname": "xxx院长",
				"inform_id": 133,
				"infotime": "2019-xx-xx   17:00:00",
				"infotitle": "山西省xx企业审核通过的通知",
				"keyword": "贺军科"
			}
		],
		"total": 8,
		"page": 1
	})
})

app.get('/newserver', (req, res) => {
	res.send({
		"result": [{
				"createtime": "2019-xx-xx   00:02:57",
				"hot": true,
				"news_id": 22,
				"newsauthor": "xxx",
				"newstitle": "请假模板下载"
			},
			{
				"createtime": "2019-xx-xx   00:02:08",
				"hot": true,
				"keyword": "乌鲁木齐",
				"news_id": 32,
				"newsauthor": "xxx",
				"newstitle": "XX企业资质文件下载"
			},
			{
				"createtime": "2018-08-26   17:03:50",
				"hot": true,
				"keyword": "中央",
				"news_id": 30,
				"newsauthor": "xxx",
				"newstitle": "实习相关文件下载"
			}
		],
		"total": 17,
		"page": 1
	})
})

function CurentTime(time) {
	var now = new Date(time);
	var year = now.getFullYear(); //年
	var month = now.getMonth() + 1; //月
	var day = now.getDate(); //日
	var hh = now.getHours(); //时
	var mm = now.getMinutes(); //分
	var clock = year + "-";
	if (month < 10)
		clock += "0";
	clock += month + "-";
	if (day < 10)
		clock += "0";
	clock += day + " ";
	if (hh < 10)
		clock += "0";
	clock += hh + ":";
	if (mm < 10) clock += '0';
	clock += mm;
	return (clock);
}