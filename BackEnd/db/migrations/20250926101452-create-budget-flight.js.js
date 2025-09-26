'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      airline: { type: Sequelize.STRING, allowNull: false },
      flightNumber: { type: Sequelize.STRING, allowNull: false },
      departureAirport: { type: Sequelize.STRING, allowNull: false },
      arrivalAirport: { type: Sequelize.STRING, allowNull: false },
      departureTime: { type: Sequelize.DATE, allowNull: false },
      arrivalTime: { type: Sequelize.DATE, allowNull: false },
      tripId: {
        type: Sequelize.UUID, 
        allowNull: false,
        references: { model: 'Trips', key: 'id' },
        onDelete: 'CASCADE'
      },
      dayId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Days', key: 'id' },
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Flights');
  }
};
