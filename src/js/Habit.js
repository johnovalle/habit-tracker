import React from 'react';

const Habit = (props) => {
  const buildTrack = () => {
    let track = [];
    let recentEntries = sortAndFilterEntries(props.entries);
    console.log(recentEntries);
    for (let i = 0; i < 31; i++) {
      let d = new Date();
      d.setDate(d.getDate() - i);
      let status = 'unfilled';
      if(recentEntries.length > 0 && sameDay(d, recentEntries[0].date)) {
        recentEntries.shift();
        status = 'filled';
      }
      status += ' entry-block';
      track.push(<span key={d.getDate()} className={status}></span>);
    }
    return track.reverse();
  }

  const sameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  };

  const sortAndFilterEntries = (entries) => {
    let d = new Date();
    return entries.filter(entry => numDaysBetween(d, entry.date) < 31).sort((a,b) => a.date < b.date);
  };

  const numDaysBetween = (d1, d2) => {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  };
  return(
    <div>
      {props.title}
      {buildTrack()}
    </div>
  )
}

export default Habit;
