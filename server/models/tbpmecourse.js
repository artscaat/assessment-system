const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbpmecourse', {
    CourseId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสหลักสูตร"
    },
    CourseName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ชื่อหลักสูตร"
    },
    Academy: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ชื่อสถานศึกษา"
    },
    AcademyAbbr: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ชื่อย่อของหลักสูตร"
    },
    CourseTotalHrs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "จำนวนชั่วโมงตลอดหลักสูตร"
    },
    CourseEvaluation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "วิธีการวัดผล : GD - เกรด, PR - ร้อยละ, PF - ผ่าน\/ไม่ผ่าน"
    }
  }, {
    sequelize,
    tableName: 'tbpmecourse',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CourseId" },
        ]
      },
    ]
  });
};
