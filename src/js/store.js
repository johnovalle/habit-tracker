import {createStore, combineReducers} from 'react-redux';
import group from './reducers/groupReducer';
import habit from './reducers/habitReducer';
import entry from './reducers/entryReducer';

export default createStore(combineReducers({group, habit, entry}));