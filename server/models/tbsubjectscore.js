const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbsubjectscore', {
    SubjectScoreId: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    SubjectId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PersId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    FullScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SubjectScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    InstructorId: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Grade: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    SubjectScoreDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbsubjectscore',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SubjectScoreId" },
        ]
      },
    ]
  });
};
