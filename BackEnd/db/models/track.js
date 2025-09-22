"use strict";
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    "Track",
    {
      name: DataTypes.STRING
    },
    {}
  );

  Track.associate = function (models) {
    Track.belongsTo(models.Trip, { foreignKey: "tripId" });
    Track.hasMany(models.TrackPoint, { foreignKey: "trackId", as: "points" });
  };

  return Track;
};
