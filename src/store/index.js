import { createStore } from 'redux';
import { 
    ADD_TODO, 
    DELETE_TODO, 
    TOGGLE_TODO, 
} from '../actionTypes';

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



const reducer = (state = initialState, action) => {
   switch(action.type) {
       case ADD_TODO: {
           return [...state, action.todo];
       }

       case TOGGLE_TODO: {
           return state.map(todo => {
              return todo.id === action.id 
                ? Object.assign({}, todo, todo.completed = !todo.completed) 
                : todo;
           })
       }

       case DELETE_TODO: {
            return state.filter( todo => todo.id !== action.id);
       }
       default: return state;
   }
}

const store = createStore(reducer);

export default store;