import React from 'react';
import ChangeGroupSelect from '../containers/ChangeGroupSelect';
import RetitleForm from '../containers/RetitleForm';


const Habit = (props) => {
  // habitId, groupId, direction
  // console.log('habit', props);
  return(
    <div>
      <span>{props.title}</span>
      {props.children}
      <span onClick={props.select}>edit</span>
      {props.selected &&
        <div>
          <span className="order-button" 
                onClick={() => {props.reorder(1)}}>V</span>
          <span className="order-button" 
                onClick={() => {props.reorder(-1)}}>^</span>
          
          <ChangeGroupSelect habitId={props.id} groupId={props.groupId} />
          <RetitleForm id={props.id} title={props.title} type='habit' />
          
          <span className="delete-button" 
                onClick={() => {props.delete()}}>X</span>
        </div>
      }
    </div>
  )
}

export default Habit;
