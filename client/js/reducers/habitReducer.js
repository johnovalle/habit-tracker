import {SET_HABITS, ADD_HABIT, EDIT_HABIT, CHANGE_HABIT_ORDER, CHANGE_HABIT_GROUP, SELECT_HABIT, DELETE_HABIT} from '../actions/actionsTypes';
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
              return { ...item, ...action.payload};
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

    case CHANGE_HABIT_GROUP:
      let order = state.items.filter(item => item.groupId === action.payload.groupId).length;
      sorted = orderAndMapHabits(state.items.map(item => {
        if (item.id === action.payload.habitId) {
          return {...item, groupId: action.payload.groupId, order};
        }
        return item;
      }));
      state = {...state, ...sorted}
      break;
  }
  return state;
});

// move to utility later
const orderAndMapHabits = (items) => {
  let sorted = [...items].sort((a,b) => a.priority - b.priority);
  let habitOrderMap = {};
  sorted.forEach(habit => {
      habitOrderMap[habit.groupId] = habitOrderMap[habit.groupId] || [];
      habitOrderMap[habit.groupId].push(habit.id);
  });
  return {items: sorted, map: habitOrderMap};
};

const addToCollection = (state, {targetKey = 'groupId', targetId = null, title}) => {
  targetId = targetId ? parseInt(targetId) : targetId;
  let priority = state.items.filter(item => item[targetKey] === targetId).length;

  let newItem = {id: state.tempId, title, [targetKey]: targetId, priority};

  return [...state.items, newItem];
};

// look for ways to reduce complexity of this function
const changeHabitOrder = (state, {target, groupId, direction}) => {
  let groupOrder = state.map[groupId];
  let currentLocation = groupOrder.indexOf(target.id);
  let swap;
  let swapped = false;
  let swapTarget;

  if ((direction === -1 && currentLocation !== 0) ||
      (direction === 1 && currentLocation !== groupOrder.length - 1)) {
    swap = groupOrder[currentLocation + direction];
    swapped = true;
  }

  if (swapped) {
    for (let habit of state.items) {
      if (habit.id === swap) {
        swapTarget = habit;
      }
    }

    let newHabits = state.items.map(habit => {
      if (habit.id === swap) {
        return {...habit, priority: target.priority };
      }
      if (habit.id === target.id) {
        return {...habit, priority: swapTarget.priority };
      }
      return habit;
    });

    return newHabits;

  }
  return false;
};
// move habit from group to group

export default habitReducer;
