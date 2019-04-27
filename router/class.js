var express=require('express')
var router = express.Router()
var teacher=require('../models/teacher.js')
var user=require('../models/user.js')


router.get('/class/student',(req,res) => {
    console.log(req.cookies)
    let user_id = req.cookies.user_id;
    
	teacher.findOne({user_id},(err, doc) => {
        user.find({class: doc.class},(err, docs) => {
        res.send(docs)
        })
    });
})

module.exports = router