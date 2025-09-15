"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tracks", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      tripId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Trips", key: "id" },
        onDelete: "CASCADE",
      },
      name: Sequelize.STRING,
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Tracks");
  },
};
