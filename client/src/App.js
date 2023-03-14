import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoTable from "./components/TodoTable";

function App() {
  const [todos, setTodos] = useState([]);

  const getTodosData = async () => {
    const response = await axios.get("http://localhost:5000/todos");
    const todosData = response.data;

    setTodos(todosData);
  };

  useEffect(() => {
    getTodosData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>My ToDo App</h1>
      </header>
      <TodoForm getTodosData={getTodosData} setTodos={setTodos} />
      <TodoTable todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
