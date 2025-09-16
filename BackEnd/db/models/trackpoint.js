'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrackPoint = sequelize.define('TrackPoint', {
    lat: { type: DataTypes.FLOAT, allowNull: false },
    lng: { type: DataTypes.FLOAT, allowNull: false },
    trackId: { type: DataTypes.INTEGER, allowNull: false },
    order: { type: DataTypes.INTEGER } 
  }, {});

  TrackPoint.associate = function(models) {
    TrackPoint.belongsTo(models.Track, { foreignKey: 'trackId' });
  };

  return TrackPoint;
};
