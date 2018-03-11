import React from 'react';
import {connect} from 'react-redux';
import HabitGroup from '../components/HabitGroup';
import Habit from '../components/Habit';
import HabitEntry from '../components/HabitEntry';
import AddForm from './AddForm';
import {sameDay, numDaysBetween} from '../dateUtils';
import {setGroups, editGroup, addGroup, deleteGroup} from '../actions/groupActions';
import {setHabits, editHabit, addHabit, changeHabitOrder, deleteHabit} from '../actions/habitActions';
import {setEntries, deleteEntry, addEntry} from '../actions/entryActions';

class HabitApp extends React.Component {

  componentDidMount() {
    this.props.setState(this.props.data, () => { console.log(this.props) });
  }

  buildGroups(groups) {
    return groups.map((group) => {
      
      let habits = this.props.habits.items.filter((habit) => habit.groupId === group.id);
      let entryIds = habits.reduce((acc, habit) => {
        let entries = this.props.entries.filter(entry => habit.id === entry.habitId)
                                        .map(entry => entry.id);
        return acc = [...acc, ...entries];
      }, []);

      return (
        <HabitGroup key={group.id} 
                    {...group} 
                    retitle={this.props.retitle} 
                    delete={this.props.deleteGroup.bind(null, group, habits.map(habit => habit.id), entryIds)}>
          {this.buildHabits(habits)}
        </HabitGroup>
      );
    });
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
        {this.buildGroups(this.props.groups.items)}
        <AddForm
          type='groups'
          title='Add a new group'
          action={this.props.addToCollection}
        />
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
    retitle(type, id, title) {
      const payload = {id, title};
      if (type === 'groups') {
        dispatch(editGroup(payload));
      } else if (type === 'habits') {
        dispatch(editHabit(payload));
      }
    },
    addToCollection(type, targetKey = null, targetId = null, title) {
      const payload = {targetKey, targetId, title};
      if (type === 'groups') {
        dispatch(addGroup(payload));
      } else if (type === 'habits') {
        dispatch(addHabit(payload));
      }
    },
    changeHabitOrder(habitId, groupId, direction) {
      console.log('action prop', habitId, groupId, direction);
      dispatch(changeHabitOrder({habitId, groupId, direction}));
    },
    deleteHabit(habitId, entryIds){
      dispatch(deleteHabit({habitIds: [habitId]}));
      dispatch(deleteEntry({entryIds}));
    },
    deleteGroup(group, habitIds, entryIds){

      dispatch(deleteGroup({groupIds: [group.id]}));
      dispatch(deleteHabit({habitIds}));
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
