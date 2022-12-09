const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbcourseyear', {
    CourseYearId: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      comment: "ลำดับปีการศึกษา"
    },
    CourseYear: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ปีการศึกษา"
    },
    CourseId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "รหัสหลักสูตร"
    },
    CourseGrp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "เลขรุ่น"
    },
    PersId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "เลขประจำตัวข้าราชการ"
    },
    CourseBegin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "วันเปิดหลักสูตร"
    },
    CourseEnd: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "วันจบหลักสูตร"
    },
    StudentId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Seminar: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    AccessRightsId: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbcourseyear',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CourseYearId" },
        ]
      },
    ]
  });
};
