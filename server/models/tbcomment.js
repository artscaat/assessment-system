const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbcomment', {
    CommentId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PersId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "รหัสประจำตัวข้าราชการ"
    },
    InsructorId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "รหัสประจำตัวอาจารย์"
    },
    CommentDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "ความคิดเห็น"
    },
    CommentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "วันที่ลงความคิดเห็น"
    }
  }, {
    sequelize,
    tableName: 'tbcomment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CommentId" },
        ]
      },
    ]
  });
};
