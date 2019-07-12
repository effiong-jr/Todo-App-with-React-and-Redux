export const doAddTodo = (state, action) => 
    [...state, action.todo];


export const doToggleCompleted = (state, action) => {
    const updatedList = state.map( todo => {
        return todo.id === action.id
            ? Object.assign({}, todo, todo.completed = !todo.completed)
            : todo;
    });

    return updatedList;
}

export const doDeleteTodo = (state, action) =>
    state.filter( todo => todo.id !== action.id);