var express=require('express')
var router = express.Router()
var askFor=require('../models/askFor')
var company=require('../models/company')
var user=require('../models/user')
var department=require('../models/department')




router.get('/user/askfor', function (req, res){
	let res_data;
	let user_id = req.cookies.user_id;
	console.log(user_id)
	askFor.find({user_id}).then((docs) => {
		console.log('----',docs)
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

router.get('/user/company', function (req, res){
	let res_data;
	let user_id = req.cookies.user_id;
	company.findOne({user_id},(err,doc) => {
		let stuList = doc.apply_list.map(item => {
			return item.user.user_id;
		})
		stuList = [...new Set(stuList)];
		askFor.find({ 'creator.user_id': { $in: [...stuList]}},(err,docs) => {
			res.send(docs)
		})
	})
})

router.get('/department/askfor', function (req, res){
	let res_data = [];
	let user_id = req.cookies.user_id;
	let depart_index = (user_id+'').charAt(user_id.length-1);
	askFor.find({},(err,docs) => {
		docs.map(item => {
			if((item.user_id+'').charAt(3) == depart_index) res_data.push(item)
		})
		res_data=res_data.map(item => {
			if((new Date(item.endTime).getTime()-new Date(item.startTime).getTime()) > 259200000){
				return item
			}
		})
		res.send(res_data)
	})
})

router.post('/user/askfor/add',(req,res) => {
	// let user_id = req.body.params.user_id;
	let user_id = req.cookies.user_id;
	let {title,startTime,endTime,content,creator} = req.body
	askFor.create({user_id,title,startTime,endTime,content,creator,status:'审批中'}).exec(res.send('操作成功'));
})

router.post('/user/askfor/update',(req,res) => {
	// let user_id = req.body.params.user_id;
	let user_id = req.cookies.user_id;
	let {title,startTime,endTime,content,_id} = req.body
	askFor.update({_id},{title,startTime,endTime,content}).exec(res.send('操作成功'));
})

router.post('/askfor/check',(req,res) => {
	// let user_id = req.body.params.user_id;
	let user_id = req.cookies.user_id;
	let {_id,optionUser,optionTime,status} = req.body
	askFor.update({_id},{optionUser,optionTime,status}).exec(res.send('操作成功'));
})
module.exports = router