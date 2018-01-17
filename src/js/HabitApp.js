import React from 'react';
import data from './temp-data';
export default class HabitApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {groups: this.sortHabits(data)};

    console.log(this.state.groups);
  }
  sortHabits(data){
    let habits = this.groupItemByContainer(data.habits, "entires", data.entires, "habitId");

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
  render() {
    return (
      <div>
        <h1>React up and running</h1>
      </div>
    );
  }
}
