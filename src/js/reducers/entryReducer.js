import {SET_ENTIRES, ADD_ENTRY, DELETE_ENTRY} from '../actions/actionsTypes';
const entryState = {entries = []};

const entryReducer = ((state = entryState, action) => {
    switch (action.type) {
        case SET_ENTIRES:
            break;
        case ADD_ENTRY:
            break;
        case DELETE_ENTRY:
            break;
    }
    return state;
})

export default entryReducer;