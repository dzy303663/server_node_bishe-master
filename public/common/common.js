module.exports  = (entity) => {
    console.log(entity)
    for (let i = 4; i <= 9; i++) {
        /* entity.create({
            user_id: 190 + i,
            role: '企业',
            account: 190 + i,
            name: '企业' + i + '号',
            pw: '1234',
            tel: '131xxxxx',
            introduce: "我是" + i + "号企业，上市公司，规模万人以上",
            company_link: "www.baidu.com",
            open_offer: [{
                name: '前端开发',
                desc: '熟练vue angular node',
                people: 5,
                hasPeople: 1,
                createTime: Date.now()
            },
            {
                name: '后端开发',
                desc: '熟练jave mysql',
                people: 6,
                hasPeople: 2,
                createTime: Date.now()
            }],
            file: '我是一个文件'
        }, err => {
            console.log(err)
        }) */
        entity.create({
            depart_id: i,
            name: i+'号系'
        })
    };
}