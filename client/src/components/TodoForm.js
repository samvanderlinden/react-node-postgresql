import React, { useState } from "react";
import { Grid, FormControl, Input, InputLabel, Button } from "@mui/material";
import axios from "axios";

const TodoForm = ({ getTodosData, setTodos }) => {
  const [todoInput, setTodoInput] = useState("");

  const onTodoInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const toDos = await axios.post("http://localhost:5000/todos", {
        description: todoInput,
      });

      console.log(toDos);

      setTodos(toDos.data);

      // getTodosData();
    } catch (error) {
      console.log(error.response.data);
    }

    setTodoInput("");
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="todo-input">Add ToDo Item Here</InputLabel>
              <Input
                id="todo-input"
                value={todoInput}
                onChange={onTodoInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default TodoForm;
