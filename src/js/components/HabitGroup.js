import React from 'react';

const HabitGroup = (props) => {
  return(
    <div className="group">
      {props.id ? ( 
      <div  className="group-heading">
        <span className="group-title" 
              onClick={() => {props.retitle('groups', props.id, 'new group')}}>
              {props.title}
        </span>
        <span  className="delete-button" onClick={props.delete}>X</span>
      </div>
        ) : <div  className="group-heading"><span className="group-title">{props.title}</span></div>
      }
      
      {props.children}
    </div>
  )
}

export default HabitGroup;
