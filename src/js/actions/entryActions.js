import {SET_ENTRIES, ADD_ENTRY, DELETE_ENTRY} from './actionsTypes';

export const setEntries = (entries) => { 
    return {
        type: SET_ENTRIES,
        payload: entries
    };
};

export const addEntry = (entry) => {
    return {
        type: ADD_ENTRY,
        payload: entry
    };
};

export const deleteEntry = (entry) => {
    return {
        type: DELETE_ENTRY,
        payload: entry
    };
};