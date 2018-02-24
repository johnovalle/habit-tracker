import React from 'react';
import HabitGroup from './HabitGroup';
import Habit from './Habit';
import HabitEntry from './HabitEntry';
import {sameDay, numDaysBetween} from './dateUtils';

export default class HabitApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      groups: [{id: null, title: 'Ungrouped'}, ...props.data.groups],
      tempId: 999,
    };
    this.retitle = this.retitle.bind(this);
    this.toggleEntryToHabit = this.toggleEntryToHabit.bind(this);
  }

  buildGroups(groups) {
    return groups.map((group) => {
      return (
        <HabitGroup key={group.id} {...group} retitle={this.retitle}>
          {this.buildHabits(group.id, this.state.habits)}
        </HabitGroup>
      );
    });
  }

  buildHabits(groupId, habits) {
    return habits.map((habit) => {
      if(groupId === habit.groupId) {
        return (
          <Habit key={habit.id} {...habit} retitle={this.retitle}>
            {this.buildTrack(habit.id, this.state.entries, 31)}
          </Habit>
        );
      }
    });
  }

  retitle(type, id, title) {
    let newCollection = this.state[type].map(item => {
      if(item.id === id) {
        return {...item, title};
      }
      return item;
    });
    this.setState({...this.state, [type]: newCollection});
  }

  buildTrack(habitId, entries, range) {
    let track = [];
    let habitEntries = entries.filter(entry => habitId === entry.habitId);
    let recentEntries = this.sortAndFilterEntries(habitEntries, range);
    // console.log(recentEntries);
    for (let i = 0; i < range; i++) {
      let d = new Date();
      d.setDate(d.getDate() - i);
      let status = 'unfilled';
      let entry;
      if(recentEntries.length > 0 && sameDay(d, recentEntries[0].date)) {
        entry = recentEntries.shift();
        status = 'filled';
      }
      let statusClass = status + ' entry-block';
      track.push(<HabitEntry key={d.getDate()} className={statusClass} onClick={() => this.toggleEntryToHabit(habitId, d, entry)}/>);
    }
    return track.reverse();
  }

  sortAndFilterEntries(entries, range) {
    let d = new Date();
    return entries.filter(entry => numDaysBetween(d, entry.date) < range).sort((a,b) => a.date < b.date);
  }

  toggleEntryToHabit(habitId, date, prevEntry) {
    console.log('toggleEntry', habitId, date, prevEntry);
    if (!prevEntry) {
      let entry = {id: this.state.tempId, habitId, date};
      this.setState({...this.state, entries: [...this.state.entries, entry], tempId: this.state.tempId + 1});
    } else {
      let entries = this.state.entries.filter(entry => prevEntry.id !== entry.id);
      this.setState({...this.state, entries});
    }
  }

  render() {
    return (
      <div>
        <h1>Habit tracker</h1>
        {this.buildGroups(this.state.groups)}
      </div>
    );
  }
}
