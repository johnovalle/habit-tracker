import React from 'react';
import {connect} from 'react-redux';
import AddForm from './AddForm';
import GroupContainer from './GroupContainer';
import {setGroups} from '../actions/groupActions';
import {setHabits} from '../actions/habitActions';
import {setEntries} from '../actions/entryActions';

class HabitApp extends React.Component {

  componentDidMount() {
    this.props.setState(this.props.data, () => { console.log(this.props) });
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
    setState({groups, habits, entries}, callback) {
      console.log("Setting up app",groups, habits, entries);
      dispatch(setGroups({groups, habits}));
      dispatch(setHabits({habits, entries}));
      dispatch(setEntries(entries));
      callback();
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitApp);
