var express=require('express')
var router = express.Router()
var user=require('../models/user')
var teacher=require('../models/teacher')
var company=require('../models/company')
var department = require('../models/department')
router.get('/userInfo', function (req, res){
	let user_id = req.query.user_id;
	let res_data;
	let findUser = (entity) => {
		entity.findOne({user_id: user_id}, function (err, doc) {
			res_data = JSON.parse(JSON.stringify(doc))
			department.findOne({depart_id: 8},(err, {name})=>{
				console.log('aa',name)
				res_data.departName = name;
				console.log('----------');
				console.log(res_data)

				res.send(res_data);
			})
		})
	}
	switch (user_id.length){
		case 8: findUser(user);break;
		case 4: findUser(user);break;
		case 5: findUser(teacher);break;
		case 3: findUser(company);break;
		default: res.send('未找到')
	}
})

router.post('/userInfo/update',(req,res) => {
	let user_id = req.body.params.user_id;
	let {tel,pw,introduce} = req.body.params
	user.update({user_id},{tel: tel,pw: pw,introduce: introduce}).exec(res.send('操作成功'));
})
module.exports = router