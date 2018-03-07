import React from 'react';

const Habit = (props) => {
  // habitId, groupId, direction
  return(
    <div>
      <span onClick={() => {props.retitle('habits', props.id, 'new habit')}}>{props.title}</span>
      <span className="order-button" 
            onClick={() => {props.reorder(props.id, props.groupId, 'desc')}}>V</span>
      <span className="order-button" 
            onClick={() => {props.reorder(props.id, props.groupId, 'asc')}}>^</span>
      {props.children}
      <span className="delete-button" 
            onClick={() => {props.delete(props.id, ['entries'])}}>X</span>
    </div>
  )
}

export default Habit;
