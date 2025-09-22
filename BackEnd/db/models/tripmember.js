"use strict";
module.exports = (sequelize, DataTypes) => {
  const TripMember = sequelize.define(
    "TripMember",
    {
      role: { type: DataTypes.ENUM("viewer", "editor"), defaultValue: "viewer" }
    },
    {}
  );

  TripMember.associate = function (models) {
    TripMember.belongsTo(models.Trip, { foreignKey: "tripId" });
    TripMember.belongsTo(models.User, { foreignKey: "userId" });
  };

  return TripMember;
};
