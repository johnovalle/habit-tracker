import {SET_HABITS, ADD_HABIT, EDIT_HABIT, CHANGE_HABIT_ORDER, CHANGE_HABIT_GROUP, SELECT_HABIT, DELETE_HABIT} from '../actions/actionsTypes';
const habitState = {map: {}, items: [], selected: null};

const habitReducer = ((state = habitState, action) => {
  let sorted;
  switch (action.type) {

    case SET_HABITS:
      sorted = orderAndMapHabits([...state.items, ...action.payload.habits]);
      state = {...state, ...sorted};
      break;

    case ADD_HABIT:
      sorted = orderAndMapHabits([...state.items, action.payload]);
      state = {...state, ...sorted};
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
      items = state.items.map(habit => {
        for(const alter of action.payload.habits) {
          if(habit.id === alter.id) {
            return {...habit, priority: alter.priority};
          }
        }
        return habit;
      });

      sorted = orderAndMapHabits(items);
      state = {...state, ...sorted};
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
      sorted = orderAndMapHabits(state.items.map(item => {
        const {groupId, habitId, priority} = action.payload;
        if (item.id === habitId) {
          return {...item, groupId, priority};
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

export default habitReducer;
