import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import HabitApp from './containers/HabitApp';
import '../style.css';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <HabitApp />
    </Provider>,
    document.getElementById('app'));
