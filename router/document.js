var express=require('express')
var router = express.Router()
var document=require('../models/document')

router.get('/file/relative', function (req, res){
	let res_data;
	document.find({},(err,docs) => {
		res.send(docs)
	})
})

router.post('/userInfo/update',(req,res) => {
	let user_id = req.body.params.user_id;
	let {tel,pw,introduce,resume,headImg,name} = req.body.params
	user.update({user_id},{tel: tel,pw: pw,introduce: introduce,resume,headImg,name}).exec(res.send('操作成功'));
})
module.exports = router