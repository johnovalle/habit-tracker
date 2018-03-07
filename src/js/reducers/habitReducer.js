import {SET_HABITS, ADD_HABIT, EDIT_HABIT, CHANGE_HABIT_ORDER, DELETE_HABIT} from '../actions/actionsTypes';
const habitState = {map: {}, items: [], tempId:44};

const habitReducer = ((state = habitState, action) => {
  let sorted;
    switch (action.type) {
        case SET_HABITS:
          sorted = orderAndMapHabits(action.payload);
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
            console.log('payload', action.payload);
          let reordered = changeHabitOrder(state, action.payload);
          if (reordered) {
            sorted = orderAndMapHabits(reordered);
            state = {...state, ...sorted};
          }
          
            break;
        case DELETE_HABIT:
        console.log('payload', action.payload);
          sorted = orderAndMapHabits(state.items.filter(habit => {
            return habit.id !== action.payload.habitId;
          }));
          state = {...state, ...sorted};
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

const addToCollection = (state, {targetKey = null, targetId = null, title}) => {
  let newItem;
  if(targetKey) {
    let order = state.items.filter(item => item[targetKey] === parseInt(targetId)).length;
    newItem = {id: state.tempId, title, [targetKey]: parseInt(targetId), order};
  } else {
    newItem = {id: state.tempId, title, order: state.items.length};
  }

  return [...state.items, newItem];
};

const changeHabitOrder = (state, {habitId, groupId, direction}) => { //need to add order when adding habit
  let groupOrder = state.map[groupId];
  let currentLocation = groupOrder.indexOf(habitId);
  let swap;
  // let newOrder = [...groupOrder];
  let dirModifier = 1;
  let swapped = false;
  console.log(habitId, groupId, direction, currentLocation);

  if (direction === 'asc' && currentLocation !== 0) { // change direction from asc to -1
    swap = groupOrder[currentLocation - 1];
    // newOrder[currentLocation - 1] = groupOrder[currentLocation];
    // newOrder[currentLocation] = swap;
    swapped = true;
  } else if (direction === 'desc' && currentLocation !== groupOrder.length - 1) {
    swap = groupOrder[currentLocation + 1];
    // newOrder[currentLocation + 1] = groupOrder[currentLocation];
    // newOrder[currentLocation] = swap;
    dirModifier *= -1;
    swapped = true;
  }
  if (swapped) {
    let newHabits = state.items.map(habit => {
      if (habit.id === swap) {
        return {...habit, order: (habit.order + dirModifier) }
      }
      if (habit.id === habitId) {
        return {...habit, order: (habit.order + (dirModifier * -1)) }
      }
      return habit;
    });

    return newHabits;
    // this.setState({habitOrderMap: {...this.state.habitOrderMap, [groupId]: newOrder },
    //               habits: newHabits}, () => {
    //                 this.orderAndMapHabits();
    //               });
  } 
  return false;
};
// move habit from group to group



export default habitReducer;
