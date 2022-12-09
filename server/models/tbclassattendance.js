// // 

// const Sequelize = require('sequelize');
// module.exports = function(sequelize, DataTypes) {
//   return sequelize.define('tbclassattendance', {
//     ClassAttendId: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       primaryKey: true,
//       comment: "รหัสการลงประวัติการลา"
//     },
//     PersId: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       comment: "เลขประจำตัวข้าราชการ"
//     },
//     BeginLeaveDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       comment: "วันเริ่มต้นการลา"
//     },
//     BeginLeaveTime: {
//       type: DataTypes.TIME,
//       allowNull: false,
//       comment: "เวลาเริ่มต้นการลา"
//     },
//     EndLeaveDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       comment: "วันสิ้นสุดการลา"
//     },
//     EndLeaveTime: {
//       type: DataTypes.TIME,
//       allowNull: false,
//       comment: "เวลาสิ้นสุดการลา"
//     },
//     LeaveHrs: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//       comment: "จำนวนชั่วโมงการลา"
//     },
//     LeaveType: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       comment: "ประเภทการลา : S - ลาป่วย และ B - ลากิจ"
//     },
//     Reason: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       comment: "เหตุผลการลา"
//     },
//     filepath: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       comment: "ที่เก็บไฟล์เอกสารการลา"
//     },
//     InstructorId: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       comment: "ผู้ลงบันทึก"
//     }
//   }, {
//     sequelize,
//     tableName: 'tbclassattendance',
//     timestamps: false,
//     indexes: [
//       {
//         name: "PRIMARY",
//         unique: true,
//         using: "BTREE",
//         fields: [
//           { name: "ClassAttendId" },
//         ]
//       },
//     ]
//   });
// };


const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbclassattendance', {
    ClassAttendId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสการลงประวัติการลา"
    },
    PersId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "เลขประจำตัวข้าราชการ"
    },
    BeginLeaveDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "วันเริ่มต้นการลา"
    },
    BeginLeaveTime: {
      type: DataTypes.TIME,
      allowNull: false,
      comment: "เวลาเริ่มต้นการลา"
    },
    EndLeaveDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "วันสิ้นสุดการลา"
    },
    EndLeaveTime: {
      type: DataTypes.TIME,
      allowNull: false,
      comment: "เวลาสิ้นสุดการลา"
    },
    LeaveHrs: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "จำนวนชั่วโมงการลา"
    },
    LeaveType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ประเภทการลา : S - ลาป่วย และ B - ลากิจ"
    },
    Reason: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "เหตุผลการลา"
    },
    filepath: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "ที่เก็บไฟล์เอกสารการลา"
    },
    InstructorId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ผู้ลงบันทึก"
    }
  }, {
    sequelize,
    tableName: 'tbclassattendance',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ClassAttendId" },
        ]
      },
    ]
  });
};