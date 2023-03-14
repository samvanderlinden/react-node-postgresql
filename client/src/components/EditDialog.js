import React, { useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import TodoInput from "./TodoInput";
import axios from "axios";

const EditDialog = ({ handleClose, open, todo }) => {
  const [todoInput, setTodoInput] = useState(todo.description);
  const [toDos, setTodos] = useState([]);

  const onTodoInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(todo.todo_id);
      const toDos = await axios.put(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          description: todoInput,
          isComplete: todo.completed,
        }
      );

      setTodos(toDos.data);
    } catch (error) {
      console.log(error.response.data);
    }

    setTodoInput("");
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"} fullWidth={true}>
      <DialogTitle>Edit Todo</DialogTitle>
      <TodoInput
        onSubmitHandler={onSubmitHandler}
        todoInput={todoInput}
        onTodoInputChange={onTodoInputChange}
      />
    </Dialog>
  );
};

export default EditDialog;
