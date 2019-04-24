var express=require('express')
var router = express.Router()
var company=require('../models/company')
var user=require('../models/user')

router.get('/deliver', function (req, res){
	let res_data;
	let user_id = req.cookies.user_id;
	console.log(user_id)
	company.findOne({user_id}).then((doc) => {
		console.log(doc.apply_list)
		res_data = doc.apply_list;
		res.send(res_data)
	})
})

router.post('/deliver/check',(req,res) => {
	// let user_id = req.body.params.user_id;
	let user_id = req.cookies.user_id;
	let workCompany = req.body.params.company;
	let job = req.body.params.job;
	let index = req.body.params.index;
	let status = req.body.params.status;
	console.log('aaaa',status)
	if(status == '不通过'){
		company.findOne({user_id}).then((doc) => {
			doc.apply_list[index].status = status;
			doc.save();
			res.send('操作成功')
		})
	}else{
		company.findOne({user_id}).then((doc) => {
			doc.apply_list[index].status = status;
			doc.save();
			user.findOne({user_id: doc.apply_list[index].user.user_id}).then(doc1 => {
				doc1.company = workCompany;
				doc1.position = job;
				doc1.save();
				res.send('操作成功')

			})
		})
	}
})
module.exports = router