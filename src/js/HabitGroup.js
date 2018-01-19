import React from 'react';
import Habit from './Habit';

const HabitGroup = (props) => {
  const buildHabits = (habits) => {
    console.log(habits);
    return habits.map((habit) => {
      return <Habit key={habit.id} title={habit.title} entries={habit.entries} />
    });
  }

  return(
    <div>
      <div>{props.title}</div>
      {buildHabits(props.habits)}
    </div>
  )
}

export default HabitGroup;
