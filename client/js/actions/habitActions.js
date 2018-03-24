import {SET_HABITS, ADD_HABIT, EDIT_HABIT, CHANGE_HABIT_ORDER, CHANGE_HABIT_GROUP, SELECT_HABIT, DELETE_HABIT} from './actionsTypes';

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

export const changeHabitGroup = (habit) => {
    return {
        type: CHANGE_HABIT_GROUP,
        payload: habit
    };
};

export const selectHabit = (habitId) => {
    return {
        type: SELECT_HABIT,
        payload: habitId
    };
};

export const deleteHabit = (habit) => {
    return {
        type: DELETE_HABIT,
        payload: habit
    };
};