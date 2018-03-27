import {SET_GROUPS, ADD_GROUP, EDIT_GROUP, CHANGE_GROUP_ORDER, DELETE_GROUP, SELECT_GROUP} from '../actions/actionsTypes';
const groupState = {items:[{id: null, title: 'Ungrouped', priority: -1}], selected: null};
// let tempId = 789;

const groupReducer = ((state = groupState, action) => {
  let items;
  let sorted;
    switch (action.type) {
        case SET_GROUPS:
            sorted = [...state.items, ...action.payload.groups].sort((a,b) => a.order - b.order);
            state = {...state, items: [...sorted]};
            break;

        case ADD_GROUP:
            // console.log(action.payload);
            // let group = {...action.payload};
            // tempId++;
            state = {...state, items: [...state.items, action.payload]};
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

        case SELECT_GROUP:
            action.payload = state.selected === action.payload ? null : action.payload;
            state = {...state, selected: action.payload};
            break;

        case CHANGE_GROUP_ORDER:
            let reordered = changeOrder(state, action.payload);
            if (reordered) {
              sorted = [...reordered].sort((a,b) => a.priority - b.priority);
              state = {...state, items: [...sorted]};
            }
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

const changeOrder = (state, {target, direction}) => {
    let currentLocation = state.items.indexOf(target);
    let swap;
    let swapped = false;

    if ((direction === -1 && currentLocation !== 1) ||
        (direction === 1 && currentLocation !== state.items.length - 1)) {
      swap = state.items[currentLocation + direction];
      swapped = true;
    }

    if (swapped && swap.id) {
      let newGroups = state.items.map(group => {
        if (group.id === swap.id) {
          return {...group, priority: target.priority };
        }
        if (group.id === target.id) {
          return {...group, priority: swap.priority };
        }
        return group;
      });

      return newGroups;

    }
    return false;
  };



export default groupReducer;
