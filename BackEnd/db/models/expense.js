"use strict";
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    "Expense",
    {
      category: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      description: DataTypes.TEXT
    },
    {}
  );

  Expense.associate = function (models) {
    Expense.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return Expense;
};
