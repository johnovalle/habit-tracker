import {SET_HABITS, ADD_HABIT, EDIT_HABIT, CHANGE_HABIT_ORDER, DELETE_HABIT} from './actionsTypes';

export const setHabits = (habits) => { 
    return {
        type: SET_HABITS,
        payload: habits
    };
};

export const addHabit = (habit) => {
    return {
        type: ADD_HABIT,
        payload: habit
    };
};

export const editHabit = (habit) => {
    return {
        type: EDIT_HABIT,
        payload: habit
    };
};

export const changeHabitOrder = (habit) => {
    return {
        type: CHANGE_HABIT_ORDER,
        payload: habit
    };
};

export const deleteHabit = (habit) => {
    return {
        type: DELETE_HABIT,
        payload: habit
    };
};