"use strict";
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define(
    "Trip",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {}
  );

  Trip.associate = function (models) {
    Trip.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });
    Trip.hasMany(models.TripMember, { foreignKey: "tripId", as: "members" });
    Trip.hasMany(models.Track, { foreignKey: "tripId", as: "tracks" });
    Trip.hasMany(models.Destination, {
      foreignKey: "tripId",
      as: "destinations",
    });
    Trip.hasMany(models.Expense, { foreignKey: "tripId", as: "expenses" });
    Trip.hasMany(models.Checklist, { foreignKey: "tripId", as: "checklists" });
  };

  return Trip;
};
