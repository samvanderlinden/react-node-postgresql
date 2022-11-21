import React, { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

function App() {
  const [todoInput, setTodoInput] = useState("");

  const onTodoInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log({ todoInput });
    setTodoInput("");
  };

  return (
    <div className="App">
      <h1>My ToDo App</h1>
      <form onSubmit={onSubmitHandler}>
        <FormControl>
          <InputLabel htmlFor="todo-input">ToDo Input</InputLabel>
          <Input
            id="todo-input"
            value={todoInput}
            onChange={onTodoInputChange}
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default App;
