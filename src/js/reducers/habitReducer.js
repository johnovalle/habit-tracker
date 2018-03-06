import {SET_HABITS, ADD_HABIT, EDIT_HABIT, DELETE_HABIT} from '../actions/actionsTypes';
const habitState = {map: {}, items: []};

const habitReducer = ((state = habitState, action) => {
    switch (action.type) {
        case SET_HABITS:
          state = {...state, items: [...action.payload]};
            break;
        case ADD_HABIT:
            break;
        case EDIT_HABIT:
            let items = state.items.map(item => {
                if(item.id === action.payload.id) {                
                    return Object.assign({}, item, action.payload); // {...item, ...action.playload};
                }
                return item;
            });
            state = {...state, items};
            break;
        case DELETE_HABIT:
            break;
    }
    return state;
})

export default habitReducer;
