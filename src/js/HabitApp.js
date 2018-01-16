import React from 'react';
import data from './temp-data';
export default class HabitApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(data);
  }
  render() {
    return (
      <div>
        <h1>React up and running</h1>
      </div>
    );
  }
}
