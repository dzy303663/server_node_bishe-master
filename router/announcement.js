var express=require('express')
var router = express.Router()
var report=require('../models/report')
var teacher=require('../models/teacher')
var user=require('../models/user')
var report=require('../models/report')
var msg=require('../models/msg')




router.get('/department/announcement', function (req, res){
	let res_data;
	let user_id = req.cookies.user_id;
	console.log(user_id)
	msg.find({}).then((docs) => {
		console.log('----',docs)
		res.send(docs)
	})
})

router.get('/department/announcement/detail', function (req, res){
	let res_data;
	let _id = req.query.id;
	console.log(req.query)
	msg.findOne({_id},(err,doc) => {
		res.send(doc)
	})
})

router.post('/department/announcement/add',(req,res) => {
	// let user_id = req.body.params.user_id;
	let user_id = req.cookies.user_id;
	let {title,content,creator,resume,type} = req.body
	msg.create({user_id,content,title,resume,creator,type}).exec(res.send('操作成功'));
})

router.post('/user/report/update',(req,res) => {
	// let user_id = req.body.params.user_id;
	let user_id = req.cookies.user_id;
	let {_id,title,content,creator} = req.body
	report.update({_id},{user_id,title,content,creator}).exec(res.send('操作成功'));
})

module.exports = router