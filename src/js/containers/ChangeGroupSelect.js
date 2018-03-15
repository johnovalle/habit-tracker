import React from 'react';

export default class ChangeGroupSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.action(this.props.targetId, this.state.value);
    this.setState({value: ''});
  }


  render() {
    let options = this.props.group.map(group => {
      return <option value={group.id}>{group.title}</option>
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.props.title}:
          <select name={/**/} value={this.props.groupId} onChange={this.handleChange}>
            {options}
          </select>
        </label>
        <input type='submit' value='Submit'/>
      </form>
    );
  }
}
