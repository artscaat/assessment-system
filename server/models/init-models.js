var DataTypes = require("sequelize").DataTypes;
// var _class_ = require("./class");
// var _school = require("./school");
var _tbaccessrights = require("./tbaccessrights");
var _tbclassattendance = require("./tbclassattendance");
var _tbcomment = require("./tbcomment");
var _tbcoursesubjects = require("./tbcoursesubjects");
var _tbcourseyear = require("./tbcourseyear");
// var _tbinstructor = require("./tbinstructor");
var _tbpersattrcategory = require("./tbpersattrcategory");
var _tbpersattrscore = require("./tbpersattrscore");
var _tbpmecourse = require("./tbpmecourse");
// var _tbregister = require("./tbregister");
var _tbsubjectscore = require("./tbsubjectscore");
var _tbbehavescore = require("./tbbehavescore");
//------- added on 13112022 ----------- 
var _tbclassroom = require("./tbclassroom"); 

function initModels(sequelize) {
  // var class_ = _class_(sequelize, DataTypes);
  // var school = _school(sequelize, DataTypes);
  var tbaccessrights = _tbaccessrights(sequelize, DataTypes);
  var tbclassattendance = _tbclassattendance(sequelize, DataTypes);
  var tbcomment = _tbcomment(sequelize, DataTypes);
  var tbcoursesubjects = _tbcoursesubjects(sequelize, DataTypes);
  var tbcourseyear = _tbcourseyear(sequelize, DataTypes);
  // var tbinstructor = _tbinstructor(sequelize, DataTypes);
  var tbpersattrcategory = _tbpersattrcategory(sequelize, DataTypes);
  var tbpersattrscore = _tbpersattrscore(sequelize, DataTypes);
  var tbpmecourse = _tbpmecourse(sequelize, DataTypes);
  // var tbregister = _tbregister(sequelize, DataTypes);
  var tbsubjectscore = _tbsubjectscore(sequelize, DataTypes);
  var tbbehavescore = _tbbehavescore(sequelize, DataTypes);
  //------- added on 13112022 ----------- 
  var tbclassroom = _tbclassroom(sequelize, DataTypes);

  return {
    // class_,
    // school,
    tbaccessrights,
    tbclassattendance,
    tbcomment,
    tbcoursesubjects,
    tbcourseyear,
    // tbinstructor,
    tbpersattrcategory,
    tbpersattrscore,
    tbpmecourse,
    // tbregister,
    tbsubjectscore,
    tbbehavescore,
    tbclassroom,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
