import React from 'react';
import Habit from './Habit';

const HabitGroup = (props) => {
  const buildHabits = (habits) => {
    return habits.map((habit) => {
      <Habit name={habit.name} entries={habit.entries} />
    });
  }
  return(
    <div>
      {buildHabits(props.habits)}
    </div>
  )
}

export default HabitGroup;
