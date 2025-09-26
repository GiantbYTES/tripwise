'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Days', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      date: { type: Sequelize.DATE, allowNull: false },
      tripId: {
        type: Sequelize.UUID,       
        allowNull: false,
        references: { model: 'Trips', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Days');
  }
};
