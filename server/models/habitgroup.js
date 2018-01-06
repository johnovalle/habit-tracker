'use strict';
module.exports = (sequelize, DataTypes) => {
  const HabitGroup = sequelize.define('HabitGroup', {
    title: DataTypes.STRING,
    allowNull: false,
  });

  HabitGroup.associate = (models) => {
    HabitGroup.hasMany(models.Habit, {
      foreignKey: 'habitGroupId',
      as: 'habits'
    });
  };

  return HabitGroup;
};
