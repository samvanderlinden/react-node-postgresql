import React from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoTable from "./components/TodoTable";

function App() {
  return (
    <div className="App">
      <header>
        <h1>My ToDo App</h1>
      </header>
      <TodoForm />
      <TodoTable />
    </div>
  );
}

export default App;
