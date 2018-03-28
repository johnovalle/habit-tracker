import {SET_GROUPS, ADD_GROUP, EDIT_GROUP, CHANGE_GROUP_ORDER, DELETE_GROUP, SELECT_GROUP} from '../actions/actionsTypes';
const groupState = {items:[{id: null, title: 'Ungrouped', priority: -1}]};

const groupReducer = ((state = groupState, action) => {
  let items;
  let sorted;
    switch (action.type) {
        case SET_GROUPS:
            sorted = [...state.items, ...action.payload.groups].sort((a,b) => a.priority - b.priority);
            state = {...state, items: [...sorted]};
            break;

        case ADD_GROUP:
            state = {...state, items: [...state.items, action.payload]};
            break;

        case EDIT_GROUP:
            items = state.items.map(item => {
                if(item.id === action.payload.id) {
                    return { ...item, ...action.payload};
                }
                return item;
            });
            state = {...state, items};
            break;

        case SELECT_GROUP:
            items = state.items.map(group => {
              if(group.id === action.payload) {
                return {...group, selected: !group.selected};
              } else {
                if (group.selected) {
                  return {...group, selected: false};
                }
              }
              return group;
            });
            state = {...state, items};
            break;

        case CHANGE_GROUP_ORDER:
            items = state.items.map(group => {
              for(const alter of action.payload.groups) {
                if(group.id === alter.id) {
                  return {...group, priority: alter.priority};
                }
              }
              return group;
            });


            sorted = items.sort((a,b) => a.priority - b.priority);
            state = {...state, items: [...sorted]};
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
