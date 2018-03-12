import React from 'react';
import {connect} from 'react-redux';
import HabitGroup from '../components/HabitGroup';
import HabitContainer from './HabitContainer';
import AddForm from './AddForm';
import {editGroup, addGroup, deleteGroup} from '../actions/groupActions';
import {addHabit, deleteHabit} from '../actions/habitActions';
import {deleteEntry} from '../actions/entryActions';

class GroupContainer extends React.Component {

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
          {/*this.buildHabits(habits)*/}
          <HabitContainer habitIds={habits.map(habit => habit.id)} groupId={group.id} entryIds={entryIds} />
        </HabitGroup>
      );
    });
  }

  render() {
    return (<div>
      {this.buildGroups(this.props.groups.items)}
      <AddForm
          title='Add a new group'
          action={this.props.addToCollection}
        />
      <AddForm
          title='Add a new habit'
          action={this.props.addToHabits}
        />
      </div>)
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
    retitle(type, id, title) {
      const payload = {id, title};
      if (type === 'groups') {
        dispatch(editGroup(payload));
      } else if (type === 'habits') {
        dispatch(editHabit(payload));
      }
    },
    addToCollection(targetId = null, title) {
      const payload = {targetId, title};
      dispatch(addGroup(payload));
    },
    addToHabits(targetId = null, title) {
      const payload = {targetId, title};
      dispatch(addHabit(payload));
    },
    deleteGroup(group, habitIds, entryIds){

      dispatch(deleteGroup({groupIds: [group.id]}));
      dispatch(deleteHabit({habitIds}));
      dispatch(deleteEntry({entryIds}));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer);
