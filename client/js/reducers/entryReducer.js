import {SET_ENTRIES, ADD_ENTRY, DELETE_ENTRY} from '../actions/actionsTypes';
const entryState = [];
//let tempId = 77; // remove this once connected to backend

const entryReducer = ((state = entryState, action) => {
    switch (action.type) {
        case SET_ENTRIES:
            state = [...action.payload];
            break;
        case ADD_ENTRY:
            state = [...state, {...action.payload}];
            break;
        case DELETE_ENTRY:
            return state.filter(entry => {
                return action.payload.entryIds.indexOf(entry.id) === -1;
            });
            break;
    }
    return state;
});

export default entryReducer;
