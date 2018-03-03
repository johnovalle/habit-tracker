import React from 'react';

const HabitEntry = (props) => {
  return(
    <span className={props.className} onClick={props.onClick}></span>
  )
}

export default HabitEntry;
