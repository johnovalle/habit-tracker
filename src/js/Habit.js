import React from 'react';

const Habit = (props) => {
  // habitId, groupId, direction
  return(
    <div>
      <span onClick={() => {props.retitle('habits', props.id, 'new habit')}}>{props.title}</span>
      <span onClick={() => {props.reorder(props.id, props.groupId, 'desc')}}>VVVV</span>
      <span onClick={() => {props.reorder(props.id, props.groupId, 'asc')}}>^^^^</span>
      {props.children}
      <span onClick={() => {props.delete('habits', props.id, ['entries'])}}>X</span>
    </div>
  )
}

export default Habit;
