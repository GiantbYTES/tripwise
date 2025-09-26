'use strict';
module.exports = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    name: { type: DataTypes.STRING, allowNull: false },
    address: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    dayId: { type: DataTypes.INTEGER, allowNull: false }
  }, {});

  Accommodation.associate = function(models) {
    Accommodation.belongsTo(models.Day, { foreignKey: 'dayId' });
  };

  return Accommodation;
};
