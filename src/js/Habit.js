import React from 'react';

const Habit = (props) => {
  return(
    <div>
      <span onClick={() => {props.retitle('habits', props.id, 'new habit')}}>{props.title}</span>
      {props.children}
      <span onClick={() => {props.delete('habits', props.id, ['entries'])}}>X</span>
    </div>
  )
}

export default Habit;
