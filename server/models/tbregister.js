const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbregister', {
    PersId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      comment: "เลขประจำตัวข้าราชการ"
    },
    Rank: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "ยศ"
    },
    PersFname: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "ชื่อ"
    },
    PersLname: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "นามสกุล"
    },
    PersHeight: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "น้ำหนัก"
    },
    PersWeight: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "ส่วนสูง"
    },
    PersCorps: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "เหล่า"
    },
    PersGrp: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "จำพวก"
    },
    PersDutyNum: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "ลชทอ"
    },
    PersCurrPosition: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "ตำแหน่ง"
    },
    PersAffiliation: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "สังกัด"
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbregister',
    timestamps: false
  });
};
