import {SET_GROUPS, ADD_GROUP, EDIT_GROUP, DELETE_GROUP} from '../actions/actionsTypes';
const groupState = {map: {}, items:[{id: null, title: 'Ungrouped'}]};

const groupReducer = ((state = groupState, action) => {
  let items;
    switch (action.type) {
        case SET_GROUPS:
            let groupsWithHabits = groupItemByContainer([...state.items, ...action.payload.groups], 
                                                        'habits', action.payload.habits, 'groupId');
            state = {...state, items: [...groupsWithHabits]};
            break;
        case ADD_GROUP:
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

const groupItemByContainer = (containers, type, items, fKey) => { //move to utility
  let containerMap = {};
  for(let i = 0; i < containers.length; i++) {
    containerMap[containers[i].id] = containers[i];
    containers[i][type] = [];
  }

  for(let i = 0; i < items.length; i++) {
    containerMap[items[i][fKey]][type].push(items[i].id);
  }
  return containers;
}

export default groupReducer;
