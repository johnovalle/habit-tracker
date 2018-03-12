import React from 'react';
import {connect} from 'react-redux';
import Habit from '../components/Habit';
import HabitEntry from '../components/HabitEntry';
import AddForm from './AddForm';
import {sameDay, numDaysBetween} from '../dateUtils';
import {editHabit, addHabit, changeHabitOrder, selectHabit, deleteHabit} from '../actions/habitActions';
import {deleteEntry, addEntry} from '../actions/entryActions';

class HabitContainer extends React.Component {

  buildHabits(habits) {
    return habits.map((habit) => {
      
      let habitEntries = this.props.entries.filter(entry => habit.id === entry.habitId);
      console.log('selected', habit.id, this.props.selected, this.props.selected === habit.id)
      return (
        <Habit key={habit.id}
                {...habit}
                retitle={this.props.retitle}
                delete={() => this.props.deleteHabit(habit.id, habitEntries.map(entry => entry.id))}
                reorder={this.props.changeHabitOrder}
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
      if(recentEntries.length > 0 && sameDay(d, recentEntries[0].date)) {
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

  sortAndFilterEntries(entries, range) {
    let d = new Date();
    return entries.filter(entry => numDaysBetween(d, entry.date) < range).sort((a,b) => a.date < b.date);
  }

  render() {
    return (<div>
      {this.buildHabits(this.props.habits)}
      <AddForm
          title='Add a new habit'
          targetId={this.props.groupId}
          action={this.props.addToCollection}
        />
      </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    habits: state.habits.items.filter((habit) => ownProps.habitIds.indexOf(habit.id) !== -1),
    entries: state.entries,
    groupId: ownProps.groupId,
    selected: state.habits.selected,

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    retitle(id, title) {
      dispatch(editHabit({id, title}));
    },
    addToCollection(targetId, title) {
      dispatch(addHabit({targetId, title}));
    },
    changeHabitOrder(habitId, groupId, direction) {
      console.log('action prop', habitId, groupId, direction);
      dispatch(changeHabitOrder({habitId, groupId, direction}));
    },
    deleteHabit(habitId, entryIds) {
      dispatch(deleteHabit({habitIds: [habitId]}));
      dispatch(deleteEntry({entryIds}));
    },
    toggleEntry(habitId, date, entry) {
      if (!entry) {
        dispatch(addEntry({habitId, date}));
      } else {
        dispatch(deleteEntry({entryIds: [entry.id]}));
      }
    },
    select(habitId) {
      dispatch(selectHabit(habitId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitContainer);
