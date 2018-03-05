import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import HabitApp from './containers/HabitApp';
import '../style.css';
import data from './temp-data';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <HabitApp data={data}/>
    </Provider>, 
    document.getElementById('app'));
