import React from 'react';
import {connect} from 'react-redux';
import HabitGroup from '../components/HabitGroup';
import Habit from '../components/Habit';
import HabitEntry from '../components/HabitEntry';
import AddForm from './AddForm';
import GroupContainer from './GroupContainer';
import {sameDay, numDaysBetween} from '../dateUtils';
import {setGroups, editGroup, addGroup, deleteGroup} from '../actions/groupActions';
import {setHabits, editHabit, addHabit, changeHabitOrder, deleteHabit} from '../actions/habitActions';
import {setEntries, deleteEntry, addEntry} from '../actions/entryActions';

class HabitApp extends React.Component {

  componentDidMount() {
    this.props.setState(this.props.data, () => { console.log(this.props) });
  }

  

  buildHabits(habits) {
    return habits.map((habit) => {
      
      let habitEntries = this.props.entries.filter(entry => habit.id === entry.habitId);

      return (
        <Habit key={habit.id}
                {...habit}
                retitle={this.props.retitle}
                delete={() => this.props.deleteHabit(habit.id, habitEntries.map(entry => entry.id))}
                reorder={this.props.changeHabitOrder}>
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
    return (
      <div className="content">
        <h1 className="app-title">Habit Tracker</h1>
        <GroupContainer />
        <AddForm
          type='habits'
          title='Add a new habit'
          targetKey='groupId'
          targetId='1'
          action={this.props.addToCollection}
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
      dispatch(setGroups({groups, habits}));
      dispatch(setHabits({habits, entries}));
      dispatch(setEntries(entries));
      callback();
    },
    
    changeHabitOrder(habitId, groupId, direction) {
      console.log('action prop', habitId, groupId, direction);
      dispatch(changeHabitOrder({habitId, groupId, direction}));
    },
    deleteHabit(habitId, entryIds){
      dispatch(deleteHabit({habitIds: [habitId]}));
      dispatch(deleteEntry({entryIds}));
    },
    
    toggleEntry(habitId, date, entry){
      if (!entry) {
        dispatch(addEntry({habitId, date}));
      } else {
        dispatch(deleteEntry({entryIds: [entry.id]}));
      }
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitApp);
