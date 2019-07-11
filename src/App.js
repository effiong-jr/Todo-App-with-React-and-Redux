import React, {Component} from 'react';
import store from './store';
import { addTodo, deleteTodo, toggleTodo } from './actionCreators';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faCheckCircle, 
  faTrashAlt,
  faUndo,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      // todoList: [],
      id: 2,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  handleSubmit( event ) {
    const {input, id} = this.state;
    
    if(input !== "") {
      store.dispatch(
        addTodo({
          id,
          text: input,
          completed: false,
        })
      )

      this.setState({ input: "", id: id + 1});
    }
    event.preventDefault();
  }

  toggleCompleted(id) {
    store.dispatch(toggleTodo(id));
    // const {todoList} = this.state;

    // const getTodo = store.getState().filter(todo => todo.id === id)[0];
    // getTodo.completed = !getTodo.completed;

    // const updatedList = todoList.map( todo => {
    //   return todo.id === getTodo.id ? getTodo : todo;
    // });

    // this.setState({todoList: updatedList});
  }

  handleDelete(id) {
    store.dispatch( deleteTodo(id) );
  }

  render() {
    const { input, } = this.state;


    const displayTodos = store.getState().map( todo => {
      const deleteBtn = <Button 
                          handleClick={()=>this.handleDelete(todo.id)}
                          className="deleteBtn"
                          icon={faTrashAlt}
                        />

      // Check state of todo item
      // If completed, change button to an undo button
      // Each todo has its own delete button
     
      if(todo.completed) {
        return (
          <div key={todo.id} >
            <div  className="todoItem">
              <span>
                <FontAwesomeIcon icon={faCheck} className="markBtn" />
                <del>{todo.text}</del></span>

              <div className="actionBtns">
                <Button 
                  handleClick={()=>this.toggleCompleted(todo.id)} 
                  icon={faUndo}
                  className="undoBtn"
                />

                {deleteBtn}
              </div>
            </div>

          </div>
        )
      } else {
        return (
          <div key={todo.id}>
            <div  className="todoItem">
              <span>{todo.text}</span>
              <div className="actionBtns">
                <Button 
                  handleClick={()=>this.toggleCompleted(todo.id)}
                   icon={faCheckCircle}
                   className="markBtn"
                />

                {deleteBtn}
              </div>
            </div>
          </div>

        )
      }
    });

    const output = displayTodos.length === 0 
      ? <span id="default-text">Your tasks will appear here!</span> 
      : displayTodos;

    return (
      <div className="App">
        <h2 id="title">Todo App with React and Redux</h2>
        <div>
          <div id="inputForm">
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text" 
                value={input}
                placeholder="Add a task"
                onChange={this.handleChange}
              />

              {/* Using button Component */}
              <Button 
                type="submit"
                id="addBtn"
                disabled={input.length === 0 ? true : false}
                icon={faPlus}
              />

            </form>
          </div>

          <div id="display">
            {output}
          </div>
        </div>
      </div>
    )
  }
}


function Button(props) {
  return (
    <button 
      onClick={props.handleClick}
      type={props.type}
      className={props.className}
      id={props.id}
      disabled={props.disabled}
    >
      <FontAwesomeIcon icon={props.icon} />
    </button>
  )
}

export default App;
