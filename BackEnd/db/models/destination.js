"use strict";
module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define(
    "Destination",
    {
      name: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {}
  );

  Destination.associate = function (models) {
    Destination.belongsTo(models.Trip, { foreignKey: "tripId" });
    Destination.hasMany(models.Activity, { foreignKey: "destinationId", as: "activities" });
  };

  return Destination;
};
