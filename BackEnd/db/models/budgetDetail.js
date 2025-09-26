'use strict';
module.exports = (sequelize, DataTypes) => {
  const BudgetDetail = sequelize.define('BudgetDetail', {
    description: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    budgetItemId: { type: DataTypes.INTEGER, allowNull: false }
  }, {});

  BudgetDetail.associate = function(models) {
    BudgetDetail.belongsTo(models.BudgetItem, { foreignKey: 'budgetItemId' });
  };

  return BudgetDetail;
};
