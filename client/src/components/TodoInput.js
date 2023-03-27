import React from "react";
import { Grid, FormControl, Input, InputLabel, Button } from "@mui/material";

const TodoInput = ({ onSubmitHandler, todoInput, onTodoInputChange }) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        sx={{ mb: 5 }}
      >
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="todo-input" />
            <Input
              id="todo-input"
              value={todoInput}
              onChange={onTodoInputChange}
              inputProps={{ "data-testid": "todo-input" }}
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
  );
};

export default TodoInput;
