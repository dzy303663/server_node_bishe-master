var express=require('express')
var router = express.Router()
var company=require('../models/company')

router.get('/company',(req,res) => {
	
	company.find({},(err, doc) => {
        console.log(doc)
        res.json(doc)
    });
})
module.exports = router