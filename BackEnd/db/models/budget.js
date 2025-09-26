"use strict";
module.exports = (sequelize, DataTypes) => {
  const Budget = sequelize.define(
    "Budget",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      tripId: {
        type: DataTypes.UUID,
        references: { model: "Trips", key: "id" },
      },
    },
    {}
  );

  Budget.associate = function (models) {
    Budget.belongsTo(models.Trip, { foreignKey: "tripId" });
    Budget.hasMany(models.BudgetItem, { foreignKey: "budgetId" });
  };

  return Budget;
};
