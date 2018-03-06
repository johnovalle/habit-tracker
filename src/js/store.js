import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import groups from './reducers/groupReducer';
import habits from './reducers/habitReducer';
import entries from './reducers/entryReducer';

export default createStore(combineReducers({groups, habits, entries}), {}, applyMiddleware(logger));
