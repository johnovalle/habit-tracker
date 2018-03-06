import React from 'react';
import {connect} from 'react-redux';
import HabitGroup from '../components/HabitGroup';
import Habit from '../components/Habit';
import HabitEntry from '../components/HabitEntry';
import AddForm from './AddForm';
import {sameDay, numDaysBetween} from '../dateUtils';
import {setGroups, editGroup} from '../actions/groupActions';
import {setHabits, editHabit} from '../actions/habitActions';
import {setEntries} from '../actions/entryActions';

class HabitApp extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   ...props.data,
    //   groups: [{id: null, title: 'Ungrouped'}, ...props.data.groups],
    //   tempId: 999,
    //   groupOrderMap: {},
    //   habitOrderMap: {},
    // };

    // this.retitle = this.retitle.bind(this);
    this.toggleEntryToHabit = this.toggleEntryToHabit.bind(this);
    this.delete = this.delete.bind(this);
    this.addToCollection = this.addToCollection.bind(this);
    this.changeHabitOrder = this.changeHabitOrder.bind(this);
  }

  componentDidMount() {
    // this.props.setName(name)
    this.props.setState(this.props.data, () => { console.log(this.props) });

    // this.orderAndMapHabits();
    // console.log(this.state);
  }

  buildGroups(groups) {
    // if(groups.length > 0) {
      return groups.map((group) => {
        return (
          <HabitGroup key={group.id} {...group} retitle={this.props.retitle} delete={this.delete}>
            {this.buildHabits(group.id, this.props.habits.items)}
          </HabitGroup>
        );
      });
    //}
  }

  buildHabits(groupId, habits) {
    return habits.map((habit) => { //move this map to groups method
      if(groupId === habit.groupId) {
        return (
          <Habit key={habit.id}
                 {...habit}
                 retitle={this.props.retitle}
                 delete={this.delete}
                 reorder={this.changeHabitOrder}>
            {this.buildTrack(habit.id, this.props.entries, 31)}
          </Habit>
        );
      }
    });
  }

  delete(type, id, cascade) {
    let newCollection = this.state[type].filter(item => item.id !== id);
    let cascadeCollections = {};
    let cascadeIds = {};
    cascade.forEach((collectionType, index) => {
      let newCollection;
      if(index === 0) {
        newCollection = this.state[collectionType].filter(item => {
          if(item[type.slice(0, -1) + 'Id'] !== id) {
            return true;
          }
          cascadeIds[collectionType] = cascadeIds[collectionType] || [];
          cascadeIds[collectionType].push(item.id);
          return false;
        });
      } else {
        newCollection = this.state[collectionType].filter(item => {
          if(cascadeIds[cascade[index - 1]]) {
            if(cascadeIds[cascade[index - 1]].indexOf(item[cascade[index - 1].slice(0, -1) + 'Id']) === -1) {
              return true;
            }
          } else {
            return true;
          }
          cascadeIds[collectionType] = cascadeIds[collectionType] || [];
          cascadeIds[collectionType].push(item.id);
          return false;
        });
      }
      cascadeCollections[collectionType] = newCollection;
    });
    this.setState({[type]: newCollection, ...cascadeCollections}, () => {
      console.log(this.state);
    });
  }

  buildTrack(habitId, entries, range) {
    let track = [];
    let habitEntries = entries.filter(entry => habitId === entry.habitId); // move this habits
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
      track.push(<HabitEntry key={d.toLocaleDateString('en-US')+habitId} className={statusClass} onClick={() => this.toggleEntryToHabit(habitId, d, entry)}/>);
    }
    return track.reverse();
  }

  sortAndFilterEntries(entries, range) {
    let d = new Date();
    return entries.filter(entry => numDaysBetween(d, entry.date) < range).sort((a,b) => a.date < b.date);
  }

  toggleEntryToHabit(habitId, date, prevEntry) {
    if (!prevEntry) {
      let entry = {id: this.state.tempId, habitId, date};
      this.setState({entries: [...this.state.entries, entry], tempId: this.state.tempId + 1});
    } else {
      let entries = this.state.entries.filter(entry => prevEntry.id !== entry.id);
      this.setState({entries});
    }
  }

  addToCollection(type, targetKey = null, targetId = null, title, callback) {
    let newItem;
    if(targetKey) {
      let order = this.state[type].filter(item => item[targetKey] === parseInt(targetId)).length;
      newItem = {id: this.state.tempId, title, [targetKey]: parseInt(targetId), order};
    } else {
      newItem = {id: this.state.tempId, title, order: this.state[type].length};
    }

    let newCollection = [...this.state[type], newItem];
    this.setState({[type]: newCollection, tempId: this.state.tempId + 1}, () => {
      console.log('state:', this.state);
      this.orderAndMapHabits();
    });
    callback();
  }

  orderAndMapHabits() {
    let sorted = [...this.state.habits].sort((a,b) => a.order - b.order);
    let habitOrderMap = {};
    sorted.forEach(habit => {
      habitOrderMap[habit.groupId] = habitOrderMap[habit.groupId] || [];
      habitOrderMap[habit.groupId].push(habit.id);
    });
    this.setState({habits: sorted, habitOrderMap}, () => {
      console.log(this.state);
    });
  }

  changeHabitOrder(habitId, groupId, direction) { //need to add order when adding habit

    let groupOrder = this.state.habitOrderMap[groupId];
    let currentLocation = groupOrder.indexOf(habitId);
    let swap;
    let newOrder = [...groupOrder];
    let dirModifier = 1;
    let swapped = false;
    console.log(habitId, groupId, direction, currentLocation);

    if (direction === 'asc' && currentLocation !== 0) {
      swap = groupOrder[currentLocation - 1];
      newOrder[currentLocation - 1] = groupOrder[currentLocation];
      newOrder[currentLocation] = swap;
      swapped = true;
    } else if (direction === 'desc' && currentLocation !== groupOrder.length - 1) {
      swap = groupOrder[currentLocation + 1];
      newOrder[currentLocation + 1] = groupOrder[currentLocation];
      newOrder[currentLocation] = swap;
      dirModifier *= -1;
      swapped = true;
    }
    if (swapped) {
      let newHabits = this.state.habits.map(habit => {
        if (habit.id === swap) {
          return {...habit, order: (habit.order + dirModifier) }
        }
        if (habit.id === habitId) {
          return {...habit, order: (habit.order + (dirModifier * -1)) }
        }
        return habit;
      });
      this.setState({habitOrderMap: {...this.state.habitOrderMap, [groupId]: newOrder },
                    habits: newHabits}, () => {
                      this.orderAndMapHabits();
                    });
    }

  }
  // move habit from group to group

  render() {
    console.log(this.props.groups);
    return (
      <div className="content">
        <h1 className="app-title">Habit Tracker</h1>
        {this.buildGroups(this.props.groups.items)}
        <AddForm
          type='groups'
          title='Add a new group'
          action={this.addToCollection}
        />
        <AddForm
          type='habits'
          title='Add a new habit'
          targetKey='groupId'
          targetId='1'
          action={this.addToCollection}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    habits: state.habits,
    entries: state.entries,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setState({groups, habits, entries}, callback) {
      console.log("Setting up app",groups, habits, entries);
      dispatch(setGroups(groups));
      dispatch(setHabits(habits));
      dispatch(setEntries(entries));
      callback();
    },
    retitle(type, id, title) {
      const payload = {id, title};
      if (type === 'groups') {
        dispatch(editGroup(payload));
      } else if (type === 'habits') {
        dispatch(editHabit(payload))
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitApp);
