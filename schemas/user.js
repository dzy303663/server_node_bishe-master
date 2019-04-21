var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    user_id: {type: Number},//id
    role: String,//角色
    school: String,//学校
    department: Number,//系
    class: Number,//班级
    account: Number,//账号
    name: String,//姓名
    pw: String,//密码
    tel: String,//电话
    sex: String,//性别
    introduce: String,//自我介绍
    company: String,//公司
    position: String,//岗位
    resume: {type: Object, default: {}},//简历
    isPractice: {type: Boolean,default: false},//是否实习
    register: {type: Array,default: []}, //签到
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

