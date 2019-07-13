import React, {Component} from 'react';
import { addTodo, deleteTodo, toggleTodo } from './actionCreators';
import { getTodos } from './selectors';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faCheckCircle, 
  faTrashAlt,
  faUndo,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import './App.css';

import { connect } from 'react-redux';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      id: 3,
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
      this.props.addTodo({
          id,
          text: input,
          completed: false,
        });

      this.setState({ input: "", id: id + 1});
    }
    event.preventDefault();
  }

  toggleCompleted(id) {
    this.props.toggleTodo(id);
  }

  handleDelete(id) {
    this.props.deleteTodo(id);
  }

  render() {
    const { input, } = this.state;

    const displayTodos = this.props.todos.map( todo => {
      const deleteBtn = <Button 
                          handleClick={()=>this.handleDelete(todo.id)}
                          className="deleteBtn"
                          icon={faTrashAlt}
                        />

      // Check completed status  of todo item
      // If completed, change button to an undo button
      // Each todo has its own delete button     
      return (
        <div key={todo.id} >
          {todo.completed ?
            <div className="todoItem" >
              <span className="todo-text">
                  <FontAwesomeIcon icon={faCheck} className="markBtn" />
                  <del>{todo.text}</del>
              </span> 
              <div className="actionBtns">
                  <Button 
                    handleClick={()=>this.toggleCompleted(todo.id)} 
                    icon={faUndo}
                    className="undoBtn"
                  /> 
                  {deleteBtn}
              </div>
            </div>
            
            : <div className="todoItem" >
                  <span className="todo-text">{todo.text}</span>
                    <div className="actionBtns">
                      <Button 
                        handleClick={()=>this.toggleCompleted(todo.id)}
                        icon={faCheckCircle}
                        className="markBtn"
                      />
                      {deleteBtn}
                  </div>
            </div>
          }
          {/* {deleteBtn} */}
        </div>
        );
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

const mapStateToProps = state => {
  return {
    todos: getTodos(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (todo)=> dispatch(addTodo(todo)),
    deleteTodo: (id )=> dispatch(deleteTodo(id)),
    toggleTodo: (id) => dispatch( toggleTodo(id) ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);