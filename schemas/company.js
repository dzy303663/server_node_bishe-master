var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    user_id: {type: Number},//id
    account: Number,//账号
    name: String,//公司名称
    pw: String,//密码
    tel: String,//电话
    introduce: String,//公司介绍
    company_link: String,//公司链接
    open_offer: Array,//开放岗位
    file: String,//资质文件
    // meta 更新或录入数据的时间记录
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        },
    }
});

// movieSchema.pre 表示每次存储数据之前都先调用这个方法
userSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

// userSchema 模式的静态方法
userSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

// 导出userSchema模式
module.exports = userSchema;

