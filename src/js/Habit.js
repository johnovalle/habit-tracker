import React from 'react';

const Habit = (props) => {
  return(
    <div>
      <span onClick={() => {props.retitle('habits', props.id, 'new habit')}}>{props.title}</span>
      {props.children}
    </div>
  )
}

export default Habit;
