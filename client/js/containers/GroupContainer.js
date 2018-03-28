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
    this.changeGroupOrder = this.changeGroupOrder.bind(this);
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
                    reorder={this.changeGroupOrder.bind(null, group)}
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

  changeGroupOrder = (target, direction) => {
    let changedGroups = changeOrder(this.props.groups.items, target, direction);
    console.log(changedGroups);
    if(changedGroups) {
      this.props.changeGroupOrder(changedGroups);
    }

  };

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

const changeOrder = (groups, target, direction) => {
  let currentLocation = groups.indexOf(target);
  let swap;
  let swapped = false;

  if ((direction === -1 && currentLocation !== 1) ||
      (direction === 1 && currentLocation !== groups.length - 1)) {
    swap = groups[currentLocation + direction];
    swapped = true;
  }

  if (swapped && swap.id) {
    let newGroups = groups.reduce((acc, group) => {
      if (group.id === swap.id) {
        acc.push({...group, priority: target.priority });
      }
      if (group.id === target.id) {
        acc.push({...group, priority: swap.priority });
      }
      return acc;
    }, []);

    return newGroups;

  }
  return false;
};

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
      axios.post('/api/group', {title, priority}).then(response => {
        response.data.priority = priority;
        console.log(response);
        dispatch(addGroup(response.data));
      });

    },
    changeGroupOrder(groups) {
      console.log('action prop', groups);
      axios.put('/api/group', {groups}).then((data) => {
        // console.log(data);
        dispatch(changeGroupOrder({groups}));
      })
      .catch(err => console.log(err));

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
