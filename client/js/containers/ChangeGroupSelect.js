import React from 'react';
import {connect} from 'react-redux';
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

    this.props.change(parseInt(this.state.value) || null);
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
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    change(groupId) {
      dispatch(changeHabitGroup({groupId, habitId: ownProps.habitId}));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeGroupSelect);