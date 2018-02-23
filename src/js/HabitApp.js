import React from 'react';
import HabitGroup from './HabitGroup';
import Habit from './Habit';
import data from './temp-data';
export default class HabitApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: this.sortHabits(data),
      tempId: 999,
    };

    //console.log(this.state.groups);
  }

  sortHabits(data){
    let habits = this.groupItemByContainer(data.habits, "entries", data.entries, "habitId");

    data.groups.push({id: null, habits: []});
    let groups = this.groupItemByContainer(data.groups, "habits", habits, "groupId");

    return groups;
  }

  groupItemByContainer(containers, type, items, fKey) {
    let containerMap = {};
    for(let i = 0; i < containers.length; i++) {
      containerMap[containers[i].id] = containers[i];
    }

    for(let i = 0; i < items.length; i++) {
      containerMap[items[i][fKey]][type].push(items[i]);
    }
    return containers;
  }

  buildGroups(groups) {
    return groups.map((group) => {
      //console.log(group.habits);
      return (
      <HabitGroup key={group.id} title={group.title || 'none'}>
        {this.buildHabits(group.habits)}
      </HabitGroup>
    )
    });
  }

  addEntryToHabit(habit, date) {
    let targetGroup, targetHabit; //theres gotta be better way to do this

    for (let i = 0; i < this.state.groups.length; i++) {
      if (this.state.groups[i].id === habit.groupId) {
        targetGroup = this.state.groups[i];
        break;
      }
    }

    for (let i = 0; i < targetGroup.habits.length; i++) {
      if (targetGroup.habits.id === habit.id) {
        targetHabit = targetGroup.habits[i];
        break;
      }
    }
    targetHabit.entries = targetHabit.entries.concat([{id: this.state.tempId, habitId: targetHabit.id, date: new Date(date)},])
    //targetGroup.
    // this.setState(prevState => ({
    //   ...prevState,
    //   groups: prevState.groups.map()
    // }));
  }

  buildHabits(habits) {
    console.log(habits);
    return habits.map((habit) => {
      return (
        <Habit key={habit.id} title={habit.title} entries={habit.entries}>
          {this.buildTrack(habit.entries)}
        </Habit>
      );
    });
  }

  buildTrack(entries) {
    let track = [];
    let recentEntries = this.sortAndFilterEntries(entries);
    console.log(recentEntries);
    for (let i = 0; i < 31; i++) {
      let d = new Date();
      d.setDate(d.getDate() - i);
      let status = 'unfilled';
      if(recentEntries.length > 0 && this.sameDay(d, recentEntries[0].date)) {
        recentEntries.shift();
        status = 'filled';
      }
      status += ' entry-block';
      track.push(<span key={d.getDate()} className={status}></span>); //build entry component
    }
    return track.reverse();
  }
  //move these methods to utility
  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  };

  sortAndFilterEntries(entries) {
    let d = new Date();
    return entries.filter(entry => this.numDaysBetween(d, entry.date) < 31).sort((a,b) => a.date < b.date);
  }

  numDaysBetween(d1, d2) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  }

  render() {
    return (
      <div>
        {this.buildGroups(this.state.groups)}
      </div>
    );
  }
}
