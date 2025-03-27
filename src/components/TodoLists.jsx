import React from 'react'
import { useState, useEffect, useRef } from 'react'
import '../styles/todolists.css'

const TodoLists = () => {
    const [todos, setTodos] = useState([]);
    const [inputTodo, setInputTodo] = useState("");
    const [checkedStates, setCheckedStates] = useState({});
    const inputRef = useRef(null);

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        const storedCheckedStates = localStorage.getItem("checkedStates")
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
        if (storedCheckedStates) {
            setCheckedStates(JSON.parse(storedCheckedStates))
          }
    }, []);
    
    const handleChange = (e) => {
        setInputTodo(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputTodo) return inputRef.current.focus();
        if (todos.includes(inputTodo)) return alert("Todo already exists");
        if (inputTodo.length > 100) return alert("Todo must be less than 35 characters");
        setTodos([...todos, inputTodo]);
        setInputTodo("");
        localStorage.setItem("todos", JSON.stringify([...todos, inputTodo]));
    };
    const handleClear = () => {
        if (!todos.length) return alert("No todos to clear");
        if (window.confirm("Are you sure you want to clear all todos?")) {
            setTodos([]);
            localStorage.setItem("todos", JSON.stringify([]));
        }
    };
    const handleDelete = (todo) => {
        const newTodos = todos.filter((t) => t !== todo)
        setTodos(newTodos)
        localStorage.setItem("todos", JSON.stringify(newTodos))
        const newCheckedStates = { ...checkedStates }
        delete newCheckedStates[todo]
        setCheckedStates(newCheckedStates)
        localStorage.setItem("checkedStates", JSON.stringify(newCheckedStates))
    }
    const handleEdit = () => {
        if (!inputTodo) return inputRef.current.focus();
        const newTodos = todos.map((t) => (t === inputTodo ? inputTodo : t))
        setTodos(newTodos)
        localStorage.setItem("todos", JSON.stringify(newTodos))
    }
    const handleCheck = (todo) => {
        const newCheckedStates = { ...checkedStates }
        newCheckedStates[todo] = !newCheckedStates[todo]
        setCheckedStates(newCheckedStates)
        localStorage.setItem("checkedStates", JSON.stringify(newCheckedStates))
    }
  return (
    <div className='container'>
        <h1>Short Todo Lists</h1>
        <h3>Todo: {inputTodo}</h3>
        <form onSubmit={handleSubmit}>
            <input type='text' value={inputTodo} onChange={handleChange} placeholder='Enter a todo' ref={inputRef}/>
            <button type='submit'>Add</button>
            <button onClick={handleClear}>Clear</button>
        </form>
        <ul>
            {todos.map((todo, index) => (
                <li key={index}>
                    <input type="checkbox" checked={checkedStates[todo] || false} onChange={() => handleCheck(todo)} />
                    <span>{todo}</span>
                    <button className='edit' onClick={handleEdit}>Edit</button>
                    <button onClick={() => handleDelete(todo)}>Remove</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default TodoLists