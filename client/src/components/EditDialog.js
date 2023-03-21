import React, { useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import TodoInput from "./TodoInput";
import { useDispatch } from "react-redux";
import { updateTodoDescription } from "../features/todo/todoSlice";

const EditDialog = ({ handleClose, open, setOpen, todo }) => {
  const [todoInput, setTodoInput] = useState(todo.description);
  const dispatch = useDispatch();

  const onTodoInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    dispatch(updateTodoDescription({ todo, todoInput }));

    setOpen(false);
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
