var express=require('express')
var router = express.Router()
var company=require('../models/company')

router.get('/company',(req,res) => {
	
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
        console.log(doc)
        doc.apply_list.push(temp);
        doc.save();
        res.json({msg: '操作成功'})
    })
})
module.exports = router