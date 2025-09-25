"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Checklists", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true
      },
      tripId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Trips", key: "id" },
        onDelete: "CASCADE"
      },
      type: {
        type: Sequelize.ENUM("preTravel", "packing"),
        allowNull: false
      },
      task: { type: Sequelize.STRING, allowNull: false },
      completed: { type: Sequelize.BOOLEAN, defaultValue: false },
      category: Sequelize.STRING,
      importance: Sequelize.ENUM("Critical", "High", "Medium", "Low"),
      note: Sequelize.TEXT,
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Checklists");
  }
};
