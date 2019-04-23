var express=require('express')
var router = express.Router()
var askFor=require('../models/askFor')

router.get('/user/askfor', function (req, res){
	let res_data;
	let user_id = req.cookies.user_id;
	askFor.find({'creator.user_id': user_id},(err,docs) => {
		res.send(docs)
	})
})
router.get('/user/askfor/detail', function (req, res){
	let res_data;
	let _id = req.query.id;
	console.log(req.query)
	askFor.findOne({_id},(err,doc) => {
		res.send(doc)
	})
})

router.post('/user/askfor/add',(req,res) => {
	// let user_id = req.body.params.user_id;
	let user_id = req.cookies.user_id;
	let {title,startTime,endTime,content,creator} = req.body
	askFor.create({title,startTime,endTime,content,creator,status:'审批中'}).exec(res.send('操作成功'));
})
module.exports = router