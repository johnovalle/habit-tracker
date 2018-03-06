import {SET_GROUPS, ADD_GROUP, EDIT_GROUP, DELETE_GROUP} from '../actions/actionsTypes';
const groupState = {map: {}, items:[{id: null, title: 'Ungrouped'}]};

const groupReducer = ((state = groupState, action) => {
    switch (action.type) {
        case SET_GROUPS:
            state = {...state, items: [...state.items, ...action.payload]};
            break;
        case ADD_GROUP:
            break;
        case EDIT_GROUP:
            let items = state.items.map(item => {
                if(item.id === action.payload.id) {                
                    return Object.assign({}, item, action.payload); // {...item, ...action.playload};
                }
                return item;
            });
            state = {...state, items};
            break;
        case DELETE_GROUP:
            break;
    }
    return state;
})

export default groupReducer;
