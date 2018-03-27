import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Group from '../components/Group';
import HabitContainer from './HabitContainer';
import AddForm from './AddForm';
import {editGroup, addGroup, deleteGroup, changeGroupOrder, selectGroup} from '../actions/groupActions';
import {addHabit, deleteHabit} from '../actions/habitActions';
import {deleteEntry} from '../actions/entryActions';

class GroupContainer extends React.Component {

  constructor(props){
    super(props);
    this.addNewGroup = this.addNewGroup.bind(this);
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
        <Group key={group.id}
                    {...group}
                    retitle={this.props.retitle}
                    delete={this.props.deleteGroup.bind(null, group, habits.map(habit => habit.id), entryIds)}
                    reorder={this.props.changeGroupOrder.bind(null, group)}
                    selected={group.selected}
                    select={this.props.select.bind(null, group.id)}>
          {/*this.buildHabits(habits)*/}
          <HabitContainer habitIds={habits.map(habit => habit.id)} groupId={group.id} entryIds={entryIds} />
        </Group>
      );
    });
  }

  addNewGroup = (target, title) => {
    let priority = this.props.groups.items.length;
    this.props.addToCollection(title, priority);
  }

  render() {
    return (<div>
      {this.buildGroups(this.props.groups.items)}
      <AddForm
          title='Add a new group'
          action={this.addNewGroup}
        />
      {/*<AddForm
          title='Add a new habit'
          action={this.props.addToHabits}
      />*/}
      </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    habits: state.habits,
    entries: state.entries,
    selected: state.groups.selected,
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
    addToCollection(title, priority) {
      // const payload = {targetId, title};
      axios.post('/api/group', {title}).then(response => {
        response.data.priority = priority;
        console.log(response);
        dispatch(addGroup(response.data));
      });

    },
    // addToHabits(targetId = null, title) {
    //   const payload = {targetId, title};
    //   dispatch(addHabit(payload));
    // },
    changeGroupOrder(target, direction) {
      console.log('action prop', target, direction);
      dispatch(changeGroupOrder({target, direction}));
    },
    deleteGroup(group, habitIds, entryIds){
      axios.delete(`/api/group/${group.id}`).then(() => {
        dispatch(deleteGroup({groupIds: [group.id]}));
        dispatch(deleteHabit({habitIds}));
        dispatch(deleteEntry({entryIds}));
      });
    },
    select(groupId) {
      dispatch(selectGroup(groupId));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer);
