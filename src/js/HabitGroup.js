import React from 'react';

const HabitGroup = (props) => {
  return(
    <div>
      {props.id ? ( <div onClick={() => {props.retitle('groups', props.id, 'new group')}}>{props.title}</div>
        ) : <div>{props.title}</div>
      }
      {props.children}
    </div>
  )
}

export default HabitGroup;
