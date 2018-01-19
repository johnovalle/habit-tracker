import React from 'react';

const Habit = (props) => {
  const buildTrack = () => {
    let track = [];
    for (let i = 0; i < 31; i++) {
      let d = new Date();
      d.setDate(d.getDate() - i);
      track.push(<span key={d.getDate()} className='entry-block'></span>);
    }
    return track.reverse();
  }
  const sameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }
  return(
    <div>
      {props.title}
      {buildTrack()}
    </div>
  )
}

export default Habit;
