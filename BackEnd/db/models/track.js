'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    name: { type: DataTypes.STRING, allowNull: false },
    tripId: { type: DataTypes.INTEGER, allowNull: false }
  }, {});

  Track.associate = function(models) {
    Track.belongsTo(models.Trip, { foreignKey: 'tripId' });
    Track.hasMany(models.TrackPoint, { foreignKey: 'trackId' });
  };

  return Track;
};
