import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTodos } from "./features/todo/todoSlice";
import TodoForm from "./components/TodoForm";
import TodoTable from "./components/TodoTable";

function App() {
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);

  const getTodosData = async () => {
    const response = await axios.get("http://localhost:5000/todos");
    const todosData = response.data;

    setTodos(todosData);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await dispatch(fetchAllTodos());
        console.log({ data });
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, [dispatch]);

  return (
    <div className="App">
      <header>
        <h1>My ToDo App</h1>
      </header>
      <TodoForm getTodosData={getTodosData} setTodos={setTodos} />
      <TodoTable todos={todo.todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
