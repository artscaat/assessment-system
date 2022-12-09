const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbclassroom', {
    ClassId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสห้องเรียน"
    },
    AccessRightsId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "รหัสสิทธิ์การเข้าถึง"
    },
    SubjectId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "รหัสหมวดวิชา"
    },
  }, {
    sequelize,
    tableName: 'tbclassroom',
    timestamps: false,
  });
};
