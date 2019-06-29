import React, {Component} from 'react';
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
          <li key={todo.id}>
            <del>{todo.text}</del>
            <button onClick={()=>this.markAsDone(todo.id)} >Completed</button>
          </li>
        )
      } else {
        return (
          <li key={todo.id}>
            {todo.text}
            <button onClick={()=>this.markAsDone(todo.id)} >Mark As Done</button>
          </li>

        )
      }
    });
    return (
      <div className="App">
        <h2>Todo App with React and Redux</h2>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              value={input}
              onChange={this.handleChange}
            />
            <button 
              type="submit">Add</button>
          </form>

          <div id="display">
            {displayTodos}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
