var express=require('express')
var router = express.Router()
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
module.exports = router