import React from 'react';
import RetitleForm from '../containers/RetitleForm';

const Group = (props) => {
  return(
    <div className="group">
    <div className="group-heading"><span className="group-title">{props.title}</span> 
      {props.id && <span onClick={props.select}>edit</span>}
    </div>
      {props.selected && <div className='group-controls'>
        <span className="order-button" 
              onClick={() => {props.reorder(1)}}>V</span>
        <span className="order-button" 
              onClick={() => {props.reorder(-1)}}>^</span>
        <span  className="delete-button" onClick={props.delete}>X</span>
        <RetitleForm id={props.id} title={props.title} type='group' />
      </div>}
      
      {props.children}
    </div>
  )
}

export default Group;
