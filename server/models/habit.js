'use strict';
module.exports = (sequelize, DataTypes) => {
  const Habit = sequelize.define('Habit', {
    title: DataTypes.STRING,
    allowNull: false,
  });

  Habit.associate = (models) => {
    Habit.belongsTo(models.HabitGroup, {
      foreignKey: 'habitGroupId',
      onDelete: 'CASCADE',
    });
  };

  return Habit;
};
