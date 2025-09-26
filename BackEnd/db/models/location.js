'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    dayId: { type: DataTypes.INTEGER, allowNull: false }
  }, {});

  Location.associate = function(models) {
    Location.belongsTo(models.Day, { foreignKey: 'dayId' });
  };

  return Location;
};
