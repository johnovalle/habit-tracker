import React from 'react';
import HabitGroup from './HabitGroup';
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
      return <HabitGroup key={group.id} title={group.title || 'none'} habits={group.habits} />
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

  render() {
    return (
      <div>
        <h1>React up and running</h1>
        {this.buildGroups(this.state.groups)}
      </div>
    );
  }
}
