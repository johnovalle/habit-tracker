import React from 'react';
import ChangeGroupSelect from '../containers/ChangeGroupSelect';

const Habit = (props) => {
  // habitId, groupId, direction
  // console.log('habit', props);
  return(
    <div>
      <span onClick={() => {props.retitle(props.id, 'new habit')}}>{props.title}</span>
      {props.children}
      <span onClick={props.select}>edit</span>
      {props.selected &&
        <div>
          <span className="order-button" 
                onClick={() => {props.reorder(1)}}>V</span>
          <span className="order-button" 
                onClick={() => {props.reorder(-1)}}>^</span>
          
          <ChangeGroupSelect habitId={props.id} groupId={props.groupId} />
          
          <span className="delete-button" 
                onClick={() => {props.delete()}}>X</span>
        </div>
      }
    </div>
  )
}

export default Habit;
