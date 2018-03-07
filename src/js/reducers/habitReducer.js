import {SET_HABITS, ADD_HABIT, EDIT_HABIT, DELETE_HABIT} from '../actions/actionsTypes';
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
        case DELETE_HABIT:
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

const addToCollection = (state, {targetKey = null, targetId = null, title, callback}) => {
  let newItem;
  if(targetKey) {
    let order = state.items.filter(item => item[targetKey] === parseInt(targetId)).length;
    newItem = {id: state.tempId, title, [targetKey]: parseInt(targetId), order};
  } else {
    newItem = {id: state.tempId, title, order: state.items.length};
  }

  return [...state.items, newItem];
  // this.setState({[type]: newCollection, tempId: this.state.tempId + 1}, () => {
  //   console.log('state:', this.state);
  //   this.orderAndMapHabits();
  // });
  callback();
};

export default habitReducer;
