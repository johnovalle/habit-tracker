import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {changeHabitGroup} from '../actions/habitActions';

class ChangeGroupSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        value: this.props.groupId,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let groupId = parseInt(this.state.value) || null;
    //let priority = this.props.habits.filter(item => item.groupId === groupId);
    let priority = Math.max(...this.props.habits.filter(habit => habit.groupId === groupId)
                                                .map(habit => habit.priority), -1) + 1;
    this.props.change(groupId, priority);
    this.setState({value: ''});
  }


  render() {
    let currentGroup;
    let options = this.props.groups.map(group => {
      if (group.id === this.props.groupId) {
        currentGroup = group;
      }
      return <option key={group.id} value={group.id}>{group.title}</option>
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Change group:
          <select name={currentGroup.title} value={this.state.value || 'null'} onChange={this.handleChange}>
            {options}
          </select>
        </label>
        <input type='submit' value='Submit'/>
      </form>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    groups: state.groups.items,
    groupId: ownProps.groupId,
    habits: state.habits.items,
  }
};

const mapDispatchToProps = (dispatch, {habitId}) => {
  return {
    change(groupId, priority) {
      axios.patch(`/api/habit/${habitId}`, {group_id: groupId, priority}).then(response => { // back-end should handle this transformation
        dispatch(changeHabitGroup({groupId, habitId, priority}));
      })
      .catch(err => console.log(err));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeGroupSelect);
