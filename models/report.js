var mongoose = require('mongoose');
var reportSchema = require('../schemas/report.js'); //引入'../schemas/user.js'导出的模式模块

// 编译生成user模型
var report = mongoose.model('report', reportSchema);

// 将user模型[构造函数]导出
module.exports = report;