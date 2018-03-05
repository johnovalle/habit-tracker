import {createStore, combineReducers} from 'redux';
import groups from './reducers/groupReducer';
import habits from './reducers/habitReducer';
import entries from './reducers/entryReducer';

export default createStore(combineReducers({groups, habits, entries}));