import React from 'react';

const HabitGroup = (props) => {
  return(
    <div>
      <div>{props.title}</div>
      {props.children}
    </div>
  )
}

export default HabitGroup;
