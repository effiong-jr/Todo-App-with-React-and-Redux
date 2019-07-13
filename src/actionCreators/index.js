import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from '../actionTypes';

export const addTodo = (todo) => ({
    type: ADD_TODO,
    todo,
});

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id,
});

export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id,
});

