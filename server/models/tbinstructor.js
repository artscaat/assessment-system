const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbinstructor', {
    InstructorId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสประจำตัวอาจารย์"
    },
    Rank: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ยศ"
    },
    InstructorFname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ชื่อ อาจารย์"
    },
    InstructorLname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "นามสกุลอาจารย์"
    },
    InstructorCurrPos: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ตำแหน่งปัจจุบัน"
    },
    InstructorExtraPos: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ตำแหน่งเพิ่มเติม"
    },
    PersAffiliation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "สังกัด"
    },
    AccessRightsId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "รหัสลำดับการเข้าถึง"
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "emailuser"
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "passworduser"
    },
    SubjectName: {
      type: DataTypes.STRING(40),
      allowNull: false,
      comment: "ชื่อวิชา"
    }
  }, {
    sequelize,
    tableName: 'tbinstructor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "InstructorId" },
        ]
      },
    ]
  });
};
