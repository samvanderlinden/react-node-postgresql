import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todo/todoSlice";
import TodoInput from "./TodoInput";

const TodoForm = () => {
  const [todoInput, setTodoInput] = useState("");
  const dispatch = useDispatch();

  const onTodoInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(createTodo(todoInput));
    } catch (error) {
      console.log(error.response.data);
    }

    setTodoInput("");
  };

  return (
    <div>
      <TodoInput
        onSubmitHandler={onSubmitHandler}
        todoInput={todoInput}
        onTodoInputChange={onTodoInputChange}
      />
    </div>
  );
};

export default TodoForm;
