"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      name: DataTypes.STRING
    },
    {}
  );

  User.associate = function (models) {
    User.hasMany(models.Trip, { foreignKey: "ownerId", as: "trips" });
    User.hasMany(models.TripMember, { foreignKey: "userId", as: "memberships" });
  };

  return User;
};
