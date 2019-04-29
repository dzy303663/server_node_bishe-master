var mongoose = require('mongoose');
var adminSchema = require('../schemas/admin.js'); //引入'../schemas/user.js'导出的模式模块

// 编译生成user模型
var admin = mongoose.model('admin', adminSchema);

// 将user模型[构造函数]导出
module.exports = admin;