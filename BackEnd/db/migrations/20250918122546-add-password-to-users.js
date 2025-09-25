"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Users");
    if (!table.password) {
      await queryInterface.addColumn("Users", "password", {
        type: Sequelize.STRING,
        allowNull: false
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Users");
    if (table.password) {
      await queryInterface.removeColumn("Users", "password");
    }
  }
};
