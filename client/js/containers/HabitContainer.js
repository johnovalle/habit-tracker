import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import Habit from '../components/Habit';
import HabitEntry from '../components/HabitEntry';
import AddForm from './AddForm';
import {sameDay, numDaysBetween} from '../dateUtils';
import {addHabit, changeHabitOrder, selectHabit, deleteHabit} from '../actions/habitActions';
import {deleteEntry, addEntry} from '../actions/entryActions';

class HabitContainer extends React.Component {

  constructor(props){
    super(props);
    this.addToCollection = this.addToCollection.bind(this);
  }

  buildHabits(habits) {
    return habits.map((habit) => {

      let habitEntries = this.props.entries.filter(entry => habit.id === entry.habitId);
      // console.log('selected', habit.id, this.props.selected, this.props.selected === habit.id)
      return (
        <Habit key={habit.id}
                {...habit}
                delete={() => this.props.deleteHabit(habit.id, habitEntries.map(entry => entry.id))}
                reorder={this.changeHabitOrder.bind(this, habit, habit.groupId)}
                selected={this.props.selected === habit.id}
                select={this.props.select.bind(null, habit.id)}>
          {this.buildTrack(habit.id, habitEntries, 31)}
        </Habit>
      );

    });
  }

  buildTrack(habitId, entries, range) {
    let track = [];
    let recentEntries = this.sortAndFilterEntries(entries, range);

    for (let i = 0; i < range; i++) {
      let d = new Date();
      d.setDate(d.getDate() - i);
      let status = 'unfilled';
      let entry;
      if(recentEntries.length > 0 && sameDay(d, new Date(recentEntries[0].date))) {
        entry = recentEntries.shift();
        status = 'filled';
      }
      let statusClass = status + ' entry-block';
      track.push(<HabitEntry key={d.toLocaleDateString('en-US')+habitId}
                              className={statusClass}
                              onClick={() => this.props.toggleEntry(habitId, d, entry)}/>);
    }
    return track.reverse();
  }

  addToCollection(groupId, title) {

    groupId = groupId ? parseInt(groupId) : groupId;
    let priority = this.props.habits.filter(item => item.groupId === groupId).length;

    let payload = {title, groupId, priority};

    this.props.addToCollection(payload);
  }

  sortAndFilterEntries(entries, range) {
    let d = new Date();
    return entries.filter(entry => numDaysBetween(d, new Date(entry.date)) < range).sort((a,b) => a.date < b.date);
  }

  changeHabitOrder(target, groupId, direction) {
    let changedHabits = changeOrder(this.props.habits, this.props.map, target, groupId, direction);
    if(changedHabits) {
      this.props.changeHabitOrder(changedHabits);
    }
  }

  render() {
    return (<div>
      {this.buildHabits(this.props.habits)}
      <AddForm
          title='Add a new habit'
          targetId={this.props.groupId}
          action={this.addToCollection}
        />
      </div>)
  }
}

const changeOrder = (habits, map, target, groupId, direction) => {
  let groupOrder = map[groupId];
  let currentLocation = groupOrder.indexOf(target.id);
  let swap;
  let swapped = false;
  let swapTarget;

  if ((direction === -1 && currentLocation !== 0) ||
      (direction === 1 && currentLocation !== groupOrder.length - 1)) {
    swap = groupOrder[currentLocation + direction];
    swapped = true;
  }

  if (swapped) {
    for (let habit of habits) {
      if (habit.id === swap) {
        swapTarget = habit;
      }
    }

    let newHabits = habits.reduce((acc, habit) => {
      if (habit.id === swap) {
        acc.push({...habit, priority: target.priority });
      }
      if (habit.id === target.id) {
        acc.push({...habit, priority: swapTarget.priority });
      }
      return acc;
    }, []);

    return newHabits

  }
  return false;
};

const mapStateToProps = (state, ownProps) => {
  return {
    habits: state.habits.items.filter((habit) => ownProps.habitIds.indexOf(habit.id) !== -1),
    entries: state.entries,
    groupId: ownProps.groupId,
    selected: state.habits.selected,
    map: state.habits.map,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCollection(payload) {
      axios.post('/api/habit', payload)
        .then(({data}) => {
          dispatch(addHabit(data));
        })
        .catch(err => console.log(err));

    },
    changeHabitOrder(habits) {
      axios.put('/api/habit', {habits}).then(() => {

        dispatch(changeHabitOrder({habits}));
      })
      .catch(err => console.log(err));
    },
    deleteHabit(habitId, entryIds) {
      axios.delete(`/api/habit/${habitId}`).then(() => {
        dispatch(deleteHabit({habitIds: [habitId]}));
        dispatch(deleteEntry({entryIds}));
      })
      .catch(err => console.log(err));
    },
    toggleEntry(habitId, date, entry) {
      if (!entry) {
        axios.post('/api/entry', {habitId, date}).then(({data}) => {
          dispatch(addEntry(data));
        })

      } else {
        axios.delete(`/api/entry/${entry.id}`, {entryIds: [entry.id]}).then(() => {
          dispatch(deleteEntry({entryIds: [entry.id]}));
        })

      }
    },
    select(habitId) {
      dispatch(selectHabit(habitId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitContainer);
