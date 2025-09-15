'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    userId: { type: DataTypes.INTEGER, allowNull: false }
  }, {});

  Trip.associate = function(models) {
    Trip.belongsTo(models.User, { foreignKey: 'userId' });
    Trip.hasMany(models.Track, { foreignKey: 'tripId' });
  };

  return Trip;
};
