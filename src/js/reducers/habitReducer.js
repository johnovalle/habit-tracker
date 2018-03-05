import {SET_HABITS, ADD_HABIT, EDIT_HABIT, DELETE_HABIT} from '../actions/actionsTypes';
const habitState = {habits: []};

const habitReducer = ((state = habitState, action) => {
    switch (action.type) {
        case SET_HABITS:
            break;
        case ADD_HABIT:
            break;
        case EDIT_HABIT:
            break;
        case DELETE_HABIT:
            break;
    }
    return state;
})

export default habitReducer;