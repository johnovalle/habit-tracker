import React from 'react';
import HabitGroup from './HabitGroup';
import Habit from './Habit';
import {sameDay, numDaysBetween} from './dateUtils';

export default class HabitApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      groups: [{id: null, title: 'Ungrouped'}, ...props.data.groups],
      tempId: 999,
    };
    console.log(this.state);
  }

  buildGroups(groups) {
    return groups.map((group) => {
      return (
        <HabitGroup key={group.id} {...group}>
          {this.buildHabits(group.id, this.state.habits)}
        </HabitGroup>
      );
    });
  }

  buildHabits(groupId, habits) {
    // {this.buildTrack(habit.entries)}
    return habits.map((habit) => {
      if(groupId === habit.groupId) {
        return (
          <Habit key={habit.id} {...habit}>
            {this.buildTrack(habit.id, this.state.entries, 31)}
          </Habit>
        );
      }
    });
  }

  buildTrack(habitId, entries, range) {
    let track = [];
    let habitEntries = entries.filter(entry => habitId === entry.habitId);
    let recentEntries = this.sortAndFilterEntries(habitEntries, range);
    console.log(recentEntries);
    for (let i = 0; i < range; i++) {
      let d = new Date();
      d.setDate(d.getDate() - i);
      let status = 'unfilled';
      if(recentEntries.length > 0 && sameDay(d, recentEntries[0].date)) {
        recentEntries.shift();
        status = 'filled';
      }
      status += ' entry-block';
      track.push(<span key={d.getDate()} className={status}></span>); //build entry component
    }
    return track.reverse();
  }

  sortAndFilterEntries(entries, range) {
    let d = new Date();
    return entries.filter(entry => numDaysBetween(d, entry.date) < range).sort((a,b) => a.date < b.date);
  }

  // addEntryToHabit(habit, date) {
  //   let targetGroup, targetHabit; //theres gotta be better way to do this

  //   for (let i = 0; i < this.state.groups.length; i++) {
  //     if (this.state.groups[i].id === habit.groupId) {
  //       targetGroup = this.state.groups[i];
  //       break;
  //     }
  //   }

  //   for (let i = 0; i < targetGroup.habits.length; i++) {
  //     if (targetGroup.habits.id === habit.id) {
  //       targetHabit = targetGroup.habits[i];
  //       break;
  //     }
  //   }
  //   targetHabit.entries = targetHabit.entries.concat([{id: this.state.tempId, habitId: targetHabit.id, date: new Date(date)},])
  //   //targetGroup.
  //   // this.setState(prevState => ({
  //   //   ...prevState,
  //   //   groups: prevState.groups.map()
  //   // }));
  // }

  render() {
    return (
      <div>
        <h1>Habit tracker</h1>
        {this.buildGroups(this.state.groups)}
      </div>
    );
  }
}
