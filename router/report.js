var express=require('express')
var router = express.Router()
var report=require('../models/report')
var teacher=require('../models/teacher')
var user=require('../models/user')
var report=require('../models/report')


router.get('/user/report', function (req, res){
	let res_data;
	let user_id = req.cookies.user_id;
	console.log(user_id)
	report.find({user_id}).then((docs) => {
		console.log('----',docs)
		res.send(docs)
	})
})
router.get('/user/report/detail', function (req, res){
	let res_data;
	let _id = req.query.id;
	console.log(req.query)
	report.findOne({_id},(err,doc) => {
		res.send(doc)
	})
})

router.post('/user/report/add',(req,res) => {
	// let user_id = req.body.params.user_id;
	let user_id = req.cookies.user_id;
	let {title,content,creator} = req.body
	report.create({user_id,title,content,creator}).exec(res.send('操作成功'));
})

router.get('/user/report/teacher', function (req, res){
	let res_data;
	let user_id = req.cookies.user_id;	
	let classIndex = (user_id+'').charAt(user_id.length-1);
	let res_Data = [];
	report.find({},(err,docs) => {
		docs.map(item => {
			console.log((item.user_id+'').charAt(4),classIndex)
			if((item.user_id+'').charAt(5) == classIndex) res_Data.push(item)
		})
		res.send(res_Data)
	})
})
module.exports = router