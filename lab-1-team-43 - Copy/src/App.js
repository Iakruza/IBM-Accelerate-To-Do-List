import Header from "./component/header"
import './App.css';
import TodoList from './TodoList'
import { useState, useRef } from 'react'
import {Button, Input} from '@material-ui/core';

function App() {

  //using Reacts state because we are going to be modifying the todos
  const [todo, setTodo] = useState([])
  const [inputError, setInputError] = useState(false)

  //react comes with use reference for specific reference, in this case its the <input/>
  const todoNameRef = useRef()

  //Function that clears any value from any referance using the useRef()
  const clearReferanceValue = (ref) => ref.current.value = "";

  //Handles add todos when the button is pressed
  const handleAddTodo = () => {
    //the current user input text
    const name = todoNameRef.current.value
    //checks if user inputs nothing and if they entered the same value
    if(name === ''){
      clearReferanceValue(todoNameRef);
      setInputError(true);
      return
    }

    for(let i = 0; i < todo.length; i++){ //better way?
      if(name === todo[i].name){
        clearReferanceValue(todoNameRef);
        setInputError(true);
        return
      }
    }

    const addDate = new Date();    

    //rest perameter for array making
    setTodo(todos => {
      return [...todos ,{
        name: name,
        specificKey: name,  //needed for mapping, can also use some sort of algorithm for specific id
        completed: false,    //Checkbox definition
        date: addDate, //Date for display
        edited: false //Indicates a list has been edited
      }]
    })

    console.log(name);
    clearReferanceValue(todoNameRef);
    setInputError(false);
  }

  //Removes checked todos when the button is clicked
  const removeTodos = () => {
    //filter out the not completed ones and put them into a new array then set it back to setTodo()
    const newTodos = todo.filter(complete => !complete.completed)
    setTodo(newTodos)
  }

  return (
    <div className="App">
      <TodoList todos={todo}/>
      {/**TextField would probably be better**/}
      <Input inputRef={todoNameRef} type="text" placeholder='Add Todo!' error={inputError} data-testid="new-item-input"></Input>
      <Button style= {{marginLeft: '30px'}} variant="contained" onClick={handleAddTodo} data-testid="new-item-button">Add Item</Button>
      {/**!!When there is no elements checked disable the remove items **/}
      <Button style= {{marginLeft: '50px'}} variant="contained" onClick={removeTodos}>Remove Items</Button>
      <h1>Todos: {todo.length}</h1>
      {/**<h1>Completed: {todo.filter(complete => complete.completed).length}</h1>**/}
    <Header/>
    </div>
  );
}

export default App;