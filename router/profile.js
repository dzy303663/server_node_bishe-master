var express=require('express')
var router = express.Router()
var user=require('../models/user')
var teacher=require('../models/teacher')
var company=require('../models/company')
var department = require('../models/department')
var admin = require('../models/admin')

router.get('/userInfo', function (req, res){
	let user_id = req.query.user_id;
	let res_data;
	let findUser = (entity) => {
		entity.findOne({user_id: user_id}, function (err, doc) {
			res_data = JSON.parse(JSON.stringify(doc))
			if(res_data.department){
				department.findOne({depart_id: res_data.department},(err, {name})=>{
					res_data.departName = name;
					res.send(res_data);
				})
			}else{
				res.send(res_data);
			}
			
		})
	}
	switch (user_id.length){
		case 8: findUser(user);break;
		case 4:
		    if(user_id == 1234) {
				findUser(user);
			}else{
				findUser(department);
			}
			break;
		case 5: findUser(teacher);break;
		case 3: findUser(company);break;
		case 1: findUser(admin);break;
		default: res.send('未找到')
	}
})

router.post('/userInfo/update',(req,res) => {
	let user_id = req.body.params.user_id;
	let {tel,pw,introduce,resume,headImg,name} = req.body.params
	let updateUser = function(entity){
		entity.update({user_id},{...req.body.params}).exec(res.send('操作成功'));
	}
	console.log(user_id.length)
	switch ((user_id+'').length){
		case 8: updateUser(user);break;
		case 4:
		    if(user_id == 1234) {
				updateUser(user);
			}else{
				updateUser(department);
			}
			break;
		case 5: updateUser(teacher);break;
		case 3: updateUser(company);break;
		case 1: updateUser(admin);break;

		default: res.send('未找到')
	}
})
module.exports = router