import React from 'react';
import {connect} from 'react-redux';
import {editHabit} from '../actions/habitActions';

class RetitleForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        value: this.props.title,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.retitle(this.state.value);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Change title:
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit'/>
      </form>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    title: ownProps.title,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    retitle(title) {
      dispatch(editHabit({id: ownProps.id, title}));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RetitleForm);