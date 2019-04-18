var mongoose = require("mongoose");
var departmentSchema = require("../schemas/department");

var department = mongoose.model('department',departmentSchema);

module.exports = department;