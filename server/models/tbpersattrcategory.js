const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbpersattrcategory', {
    PerAttrCatId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "เลขด้านการประเมินคุณลักษณะส่วนบุคคล"
    },
    PersAttrCatName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "ชื่อด้านการประเมินคุณลักษณะส่วนบุคคล"
    },
    PersAttrCatFullscore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "คะแนนเต็ม"
    }
  }, {
    sequelize,
    tableName: 'tbpersattrcategory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PerAttrCatId" },
        ]
      },
    ]
  });
};
