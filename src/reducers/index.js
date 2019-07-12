import { ADD_TODO, TOGGLE_TODO, DELETE_TODO} from '../actionTypes';
import {
   doAddTodo,
   doToggleCompleted,
   doDeleteTodo
} from '../actions';

const INITIAL_STATE = [
    {
        id: 0,
        text: "Go to the gym my 8am",
        completed: true,
    },
    {
        id: 1,
        text: "Go shopping by 1pm",
        completed: false,
    }, 
    {
        id: 2,
        text: "Practice Coding by 10pm",
        completed: false,
    }
];

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TODO: {
            return doAddTodo(state, action);
        }
 
        case TOGGLE_TODO: {
            return doToggleCompleted(state, action);
        }
 
        case DELETE_TODO: {
             return doDeleteTodo(state, action);
        }
 
        default: return state;
    }
 }

 export default reducer;