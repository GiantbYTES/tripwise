'use strict';
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define('Day', {
    date: { type: DataTypes.DATE, allowNull: false },
    tripId: { type: DataTypes.UUID, allowNull: false } 
  }, {});

  Day.associate = function(models) {
    Day.belongsTo(models.Trip, { foreignKey: 'tripId' });
  };

  return Day;
};
