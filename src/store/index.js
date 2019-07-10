import { createStore } from 'redux';
import { ADD_TODO, DELETE_TODO } from '../actionTypes';


const initialState = [
    {
        id: 0,
        text: "Go shopping by 1pm",
        completed: false,
    }, 
    {
        id: 1,
        text: "Practice Coding by 10pm",
        completed: false,
    }
];


export const addTodo = (todo) => ({
    type: ADD_TODO,
    todo,
});

export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id,
})



const reducer = (state = initialState, action) => {
   switch(action.type) {
       case ADD_TODO: {
           const newState = [...state, action.todo];
           console.log(newState);
           return ( newState );
       }

       case DELETE_TODO: {
           console.log( action.id);
           return state;
       }
       default: return state;
   }
}

const store = createStore(reducer);

export default store;