import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';


const LOCAL_STORAGE_KEY = 'todoApp.todos'


function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todos.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return 
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  // Clear complete todo list
  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  // Return 
  return (
    <>
      <ToDoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add ToDo</button>
      <button onClick={handleClearTodo}>Clear completed todos</button>
      <div>{todos.filter(todo => !todos.completed).length} left to do</div>
    </>
  )
}

export default App;
