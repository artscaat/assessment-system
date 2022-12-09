const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbpersattrscore', {
    PersAttrScoreId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสคะแนนประเมินคุณลักษณะส่วนบุคคล"
    },
    PersAttrCatId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "เลขด้านการประเมินคุณลักษณะส่วนบุคคล"
    },
    PersId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "รหัสประจำตัวข้าราชการ"
    },
    PerAttrScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "คะแนนประเมินคุณลักษณะส่วนบุคคลแต่ละด้าน"
    },
    InstructorId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "รหัสประจำตัวอาจารย์"
    },
    PerAttrScoreDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "วันที่ลงคะแนน"
    }
  }, {
    sequelize,
    tableName: 'tbpersattrscore',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PersAttrScoreId" },
        ]
      },
    ]
  });
};
