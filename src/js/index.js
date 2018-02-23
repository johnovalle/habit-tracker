import React from 'react';
import ReactDOM from 'react-dom';
import HabitApp from './HabitApp';
import '../style.css';
import data from './temp-data';

ReactDOM.render(<HabitApp data={data}/>, document.getElementById('app'));
