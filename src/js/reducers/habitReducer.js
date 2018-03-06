import {SET_HABITS, ADD_HABIT, EDIT_HABIT, DELETE_HABIT} from '../actions/actionsTypes';
const habitState = [];

const habitReducer = ((state = habitState, action) => {
    switch (action.type) {
        case SET_HABITS:
          state = [...action.payload];
            break;
        case ADD_HABIT:
            break;
        case EDIT_HABIT:
            state = state.map(item => {
                if(item.id === action.payload.id) {                
                    return Object.assign({}, item, action.payload); // {...item, ...action.playload};
                }
                return item;
            });
            break;
        case DELETE_HABIT:
            break;
    }
    return state;
})

export default habitReducer;
