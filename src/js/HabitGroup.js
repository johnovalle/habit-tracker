import React from 'react';

const HabitGroup = (props) => {
  return(
    <div>
      {props.id ? ( 
      <div>
        <div onClick={() => {props.retitle('groups', props.id, 'new group')}}>{props.title}</div>
        <span onClick={() => {props.delete('groups', props.id, ['habits', 'entries'])}}>X</span>
      </div>
        ) : <div>{props.title}</div>
      }
      
      {props.children}
    </div>
  )
}

export default HabitGroup;
