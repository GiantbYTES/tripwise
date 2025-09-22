"use strict";
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    "Activity",
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.TEXT,
      cost: DataTypes.DECIMAL
    },
    {}
  );

  Activity.associate = function (models) {
    Activity.belongsTo(models.Destination, { foreignKey: "destinationId" });
  };

  return Activity;
};
