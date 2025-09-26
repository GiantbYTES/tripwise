'use strict';
module.exports = (sequelize, DataTypes) => {
  const BudgetItem = sequelize.define('BudgetItem', {
    name: { type: DataTypes.STRING, allowNull: false },
    amount: DataTypes.FLOAT,
    budgetId: { type: DataTypes.INTEGER, allowNull: false }
  }, {});

  BudgetItem.associate = function(models) {
    BudgetItem.belongsTo(models.Budget, { foreignKey: 'budgetId' });
    BudgetItem.hasMany(models.BudgetDetail, { foreignKey: 'budgetItemId' });
  };

  return BudgetItem;
};
