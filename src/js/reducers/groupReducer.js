import {SET_GROUPS, ADD_GROUP, EDIT_GROUP, DELETE_GROUP} from '../actions/actionsTypes';
const groupState = {map: {}, items:[{id: null, title: 'Ungrouped'}]};
let tempId = 789;

const groupReducer = ((state = groupState, action) => {
  let items;
    switch (action.type) {
        case SET_GROUPS:
            state = {...state, items: [...state.items, ...action.payload.groups]};
            break;
        case ADD_GROUP:
            let group = {id: tempId, ...action.payload};
            tempId++;
            state = {...state, items: [...state.items, group]};
            break;
        case EDIT_GROUP:
            items = state.items.map(item => {
                if(item.id === action.payload.id) {                
                    return Object.assign({}, item, action.payload); // {...item, ...action.playload};
                }
                return item;
            });
            state = {...state, items};
            break;
        case DELETE_GROUP:
            items = state.items.filter(group => {
              return action.payload.groupIds.indexOf(group.id) === -1;
            });
            state = {...state, items};
            break;
    }
    return state;
});

export default groupReducer;
