'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    airline: { type: DataTypes.STRING, allowNull: false },
    flightNumber: { type: DataTypes.STRING, allowNull: false },
    departureAirport: { type: DataTypes.STRING, allowNull: false },
    arrivalAirport: { type: DataTypes.STRING, allowNull: false },
    departureTime: { type: DataTypes.DATE, allowNull: false },
    arrivalTime: { type: DataTypes.DATE, allowNull: false },
    tripId: { type: DataTypes.UUID, allowNull: false }, 
    dayId: { type: DataTypes.INTEGER, allowNull: true }
  }, {});

  Flight.associate = function(models) {
    Flight.belongsTo(models.Trip, { foreignKey: 'tripId' });
    Flight.belongsTo(models.Day, { foreignKey: 'dayId' });
  };

  return Flight;
};
