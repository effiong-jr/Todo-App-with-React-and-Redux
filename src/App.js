import React, {Component} from 'react';
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
      todoList: [],
      id: 0,
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
    const {input, todoList, id} = this.state;

    if(input !== "") {
     let newTask = [
       ...todoList,
       {
         text: input,
         completed: false,
         id,
       }
      ];

      this.setState({
        todoList: newTask,
        id: id + 1,
        input: "",
      })
    }   

    event.preventDefault();
  }

  toggleCompleted(id) {
    const {todoList} = this.state;

    const getTodo = todoList.filter(todo => todo.id === id)[0];
    getTodo.completed = !getTodo.completed;

    const updatedList = todoList.map( todo => {
      return todo.id === getTodo.id ? getTodo : todo;
    });

    this.setState({todoList: updatedList});
  }

  handleDelete(id) {
    const {todoList} = this.state;

    const itemForDelete = todoList.filter( todo => todo.id === id)[0];
    const updatedList = todoList.filter(todo => todo.id !== itemForDelete.id);
    
    this.setState({todoList: updatedList});
  }

  render() {
    const { input, todoList, } = this.state;

    const displayTodos = todoList.map( todo => {
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
            <li  className="todoItem">
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
            </li>

          </div>
        )
      } else {
        return (
          <div key={todo.id}>
            <li  className="todoItem">
              <span>{todo.text}</span>
              <div className="actionBtns">
                <Button 
                  handleClick={()=>this.toggleCompleted(todo.id)}
                   icon={faCheckCircle}
                   className="markBtn"
                />

                {deleteBtn}
              </div>
            </li>
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
