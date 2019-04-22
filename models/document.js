var mongoose = require('mongoose');
var docSchema = require('../schemas/document.js'); //引入'../schemas/user.js'导出的模式模块

// 编译生成user模型
var document = mongoose.model('document', docSchema);

// 将user模型[构造函数]导出
module.exports = document;