import React from 'react';

export default class AddForm extends React.Component {

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
    this.props.action(this.props.type, this.props.targetKey, this.props.targetId, this.state.value, () => {
      this.setState({value: ''});
    });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.props.title}:
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit'/>
      </form>
    );
  }
}
