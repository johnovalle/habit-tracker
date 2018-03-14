import {SET_HABITS, ADD_HABIT, EDIT_HABIT, CHANGE_HABIT_ORDER, SELECT_HABIT, DELETE_HABIT} from '../actions/actionsTypes';
const habitState = {map: {}, items: [], selected: null, tempId:44};

const habitReducer = ((state = habitState, action) => {
  let sorted;
  switch (action.type) {

    case SET_HABITS:
      sorted = orderAndMapHabits([...state.items, ...action.payload.habits]);
      state = {...state, ...sorted};
      break;

    case ADD_HABIT:
      sorted = orderAndMapHabits(addToCollection(state, action.payload));
      state = {...state, ...sorted, tempId: state.tempId + 1};
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

    case CHANGE_HABIT_ORDER:
      let reordered = changeHabitOrder(state, action.payload);
      if (reordered) {
        sorted = orderAndMapHabits(reordered);
        state = {...state, ...sorted};
      }
      break;

    case DELETE_HABIT:
      sorted = orderAndMapHabits(state.items.filter(habit => {
        return action.payload.habitIds.indexOf(habit.id) === -1;
      }));
      state = {...state, ...sorted};
      break;

    case SELECT_HABIT:
      action.payload = state.selected === action.payload ? null : action.payload;
      state = {...state, selected: action.payload};
      break;
  }
  return state;
});

// move to utility later
const orderAndMapHabits = (items) => {
  let sorted = [...items].sort((a,b) => a.order - b.order);
  let habitOrderMap = {};
  sorted.forEach(habit => {
      habitOrderMap[habit.groupId] = habitOrderMap[habit.groupId] || [];
      habitOrderMap[habit.groupId].push(habit.id);
  });
  return {items: sorted, map: habitOrderMap};
};

const addToCollection = (state, {targetKey = 'groupId', targetId = null, title}) => {
  targetId = targetId ? parseInt(targetId) : targetId;
  let order = state.items.filter(item => item[targetKey] === targetId).length; 
 
  let newItem = {id: state.tempId, title, [targetKey]: targetId, order}; 

  return [...state.items, newItem];
};

const changeHabitOrder = (state, {target, groupId, direction}) => {
  let groupOrder = state.map[groupId];
  let currentLocation = groupOrder.indexOf(target.id);
  let swap;
  let swapped = false;
  // console.log(habitId, groupId, direction, currentLocation);

  if ((direction === -1 && currentLocation !== 0) || 
      (direction === 1 && currentLocation !== groupOrder.length - 1)) { 
    swap = groupOrder[currentLocation + direction];
    swapped = true;
  }

  if (swapped) {
    let newHabits = state.items.map(habit => {
      if (habit.id === swap) {
        return {...habit, order: (habit.order + direction * -1) };
      }
      if (habit.id === target.id) {
        return {...habit, order: (habit.order + direction) };
      }
      return habit;
    });

    return newHabits;
    
  } 
  return false;
};
// move habit from group to group

export default habitReducer;
