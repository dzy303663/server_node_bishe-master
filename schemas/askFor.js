var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    user_id: {type: Number},//id
    title: String,//文件名
    startTime: String,//开始时间
    endTime: String,//结束时间
    content: String,//请假理由
    creator: Object,//上传人
    optionTime: String,//操作时间
    optionUser: String,//审核人
    status: String,//状态  审批中，已同意，不同意
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

