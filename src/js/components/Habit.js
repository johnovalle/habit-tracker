import React from 'react';

const Habit = (props) => {
  // habitId, groupId, direction
  return(
    <div>
      <span onClick={() => {props.retitle(props.id, 'new habit')}}>{props.title}</span>
      {props.children}
      <span onClick={props.select}>edit</span>
      {props.selected &&
        <div>
          <span className="order-button" 
                onClick={() => {props.reorder(props.id, props.groupId, 'desc')}}>V</span>
          <span className="order-button" 
                onClick={() => {props.reorder(props.id, props.groupId, 'asc')}}>^</span>
          
          <span className="delete-button" 
                onClick={() => {props.delete()}}>X</span>
        </div>
      }
    </div>
  )
}

export default Habit;
