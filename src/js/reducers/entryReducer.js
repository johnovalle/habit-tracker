import {SET_ENTRIES, ADD_ENTRY, DELETE_ENTRY} from '../actions/actionsTypes';
const entryState = [];

const entryReducer = ((state = entryState, action) => {
    switch (action.type) {
        case SET_ENTRIES:
            state = [...action.payload];
            break;
        case ADD_ENTRY:
            break;
        case DELETE_ENTRY:
            break;
    }
    return state;
})

export default entryReducer;
