var express=require('express')
var router = express.Router()
var company=require('../models/company')

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

router.get('/company/open-offer/detail',(req,res) => {
    console.log(req.cookies)
    let user_id = req.cookies.user_id;
	let createTime = req.query.id;
    
	company.findOne({user_id},(err, doc) => {
        console.log(doc);
        doc.open_offer.map(item => {
            if(item.createTime == createTime) res.send(item)
        })
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
    res.send('操作成功')

})

router.post('/company/open-offer/update',(req,res) => {
	// let user_id = req.body.params.user_id;
	let user_id = req.cookies.user_id;
    let {name,desc,createTime,people} = req.body
    company.findOne({user_id},(err, doc) => {
        doc.open_offer = doc.open_offer.map(item => {
            console.log(item.createTime == createTime,createTime)
            if(item.createTime == createTime){
                item.name = name;
                item.desc = desc;
                item.people = people;
            }
            return item
        })
       /*  for(let i=0;i<doc.open_offer.length;i++){
            console.log(i,doc.open_offer[i].createTime == createTime)
            if(doc.open_offer[i].createTime == createTime){
                doc.open_offer[i].name = name;
                doc.open_offer[i].desc = desc;
                doc.open_offer[i].people = people;
                return
            }

        } */
        doc.save()
    });
    res.send('操作成功')

})
module.exports = router