import {SET_GROUPS, ADD_GROUP, EDIT_GROUP, DELETE_GROUP} from '../actions/actionsTypes';
const groupState = {entries = []};

const groupReducer = ((state = groupState, action) => {
    switch (action.type) {
        case SET_GROUPS:
            break;
        case ADD_GROUP:
            break;
        case EDIT_GROUP:
            break;
        case DELETE_GROUP:
            break;
    }
    return state;
})

export default groupReducer;