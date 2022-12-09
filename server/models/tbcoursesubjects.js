const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbcoursesubjects', {
    SubjectId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสหมวดวิชา"
    },
    SubjectNr: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "หมวดวิชาที่"
    },
    SubjectName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ชื่อวิชา"
    },
    SubjectCreditOrScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "หน่วยกิต\/คะแนนเต็ม"
    },
    CourseId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "รหัสหลักสูตร"
    }
  }, {
    sequelize,
    tableName: 'tbcoursesubjects',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SubjectId" },
        ]
      },
    ]
  });
};
