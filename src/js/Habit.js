import React from 'react';

const Habit = (props) => {
  return(
    <div>
      {props.title}
      {props.children}
    </div>
  )
}

export default Habit;
