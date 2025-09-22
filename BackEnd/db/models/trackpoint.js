"use strict";
module.exports = (sequelize, DataTypes) => {
  const TrackPoint = sequelize.define(
    "TrackPoint",
    {
      latitude: { type: DataTypes.DECIMAL(9, 6), allowNull: false },
      longitude: { type: DataTypes.DECIMAL(9, 6), allowNull: false },
      orderIndex: { type: DataTypes.INTEGER, allowNull: false },
      note: DataTypes.TEXT
    },
    {}
  );

  TrackPoint.associate = function (models) {
    TrackPoint.belongsTo(models.Track, { foreignKey: "trackId" });
  };

  return TrackPoint;
};
