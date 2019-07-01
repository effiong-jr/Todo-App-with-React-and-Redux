import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTasks} from '@fortawesome/free-solid-svg-icons';
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
    this.markAsDone = this.markAsDone.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    })
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
    } else {
      alert("You cannot add an empty task!!!");
    }   

    event.preventDefault();
  }

  markAsDone(id) {
    const {todoList} = this.state;
    let doneTask = todoList.filter( todo => todo.id === id)[0];
    let updatedList = Object.assign(
      [],
      todoList, doneTask.completed = !doneTask.completed,
    )

    this.setState({ todoList: updatedList});
  }

  render() {
    const { input, todoList } = this.state;
    const displayTodos = todoList.map( todo => {
      if(todo.completed) {
        return (
          <div key={todo.id} >
            <li  className="todoItem">
              <span><del>{todo.text}</del></span>
              <button onClick={()=>this.markAsDone(todo.id)} >Completed</button>
            </li>
            <hr />

          </div>
        )
      } else {
        return (
          <div key={todo.id}>
            <li  className="todoItem">
              <span>{todo.text}</span>
              <button onClick={()=>this.markAsDone(todo.id)} >Mark As Done</button>
            </li>
            <hr />
          </div>

        )
      }
    });
    const output = displayTodos.length === 0 ?
      <span id="default-text">Tasks will display Here!</span> : displayTodos
    return (
      <div className="App">
        <h2 id="title">Todo App with React and Redux</h2>
        <div>
          <div id="inputForm">
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text" 
                value={input}
                placeholder="New Task"
                onChange={this.handleChange}
              />
              <button 
                type="submit"
                id="addBtn"
              >
                <FontAwesomeIcon icon={faTasks} />
              </button>
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

export default App;
