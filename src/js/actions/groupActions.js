import {SET_GROUPS, ADD_GROUP, EDIT_GROUP, DELETE_GROUP} from './actionsTypes';

export const setGroups = (groups) => { 
    return {
        type: SET_GROUPS,
        payload: groups
    };
};

export const addGroup = (group) => {
    return {
        type: ADD_GROUP,
        payload: group
    };
};

export const editGroup = (group) => {
    return {
        type: EDIT_GROUP,
        payload: group
    };
};

export const deleteGroup = (group) => {
    return {
        type: DELETE_GROUP,
        payload: group
    };
};