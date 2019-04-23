var mongoose = require('mongoose');
var askSchema = require('../schemas/askFor.js'); //引入'../schemas/user.js'导出的模式模块

// 编译生成user模型
var askFor = mongoose.model('askFor', askSchema);

// 将user模型[构造函数]导出
module.exports = askFor;