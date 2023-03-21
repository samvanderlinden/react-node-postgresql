import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTodos } from "./features/todo/todoSlice";
import TodoForm from "./components/TodoForm";
import TodoTable from "./components/TodoTable";

function App() {
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        await dispatch(fetchAllTodos());
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
      <TodoForm />
      <TodoTable todos={todo.todos} />
    </div>
  );
}

export default App;
