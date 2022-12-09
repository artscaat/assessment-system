const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbaccessrights', {
    AccessRightsId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสลำดับการเข้าถึง"
    },
    Approve: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "รออนุมัติ"
    },
    ProcessCenter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "กรรมวิธี ส่วนกลาง"
    },
    Director: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "ผอ"
    },
    Professor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "อาจารย์ประจำหมวด"
    },
    Student: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "นทน."
    },
    EvaluationCenter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "วัดผล ส่วนกลาง"
    },
    Process: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "กรรมวิธี"
    },
    Evaluation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "วัดผล"
    },
    Administrative: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "ปกครอง"
    },
    AcctStatus: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "สถานะบัญชี ระงับการใช้งาน-SUSP,ปกติ-NORM"
    },
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
      allowNull: true,
      comment: "น้ำหนัก"
    },
    PersWeight: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "ส่วนสูง"
    },
    PersCorps: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "เหล่า"
    },
    PersGrp: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "จำพวก"
    },
    PersDutyNum: {
      type: DataTypes.STRING(100),
      allowNull: true,
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
  }, 
  {
    sequelize,
    tableName: 'tbaccessrights',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AccessRightsId" },
        ]
      },
    ]
  });
};
