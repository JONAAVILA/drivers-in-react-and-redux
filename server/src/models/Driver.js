const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('driver', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull:false
    },
    name: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.JSONB
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },{
    timestamps: false
  });
};