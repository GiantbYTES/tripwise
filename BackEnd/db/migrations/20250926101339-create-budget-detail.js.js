'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BudgetDetails', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      description: { type: Sequelize.STRING },
      cost: { type: Sequelize.FLOAT },
      budgetItemId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'BudgetItems', key: 'id' }, onDelete: 'CASCADE' },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('BudgetDetails');
  }
};
