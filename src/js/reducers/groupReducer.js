import {SET_GROUPS, ADD_GROUP, EDIT_GROUP, DELETE_GROUP} from '../actions/actionsTypes';
const groupState = {groups: [{id: null, title: 'Ungrouped'}]};

const groupReducer = ((state = groupState, action) => {
    switch (action.type) {
        case SET_GROUPS:
            console.log("in reducer", state);
            console.log(action.payload);
            state = [...state.groups, ...action.payload];
            console.log(state);
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
