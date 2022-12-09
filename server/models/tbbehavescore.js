const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbbehavescore', {
    BehaveScoreId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "รหัสคะแนนความประพฤติส่วนบุคคล"
    },
    PersId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "รหัสประจำตัวข้าราชการ"
    },
    BehaveScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "คะแนนความประพฤติส่วนบุคคล"
    },
    InstructorId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "รหัสประจำตัวอาจารย์"
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "วันที่ลงคะแนน"
    }
  }, {
    sequelize,
    tableName: 'tbbehavescore',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "BehaveScoreId" },
        ]
      },
    ]
  });
};
