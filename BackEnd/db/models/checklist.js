"use strict";
module.exports = (sequelize, DataTypes) => {
  const Checklist = sequelize.define(
    "Checklist",
    {
      tripId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      type: {               
        type: DataTypes.ENUM("preTravel", "packing"),
        allowNull: false
      },
      task: {               
        type: DataTypes.STRING,
        allowNull: false
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      category: {           
        type: DataTypes.STRING
      },
      importance: {         
        type: DataTypes.ENUM("Critical", "High", "Medium", "Low")
      },
      note: DataTypes.TEXT
    },
    {}
  );

  Checklist.associate = function (models) {
    Checklist.belongsTo(models.Trip, { foreignKey: "tripId", as: "trip" });
  };

  return Checklist;
};