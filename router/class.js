var express=require('express')
var router = express.Router()
var teacher=require('../models/teacher.js')
var user=require('../models/user.js')


router.get('/company',(req,res) => {
    console.log(req.cookies)
	company.find({},(err, doc) => {
        console.log(doc)
        res.json(doc)
    });
})

router.post('/company/apply',(req,res) => {
    console.log(req.body)
    let temp;
    let {company_id,selectedJob} = req.body;
    company.findOne({user_id: company_id},(err,doc) => {
        temp = {
            selectedJob,
            user: req.body,
            createdTime: new Date().getTime()
        };
        doc.apply_list.push(temp);
        doc.save();
        res.send('操作成功')
    })
})

router.get('/company/open-offer',(req,res) => {
    console.log(req.cookies)
	let user_id = req.cookies.user_id;
	company.findOne({user_id},(err, doc) => {
        console.log(doc)
        res.send(doc.open_offer)
    });
})

router.post('/company/open-offer/add',(req,res) => {
	// let user_id = req.body.params.user_id;
	let user_id = req.cookies.user_id;
    let {name,desc,createTime,people} = req.body
    company.findOne({user_id},(err, doc) => {
        console.log(doc)
        doc.open_offer.push({name,desc,createTime,people})
        doc.save()
    });
})
module.exports = router