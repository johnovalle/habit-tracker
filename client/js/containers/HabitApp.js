import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import AddForm from './AddForm';
import GroupContainer from './GroupContainer';
import {setGroups} from '../actions/groupActions';
import {setHabits} from '../actions/habitActions';
import {setEntries} from '../actions/entryActions';

class HabitApp extends React.Component {

  componentDidMount() {
    this.props.setState();
  }

  render() {
    return (
      <div className="content">
        <h1 className="app-title">Habit Tracker</h1>
        <GroupContainer />
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
    setState() {
      axios.all([
        axios.get('/api/group'),
        axios.get('/api/habit'),
        axios.get('/api/entry'),
      ])
      .then(axios.spread((groups, habits, entries) => {
        console.log("Setting up app",groups, habits, entries);
        dispatch(setGroups({groups: groups.data, habits: habits.data}));
        dispatch(setHabits({habits: habits.data, entries: entries.data}));
        dispatch(setEntries(entries.data));
      }))
      .catch(error => console.log(error));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitApp);
