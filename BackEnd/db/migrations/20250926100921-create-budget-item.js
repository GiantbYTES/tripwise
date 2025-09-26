'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BudgetItems', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING, allowNull: false },
      amount: { type: Sequelize.FLOAT },
      budgetId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Budgets', key: 'id' }, onDelete: 'CASCADE' },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('BudgetItems');
  }
};
