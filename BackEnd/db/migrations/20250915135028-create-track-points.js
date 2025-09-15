"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TrackPoints", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      trackId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Tracks", key: "id" },
        onDelete: "CASCADE",
      },
      latitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: false,
      },
      orderIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      note: Sequelize.TEXT,
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("TrackPoints");
  },
};
